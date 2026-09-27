# AI Engineering Workflow (AEW) — V4 Portable Multi-Runtime

Welcome to the **AI Engineering Workflow (AEW) V4** — a portable, multi-runtime, Skills-first AI engineering harness. AEW transforms Product Requirements Documents (PRDs) into production-ready, fully verified, and independently evaluated software across any modern AI IDE or CLI without vendor lock-in.

---

## Architecture Version: V4 Portable Multi-Runtime

AEW V4 eliminates runtime-specific coupling while preserving deep engineering rigor. The portable core lives once, and execution is adapted through thin, native adapters using only officially documented mechanisms:

- **Authoritative Constitution**: [AGENTS.md](AGENTS.md) (< 120 lines, portable and navigational)
- **18 Canonical Agent Skills**: [.agents/skills/](.agents/skills/) (following the Agent Skills open standard)
- **Focused UI/UX Design Skill**: [.agents/skills/designing-ui-ux/SKILL.md](.agents/skills/designing-ui-ux/SKILL.md) (adaptive trigger)
- **Portable Role Contracts**: [.agents/agents/](.agents/agents/) (portable contracts with native subagent wrappers)
- **Deterministic Portable Policies**: [.ai/policies/](.ai/policies/) (`security-policy.json`, `decision-policy.json`, `checkpoint-policy.json`, `parallel-policy.md`, `worktree-policy.md`)
- **Durable Control Plane & State**: [.ai/state/](.ai/state/) (atomic, revision-aware state management)
- **Official Native Adapters**: [.ai/adapters/](.ai/adapters/) for Antigravity, Cursor, VS Code + Copilot, Codex CLI, Claude Code, and Gemini CLI.

See the complete architecture specification:
- [docs/v4-portable-runtime-architecture.md](docs/v4-portable-runtime-architecture.md)
- [docs/v4-migration-report.md](docs/v4-migration-report.md)

---

## Supported Runtime Matrix

| Runtime Environment | Discovery Mechanism | Instruction Entry | Skills Discovery | Roles / Subagents | Safety Enforcement |
|---------------------|---------------------|-------------------|------------------|-------------------|--------------------|
| **Antigravity IDE / CLI** | Native `.agents/` + `AGENTS.md` | `GEMINI.md` → `AGENTS.md` | Direct (`.agents/skills/`) | Native Subagents (`.agents/agents/`) | Deterministic PreToolUse Hook (`.agents/hooks.json`) |
| **Cursor IDE / CLI** | Native `AGENTS.md` + `.cursor/rules/` | `AGENTS.md` / `.cursor/rules/aew.mdc` | Direct (`.agents/skills/`) | Cursor Agent Mode + Role Contracts | Terminal Command Confirmation + Policy Guard |
| **VS Code + GitHub Copilot** | Native `AGENTS.md` + `.github/` | `.github/copilot-instructions.md` | Direct (`.agents/skills/`) | Native Custom Agents (`.github/agents/*.agent.md`) | Workspace Trust + Terminal Confirmation |
| **OpenAI Codex CLI** | Native `AGENTS.md` | `AGENTS.md` | Direct (`.agents/skills/`) | Main Agent Role Handoff | Codex Execution Sandbox + Flag Approval |
| **Claude Code** | Native `CLAUDE.md` + `.claude/rules/` | `CLAUDE.md` → `AGENTS.md` | Direct (`.agents/skills/`) | Claude Code Prompts + Role Contracts | Claude Permission Prompts + Policy Guard |
| **Gemini CLI** | Native `GEMINI.md` | `GEMINI.md` → `AGENTS.md` | Direct (`.agents/skills/`) | Main Agent Role Handoff | CLI Tool Confirmation + Policy Guard |

---

## Repository Structure

