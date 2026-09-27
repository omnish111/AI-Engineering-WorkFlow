# AEW V4 — Portable Multi-Runtime Engineering Architecture

## 1. Executive Summary

**AI Engineering Workflow (AEW) V4** transforms the AI Engineering Workflow from an Antigravity-specific setup into a **portable, multi-runtime engineering harness**. 

The fundamental architectural principle of V4 is: **Portable knowledge lives once; runtime-specific files are thin adapters.**

AEW V4 runs natively across:
- **Google Antigravity IDE / CLI**
- **Cursor IDE / CLI**
- **Visual Studio Code + GitHub Copilot**
- **OpenAI Codex CLI**
- **Anthropic Claude Code**
- **Google Gemini CLI**
- Future agent runtimes supporting the Agent Skills open specification.

---

## 2. Core V4 Design Principles

1. **Portable Core First**: Methodology, skill procedures, safety policies, and state structures work independently of any single model provider, editor, CLI, or OS.
2. **Official Runtime Mechanisms Only**: Where a runtime has native instructions, rules, skills, agents, or hooks, use those documented mechanisms directly rather than inventing artificial shims.
3. **One Canonical Skill Library**: Authoritative procedural skills reside in `.agents/skills/`. No manually maintained duplicate copies per runtime.
4. **Small Always-On Context**: Root `AGENTS.md` and persistent rules remain compact (< 120 lines for constitution; invariant-only rules). Procedural depth is loaded on-demand via skills.
5. **Capability-Based Degradation**: If a runtime lacks a feature (such as native subagents or deterministic hooks), execute a safe, documented fallback (e.g. sequential DAG role execution, pre-execution policy checks).
6. **Same Quality Contract**: Regardless of the tool surface, completing a task requires engineering verification, independent outcome evaluation, and structured evidence in `.ai/state/tasks.json`.
7. **Cross-Platform by Construction**: No developer-machine absolute paths (`file:///`). Pure Node.js scripts using `path.join`/`path.resolve`.
8. **Layered Security Architecture**: Policy is separated from mechanism. Portable rules define what is blocked or requires approval; native hooks and runtime prompts enforce it.

---

## 3. Canonical Architecture Layout

```
AI-Engineering-WorkFlow/
├── AGENTS.md                  ← Portable repository constitution
├── GEMINI.md                  ← Thin Gemini / Antigravity compatibility entry point
├── CLAUDE.md                  ← Thin Claude Code compatibility entry point
├── README.md                  ← Public-facing documentation
│
├── .agents/                   ← Canonical Shared Knowledge
│   ├── rules/                 ← Invariant rules (coding, architecture, ui, security, tech-stack)
│   ├── skills/                ← 18 Canonical Agent Skills (open format)
│   ├── agents/                ← Portable role contracts (with subagent wrappers)
│   └── hooks.json             ← Antigravity PreToolUse hook configuration
│
├── .ai/                       ← Control Plane (Runtime-Neutral)
│   ├── policies/              ← Portable policy definitions (security, decision, checkpoint, parallel, worktree)
│   ├── adapters/              ← Thin native runtime mappings
│   │   ├── antigravity/
│   │   ├── cursor/
│   │   ├── vscode/
│   │   ├── codex/
│   │   ├── claude-code/
│   │   └── gemini-cli/
│   ├── orchestration/         ← Abstract capability-tier routing & task classification
│   ├── state/                 ← Durable state (tasks, decisions, blockers, events)
│   ├── evaluations/           ← Outcome evaluation specifications & evidence schemas
│   └── scripts/               ← Cross-platform deterministic tools & validation runners
│
├── .cursor/rules/             ← Cursor-native rules (aew.mdc)
├── .github/                   ← VS Code / Copilot native wrappers
│   ├── copilot-instructions.md
│   └── agents/                ← Copilot custom agents (*.agent.md)
├── .claude/rules/             ← Claude Code native rules (aew.md)
├── docs/                      ← Architectural documentation & migration reports
└── evals/golden-tasks/        ← Executable golden tasks for regression verification
```

---

## 4. The 18 Canonical Agent Skills

