# OpenAI Codex CLI Runtime Adapter (AEW V4)

## Overview

The OpenAI Codex adapter integrates AEW V4 with the OpenAI Codex CLI. Codex discovers `AGENTS.md` at workspace root and utilizes canonical Agent Skills located in `.agents/skills/`.

## Native Mechanism Mapping

| Dimension | AEW V4 Standard | Codex CLI Native Mechanism |
|-----------|-----------------|----------------------------|
| **Discovery** | `AGENTS.md` | Discovered natively by Codex CLI at repository root. |
| **Instructions** | `AGENTS.md` | Serves as authoritative project instruction and workflow guidance. |
| **Skills** | `.agents/skills/` | Loaded via Agent Skills standard under `.agents/skills/`. |
| **Rules** | `.agents/rules/` | Read from workspace rules directory per `AGENTS.md` hierarchy. |
| **Roles** | `.agents/agents/` | Executed as sequential role phases with explicit task state synchronization. |
| **Safety** | `.ai/policies/security-policy.json` | Codex sandbox isolation and interactive command confirmation. |
| **Execution** | Multi-step DAG | Sequential DAG step execution with verification evidence recorded in `.ai/state/`. |

## CLI Invocations

```bash
# Execute task with Codex CLI adhering to AGENTS.md
codex run "Read doc/prd.md and execute Phase 1 according to AGENTS.md"
```

## Fallback Behavior

- When running in Codex CLI without subagent processes, the agent acts as the orchestrator and sequences role instructions (planner -> implementer -> verifier -> evaluator).