```
AI-Engineering-WorkFlow/
├── AGENTS.md                  ← Portable repository constitution (under 120 lines)
├── GEMINI.md                  ← Thin Gemini / Antigravity compatibility entry point
├── CLAUDE.md                  ← Thin Claude Code compatibility entry point
├── README.md                  ← V4 Architecture overview and runtime navigation
│
├── .agents/                   ← Canonical Portable Knowledge
│   ├── rules/                 ← Invariant rules (coding, architecture, ui, security, tech stack)
│   ├── skills/                ← 18 Canonical Agent Skills (progressive disclosure)
│   │   ├── analyzing-prd/
│   │   ├── planning/
│   │   ├── researching/
│   │   ├── designing-architecture/
│   │   ├── designing-ui-ux/   ← NEW: Focused product experience design skill
│   │   ├── implementing-backend/
│   │   ├── implementing-frontend/ (Stack-neutral, inspects project tokens)
│   │   ├── designing-database/
│   │   ├── designing-apis/
│   │   ├── securing-applications/
│   │   ├── testing-software/
│   │   ├── debugging-software/
│   │   ├── verifying-changes/
│   │   ├── evaluating-results/
│   │   ├── reviewing-code/
│   │   ├── deploying-software/
│   │   ├── onboarding-projects/
│   │   └── upgrading-projects/
│   ├── agents/                ← Portable role contracts + native subagent wrappers
│   └── hooks.json             ← Antigravity PreToolUse hook wiring
│
├── .ai/                       ← Runtime-Neutral Control Plane
│   ├── policies/              ← Portable policy definitions (security, decision, checkpoint, worktree)
│   ├── adapters/              ← Thin native runtime mappings
│   │   ├── antigravity/       ← Antigravity adapter metadata & docs
│   │   ├── cursor/            ← Cursor adapter metadata & docs
│   │   ├── vscode/            ← VS Code + Copilot adapter metadata & docs
│   │   ├── codex/             ← OpenAI Codex CLI adapter metadata & docs
│   │   ├── claude-code/       ← Claude Code adapter metadata & docs
│   │   └── gemini-cli/        ← Gemini CLI adapter metadata & docs
│   ├── orchestration/         ← Abstract capability-tier routing & task classification
│   ├── state/                 ← Durable machine-readable state (tasks, decisions, blockers, events)
│   ├── evaluations/           ← Outcome evaluation contracts & evidence schemas
│   └── scripts/               ← Cross-platform deterministic support scripts & validators
│
├── .cursor/rules/             ← Cursor-native rules (aew.mdc)
├── .github/                   ← VS Code / Copilot native wrappers
│   ├── copilot-instructions.md
│   └── agents/                ← Copilot custom agents (*.agent.md)
├── .claude/rules/             ← Claude Code native rules (aew.md)
├── docs/                      ← Architectural specifications & reports
└── evals/golden-tasks/        ← Executable golden tasks for regression verification
```

---

## Runtime-Neutral Engineering Lifecycle

Every PRD or user request executes through the 11-stage pipeline:

1. **Inspect**: Examine project structure, installed dependencies, and active runtime capabilities.
2. **Analyze Requirements (`analyzing-prd`)**: Extract user stories and acceptance criteria. If genuine business ambiguity exists, prompt the user with concise options.
3. **Research (`researching`)**: Conduct focused investigations only when technical uncertainty exists.
4. **Architecture (`designing-architecture`)**: Establish layer boundaries and data models.
5. **UI/UX Design (`designing-ui-ux`)**: *Adaptive trigger.* Activates when a feature introduces a new user journey or screen redesign; bypassed for backend-only work and minor CSS tweaks.
6. **Plan (`planning`)**: Decompose work into atomic task contracts and acyclic DAG in `.ai/state/tasks.json`.
7. **Implement (`implementing-backend` / `implementing-frontend`)**: Author defensive, type-safe production code adhering strictly to task boundaries.
8. **Test (`testing-software`)**: Write and run unit, integration, and E2E tests.
9. **Verify (`verifying-changes`)**: Execute build, lint, typecheck, and test checks; capture concrete evidence.
10. **Evaluate (`evaluating-results`)**: Independently assess actual outcomes against user acceptance criteria.
11. **Review (`reviewing-code` / `securing-applications`)**: Audit architecture and security before completing task.

---

## Project Integration Models

AEW V4 supports two project integration models:

### Mode A: Embedded Core
Include `AGENTS.md`, `.agents/skills/`, `.ai/`, and target runtime files directly within your repository.

### Mode B: Stamped Project Integration
Use the cross-platform DNA stamper to inject the self-contained portable harness into an external project:
```bash
# Stamp portable core and all runtime adapters
node .ai/scripts/dna-stamper.js /path/to/my-project --runtimes all

# Stamp specific runtime adapter (e.g. Cursor & VS Code)
node .ai/scripts/dna-stamper.js /path/to/my-project --runtimes cursor,vscode
```

---

## Verification & Validation Suite

Run validation checks locally:
```bash
# Run structural and code compliance checks
node .ai/scripts/validate-project.js

# Validate all 6 runtime adapters against the V4 Adapter Contract
node .ai/scripts/validate-adapters.js

# Run multi-runtime PRD lifecycle smoke test suite (all 8 targets)
node .ai/scripts/smoke-test-runtimes.js

# Run 10 executable golden-task evaluations and independent grading
node .ai/scripts/eval-runner.js

# Run full 12-scenario regression suite
node .ai/scripts/v2-tier-b-regression-suite.js
```