All skills conform to the [Agent Skills Open Standard](https://agentskills.io/specification) using YAML frontmatter (`name`, `description`), progressive disclosure, and relative links:

| # | Skill Name | Domain | Primary Focus |
|---|------------|--------|---------------|
| 1 | `analyzing-prd` | Requirements | Extracts user stories, acceptance criteria, NFRs, and ambiguities from PRDs. |
| 2 | `planning` | Orchestration | Decomposes features into phased implementation plans and task DAGs. |
| 3 | `researching` | Research | Conducts targeted technical investigations and library evaluations. |
| 4 | `designing-architecture` | Architecture | Defines module boundaries, interfaces, data flows, and ADRs. |
| 5 | **`designing-ui-ux`** | UI/UX | **NEW (V4):** Designs user journeys, IA, screen hierarchy, design tokens, interaction states, and accessibility. |
| 6 | `implementing-backend` | Backend | Implements server-side services, controllers, entities, and repositories. |
| 7 | `implementing-frontend` | Frontend | Implements client-side interfaces and responsive view states (framework-neutral). |
| 8 | `designing-database` | Database | Designs schemas, indexes, queries, and safe migrations. |
| 9 | `designing-apis` | API | Designs RESTful/RPC API contracts, validation schemas, and error envelopes. |
| 10 | `securing-applications` | Security | Threat modeling, authn/authz validation, input sanitization, and secrets protection. |
| 11 | `testing-software` | Testing | Authors and executes impact-aware unit, integration, and E2E tests. |
| 12 | `debugging-software` | Debugging | Reproduces bugs, isolates root causes, and implements targeted fixes. |
| 13 | `verifying-changes` | Verification | Executes compilation, linting, typechecks, and tests; captures concrete evidence. |
| 14 | `evaluating-results` | Evaluation | Independently assesses whether software changes deliver user acceptance criteria. |
| 15 | `reviewing-code` | Review | Pre-merge inspection of architecture, complexity, and maintainability. |
| 16 | `deploying-software` | DevOps | Manages builds, container packaging, and production readiness audits. |
| 17 | `onboarding-projects` | Onboarding | Scans external repositories and establishes modernization roadmaps. |
| 18 | `upgrading-projects` | Modernization | Modernizes project engineering patterns against AEW V4 standards. |

### UI/UX Design Adaptive Activation
- **Triggers**: When a task materially affects user journeys, screen hierarchy, navigation, or visual design tokens.
- **Bypasses**: Backend/database tasks, DevOps, localized CSS bug fixes, or simple label adjustments directly route to `implementing-frontend`.

---

## 5. Portable Role Contracts

Roles in `.agents/agents/` define **who** performs the work, separate from runtime capabilities:
- `planner.md`: Requirements analysis, DAG planning, and decision policy.
- `implementer.md`: Clean, defensive production code authoring.
- `verifier.md`: Compilation, typechecking, linting, and test execution.
- `evaluator.md`: Independent outcome and acceptance criteria evaluation.
- `reviewer.md`: Architectural conformance and maintainability review.
- `security-reviewer.md`: Cryptography, authn/authz, and secrets audit.
- `researcher.md`: Technical spike and API contract investigation.

For runtimes with native subagent systems (Antigravity), these files act as subagent definitions. For runtimes with custom agent manifests (VS Code Copilot), `.github/agents/*.agent.md` wraps these contracts. For single-agent runtimes (Codex, Claude Code, Gemini CLI, Cursor), role instructions are executed in sequence with explicit handoff markers.

---

## 6. Runtime-Neutral Control Plane & Policies

Portable policies in `.ai/policies/`:
- `security-policy.json`: Declarative rules blocking dangerous operations (`rm -rf /`, `format`, `drop database`, force push) and requiring user confirmation for risky actions.
- `decision-policy.json`: Adaptive Ask vs Act threshold (act immediately for known, infer with >= 0.85 confidence, research technical gaps, ask only on genuine business ambiguity).
- `checkpoint-policy.json`: Classifies autonomous actions vs explicit user approval requirements.
- `parallel-policy.md`: Enforces zero file overlap and independent DAG requirements for concurrent execution.
- `worktree-policy.md`: Git-native worktree isolation lifecycle and reconciliation rules.

---

## 7. Abstract Capability-Tier Model Routing

Provider-specific model names are replaced with abstract capability tiers in `.ai/orchestration/model-routing.json`:
- **Fast**: High-throughput, low-latency (< 1500ms) for narrow edits and formatting.
- **Standard**: Balanced reasoning (4000ms) for routine implementation, tests, and CRUD.
- **Strong**: Deep architectural reasoning (8000ms) for system planning and difficult debugging.
- **Critical**: Maximum rigor (15000ms) for security-sensitive reasoning, cryptography, and high-blast-radius validation.

Runtimes resolve these tiers to their preferred local or cloud models at execution time.
