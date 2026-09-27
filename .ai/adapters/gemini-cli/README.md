# Gemini CLI Runtime Adapter (AEW V4)

## Overview

The Gemini CLI adapter integrates AEW V4 with Google Gemini CLI. Gemini CLI discovers `GEMINI.md` at repository root, which forwards to `AGENTS.md` and discovers Agent Skills under `.agents/skills/`.

## Native Mechanism Mapping

| Dimension | AEW V4 Standard | Gemini CLI Native Mechanism |
|-----------|-----------------|----------------------------|
| **Discovery** | `AGENTS.md` | `GEMINI.md` at workspace root forwards to `AGENTS.md`. |
| **Instructions** | `AGENTS.md` | Authoritative rules, DAG execution, and evidence standards mapped from `AGENTS.md`. |
| **Skills** | `.agents/skills/` | Loaded directly from `.agents/skills/` (or via `.gemini/skills` compatibility mapping). |
| **Rules** | `.agents/rules/` | Read per `AGENTS.md` source-of-truth hierarchy. |
| **Roles** | `.agents/agents/` | Executed as sequential role phases with explicit task state synchronization. |
| **Safety** | `.ai/policies/security-policy.json` | Gemini CLI tool execution confirmation + pre-execution policy checks. |
| **Execution** | Multi-step DAG | Sequential DAG step execution with verification evidence recorded in `.ai/state/`. |

## CLI Invocations

```bash
# Launch Gemini CLI session
gemini
# Or execute a prompt
gemini "Follow AGENTS.md to implement doc/prd.md"
```

## Fallback Behavior

- In single-agent CLI mode, all roles are executed by the primary agent with explicit handoff markers between planning, implementation, verification, and evaluation.
