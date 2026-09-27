# GitHub Copilot Instructions — AEW V4 Integration

This workspace follows the **AEW V4 Portable Multi-Runtime Engineering Harness**.

## Core Engineering Directives

- **Authoritative Constitution**: Read and follow [AGENTS.md](../AGENTS.md).
- **Canonical Skills**: Utilize Agent Skills located in `.agents/skills/`. Copilot natively loads skills from `.agents/skills/`.
- **Custom Agents**: Delegate to specialized custom agents located in `.github/agents/`:
  - `@planner`: PRD analysis, architectural planning, and task contracts (`.github/agents/planner.agent.md`).
  - `@implementer`: Focused implementation across backend/frontend (`.github/agents/implementer.agent.md`).
  - `@verifier`: Compilation, linting, typechecking, and test execution (`.github/agents/verifier.agent.md`).
  - `@evaluator`: Independent user-outcome validation and grading (`.github/agents/evaluator.agent.md`).
  - `@reviewer`: Code review, architecture conformance, and maintainability (`.github/agents/reviewer.agent.md`).
  - `@security-reviewer`: Threat modeling, auth, cryptography, and secrets audit (`.github/agents/security-reviewer.agent.md`).
  - `@researcher`: Focused technical investigation and library evaluation (`.github/agents/researcher.agent.md`).
- **Safety Policy**: Enforce [.ai/policies/security-policy.json](../.ai/policies/security-policy.json). Prohibit destructive commands and secret exposure.
- **Evidence Requirement**: No task is marked complete without concrete verification evidence recorded in `.ai/state/tasks.json`.
