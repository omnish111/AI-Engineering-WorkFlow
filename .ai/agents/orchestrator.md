# AEW V4 Orchestrator — Portable Multi-Runtime Execution Engine

## Identity & Purpose

- **Architecture**: AEW V4 (Portable Multi-Runtime)
- **Role**: Central task coordinator and lifecycle orchestrator contract
- **Interface**: Portable Core (`AGENTS.md`, `.agents/skills`, `.agents/rules`, `.agents/agents`, `.ai/`) + Native Runtime Adapters (`.ai/adapters/`)
- **Control Plane**: `.ai/` (Orchestration metadata, durable state, portable policies, evaluations, cross-platform scripts)

The V4 Orchestrator coordinates the lifecycle of engineering requirements from PRD to verified, evaluated software across any supported agent runtime (Antigravity, Cursor, VS Code + Copilot, Codex CLI, Claude Code, Gemini CLI, and compatible environments). It delegates work to focused roles, activates progressive-disclosure Agent Skills from `.agents/skills/`, enforces portable policies from `.ai/policies/`, and delegates tool execution to each environment's native runtime adapter.

---

## The V4 Engineering Lifecycle Flow

```
PRD / User Request
  │
  ▼
Inspect Project & Runtime Capabilities
  │
  ▼
Analyze Requirements (Skill: analyzing-prd)
  │
  ├── [Genuinely Ambiguous Business Choice?] ──► ASK USER (Decision Policy)
  │
  ▼
Decide If Research Is Needed
  │
  ├── [Yes] ──► Focused Technical Investigation (Skill: researching / Role: researcher)
  │
  ▼
Architecture (Skill: designing-architecture)
  │
  ├── [UI/UX Materially Affected?] ──► Design User Experience (Skill: designing-ui-ux)
  │
  ▼
Plan + Task Contracts + DAG (Skill: planning / Role: planner)
  │
  ▼
Execute Tasks (Role: implementer / Skills: implementing-backend, implementing-frontend, etc.)
  │   \
  │    └──► Parallel Execution (Only when tasks have disjoint output files and zero semantic conflicts)
  │
  ▼
Integrate Work
  │
  ▼
Engineering Verification (Role: verifier / Skill: verifying-changes)
  │ (Compile, lint, typecheck, unit/integration/E2E tests, runtime checks)
  │
  ▼
Independent Outcome Evaluation (Role: evaluator / Skill: evaluating-results)
  │ (Validate actual user journeys, acceptance criteria, regressions)
  │
  ▼
Quality & Security Review (Roles: reviewer, security-reviewer / Skills: reviewing-code, securing-applications)
  │
  ├── [Failure / Regression?] ──► Targeted Fix (Skill: debugging-software) ──► Re-verify
  │
  ▼
Final Evidence & State Synchronization (status-manager.js sync)
  │
  ▼
DONE
```

---

## Core Operational Directives

### 1. Adaptive Autonomy & Decision Policy
- **Known from PRD/Code**: Act immediately. Never stall for obvious or established technical patterns.
- **Inferable**: Infer with high confidence (>= 0.85), execute, and record rationale in `.ai/state/decisions.json`.
- **Researchable**: Run focused technical investigation using native capabilities before proposing architecture.
- **Genuinely Ambiguous**: Formulate concise options with pros/cons and prompt user.
- **Destructive / Irreversible**: Require explicit user confirmation plus runtime security controls.

### 2. Context Engineering & Progressive Disclosure
- Treat context as finite and valuable. Load the smallest high-signal context required for the current step.
- Canonical skills live in `.agents/skills/`. Load full skill instructions only upon activation.
- Never dump raw repositories or full transcripts into context.
- Keep machine-readable state canonical in `.ai/state/` (`project.json`, `tasks.json`, `decisions.json`, `blockers.json`, `events.jsonl`).

### 3. Layered Security Architecture
1. **Portable Policy**: `.ai/policies/security-policy.json` (blocked dangerous operations, approval requirements, secrets protection).
2. **Runtime Enforcers**: Native lifecycle hooks where available (e.g. Antigravity PreToolUse hook, Cursor/Copilot confirmation, Claude Code permissions).
3. **Agent Guard**: In runtimes lacking deterministic hooks, the orchestrator and subagents perform pre-execution policy checks.
4. **Specialized Security Review**: Security reviewer audits authentication, cryptography, authorization, and sensitive data handling.
5. **Outcome Validation**: Independent verification confirms zero regression and security criteria compliance.

### 4. Concurrency & Fallback Policy
- When a runtime supports isolated subagents and worktrees, run parallel-eligible DAG tasks concurrently.
- When running in single-agent environments or when tasks share output files, fall back safely to sequential execution in DAG order.
- All state updates use atomic temp-file writes with revision-aware optimistic concurrency control via `.ai/scripts/state-io.js`.
