# Claude Code Runtime Adapter (AEW V4)

## Overview

The Claude Code adapter integrates AEW V4 into Anthropic's Claude Code CLI. Claude Code natively discovers `CLAUDE.md` at the project root, which serves as a thin adapter forwarding instructions to `AGENTS.md` and `.agents/skills/`.

## Native Mechanism Mapping

| Dimension | AEW V4 Standard | Claude Code Native Mechanism |
|-----------|-----------------|-----------------------------|
| **Discovery** | `AGENTS.md` | `CLAUDE.md` at workspace root forwards to `AGENTS.md`. |
| **Instructions** | `AGENTS.md` | Authoritative rules, DAG execution, and evidence standards mapped from `AGENTS.md`. |
| **Skills** | `.agents/skills/` | Loaded directly from `.agents/skills/`. (Automated `.claude/skills` projection supported if needed). |
| **Rules** | `.agents/rules/` | `.claude/rules/aew.md` references portable rules without duplicating content. |
| **Roles** | `.agents/agents/` | Executed as sequential role phases with explicit task state synchronization. |
| **Safety** | `.ai/policies/security-policy.json` | Claude Code permission prompts + pre-execution policy checks. |
| **Execution** | Multi-step DAG | Sequential DAG step execution with verification evidence recorded in `.ai/state/`. |

## CLI Invocations

```bash
# Launch Claude Code session
claude
# Or execute directly
claude -p "Follow AGENTS.md to implement doc/prd.md"
```

## Fallback Behavior

- If Claude Code does not support subagent processes natively, role handoffs are executed in the main agent context with clear role prompts.
