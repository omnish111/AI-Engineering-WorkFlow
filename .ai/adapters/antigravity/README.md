# Antigravity Runtime Adapter (AEW V4)

## Overview

The Antigravity adapter integrates AEW V4 directly with Google Antigravity IDE and Antigravity CLI using native platform mechanisms. Antigravity operates as a first-class supported adapter, not as a dependency of the core.

## Native Mechanism Mapping

| Dimension | AEW V4 Standard | Antigravity Native Mechanism |
|-----------|-----------------|------------------------------|
| **Discovery** | `AGENTS.md` | Discovered natively at workspace root alongside `GEMINI.md` entry point. |
| **Instructions** | `AGENTS.md` | Adheres to repository constitution; `GEMINI.md` forwards to `AGENTS.md`. |
| **Skills** | `.agents/skills/` | Discovered natively by Antigravity IDE and CLI under `.agents/skills/`. |
| **Rules** | `.agents/rules/` | Persistent rules discovered natively (`always_on`, `model_decision`, `glob`). |
| **Roles / Subagents** | `.agents/agents/` | Custom subagents discovered natively with declared tools and frontmatter. |
| **Safety / Hooks** | `.ai/policies/security-policy.json` | Wired via `.agents/hooks.json` to `.ai/scripts/security-hook.js`. |
| **Execution** | Multi-step DAG | Native subagent invocation, Git worktrees, and scheduled task integration. |

## CLI Invocations

- **Antigravity CLI**: `agy --prompt "Execute PRD doc/prd.md"`
- **Hook check**: Evaluated synchronously on `PreToolUse` events.
- **Scheduled Maintenance**: Compatible with `/schedule` and cron maintenance tasks.

## Fallback Behavior

- If subagent spawning is unavailable in a constrained environment, Antigravity executes tasks sequentially in the main conversation with explicit role boundaries.
