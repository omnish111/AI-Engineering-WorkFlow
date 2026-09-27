# Cursor Runtime Adapter (AEW V4)

## Overview

The Cursor adapter maps AEW V4 into the Cursor IDE and Cursor CLI environments. Cursor discovers `AGENTS.md` as the core repository constitution and loads Agent Skills directly from `.agents/skills/`.

## Native Mechanism Mapping

| Dimension | AEW V4 Standard | Cursor Native Mechanism |
|-----------|-----------------|-------------------------|
| **Discovery** | `AGENTS.md` | Discovered natively by Cursor; supplemented by `.cursor/rules/aew.mdc`. |
| **Instructions** | `AGENTS.md` | Root constitution guides agent planning, safety rules, and lifecycle. |
| **Skills** | `.agents/skills/` | Cursor natively discovers Agent Skills in `.agents/skills/`. |
| **Rules** | `.agents/rules/` | Referenced via `.cursor/rules/aew.mdc` to project invariants without duplication. |
| **Roles** | `.agents/agents/` | Executed within Cursor Agent mode using explicit role prompts and contracts. |
| **Safety** | `.ai/policies/security-policy.json` | Cursor terminal command approval + agent pre-execution policy check. |
| **Execution** | Multi-step DAG | Sequential task execution with state updates in `.ai/state/tasks.json`. |

## Usage

- **Cursor Agent Mode**: Open Cursor Chat, ensure Agent mode is enabled, and reference `@AGENTS.md` or `@doc/prd.md`.
- **Cursor CLI**: Run `cursor --agent "Follow AGENTS.md to implement doc/prd.md"`.

## Fallback Behavior

- Because Cursor executes through a unified agent session rather than independent concurrent subagents, tasks from the DAG are executed sequentially with explicit role transitions.
