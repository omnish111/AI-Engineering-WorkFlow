# AI Engineering Workflow (AEW) V4 Constitution

A portable, multi-runtime, Skills-first AI engineering harness that transforms PRDs and requirements into verifiable software across Antigravity, Cursor, VS Code + GitHub Copilot, Codex CLI, Claude Code, Gemini CLI, and compatible agent runtimes.

---

## 1. Core Principles

1. **Inspect Before Acting**: Establish repository structure, files, conventions, and runtime capabilities before making changes.
2. **Smallest Coherent Change**: Prefer focused, minimal, high-signal changes. Avoid speculative abstractions and gratuitous churn.
3. **Preserve Working Functionality**: Zero regressions. Never break an existing working feature to add a new one.
4. **Context As A Finite Resource**: Use progressive disclosure (metadata first, details on demand). Never dump entire repositories into context.
5. **Separation of Concerns**:
   - **Role** ("Who"): Portable role contracts in `.agents/agents/` (with runtime-native wrappers where supported).
   - **Capability** ("How"): 18 canonical Agent Skills in `.agents/skills/`.
   - **Constraint** ("Invariants"): Rules in `.agents/rules/`.
   - **Policy** ("Allowed"): Portable policies in `.ai/policies/`.
   - **State** ("History"): Machine-readable state in `.ai/state/`.
   - **Adapters** ("Platform"): Thin runtime adapters in `.ai/adapters/`.

---

## 2. Source of Truth Hierarchy

Priority (highest to lowest):
1. **Safety & Security Invariants**: `.ai/policies/security-policy.json`, `.agents/rules/security.md`, and runtime security controls.
2. **Human Intent**: Explicit user instructions and approved PRDs.
3. **Repository Constitution**: `AGENTS.md`.
4. **Persistent Workspace Rules**: `.agents/rules/*.md`.
5. **Canonical Agent Skills**: `.agents/skills/*/SKILL.md`.
6. **Machine-Readable State**: `.ai/state/` (`project.json`, `tasks.json`, `decisions.json`, `blockers.json`, `events.jsonl`).
7. **Control Plane Policies & Adapters**: `.ai/policies/`, `.ai/orchestration/`, `.ai/adapters/`.

---

## 3. Decision & Autonomy Policy

| Situation | Action | Rationale Location |
|-----------|--------|--------------------|
| **Known from PRD / Code** | Act immediately without prompting. | Self-evident in code/docs. |
| **High-Confidence Inference** (>= 0.85) | Infer, execute, and record. | Log in `.ai/state/decisions.json`. |
| **Uncertain but Researchable** | Research first using native tools. | Log findings in `.ai/state/decisions.json`. |
| **Genuinely Ambiguous Requirement** | Formulate concise numbered options with trade-offs. | Prompt user before implementation. |
| **Destructive / Irreversible Action** | Block or require explicit user confirmation. | Governed by `.ai/policies/security-policy.json`. |
| **Credentials / Secrets Exposure** | Strictly prohibited; require user-managed environment. | `.ai/policies/security-policy.json`. |
| **Security / Financial / Auth Changes** | Engage security-reviewer role; enforce verification. | Mandatory security evaluation. |

---

## 4. Runtime-Neutral Engineering Lifecycle

```
PRD / Request
  │
  ▼
Inspect Project & Runtime Capabilities
  │
  ▼
Analyze Requirements (analyzing-prd) ──[Ambiguous?]──► Ask User
  │
  ▼
Research When Necessary (researching)
  │
  ▼
Architecture (designing-architecture)
  │
  ├── [UI/UX Materially Affected?] ──► designing-ui-ux
  │
  ▼
Plan + Task Contracts + DAG (planning)
  │
  ▼
Execute Tasks (implementing-backend, implementing-frontend, etc.)
  │   (Parallel when safe & disjoint; sequential fallback otherwise)
  │
  ▼
Integrate Changes
  │
  ▼
Verify (verifying-changes, testing-software: build, typecheck, lint, tests)
  │
  ▼
Evaluate (evaluating-results: independent acceptance & user journey check)
  │
  ▼
Review & Security Review (reviewing-code, securing-applications)
  │
  ├── [Failure / Regression?] ──► debugging-software ──► Re-verify
  │
  ▼
Final Evidence & State Synchronization ──► Complete
```

---

## 5. Verification vs. Evaluation vs. Review

- **Verification** (`verifier`): Did the engineering checks pass? (Build, typecheck, lint, automated unit/integration tests).
- **Evaluation** (`evaluator`): Did the requested outcome actually work from the user's perspective? (Independent validation against acceptance criteria and functional journeys).
- **Review** (`reviewer` / `security-reviewer`): Is the code maintainable, secure, and architecturally sound?

*Never claim completion without concrete verification and outcome evaluation evidence recorded in `.ai/state/tasks.json`.*

---

## 6. Official Runtime Adapter Navigation

AEW V4 provides thin native adapters in `.ai/adapters/` utilizing each tool's officially documented discovery mechanisms:
- **Antigravity IDE / CLI**: Native discovery of `AGENTS.md`/`GEMINI.md`, `.agents/skills`, `.agents/rules`, `.agents/agents`, and `.agents/hooks.json`.
- **Cursor IDE / CLI**: Discovers `AGENTS.md`, `.agents/skills`, and `.cursor/rules/aew.mdc`.
- **VS Code + GitHub Copilot**: Discovers `AGENTS.md`, `.agents/skills`, `.github/copilot-instructions.md`, and custom agents in `.github/agents/`.
- **OpenAI Codex CLI**: Discovers `AGENTS.md` and `.agents/skills` with sandbox execution.
- **Claude Code**: Discovers `CLAUDE.md` (forwarding to `AGENTS.md`), `.claude/rules/`, and `.agents/skills`.
- **Gemini CLI**: Discovers `GEMINI.md` (forwarding to `AGENTS.md`) and `.agents/skills`.

---

## 7. Standalone Project Location Policy

Whenever creating a new software project, application, or website:
1. Always confirm or use a user-designated location outside this `AI Engineering Workflow` harness directory.
2. Stamp portable engineering DNA using `node .ai/scripts/dna-stamper.js <targetDir> --runtimes all` so downstream projects remain 100% self-sufficient across any AI IDE or CLI.
