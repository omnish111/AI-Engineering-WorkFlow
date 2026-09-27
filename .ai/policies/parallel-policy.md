# Safe Parallel Work Policy (V4)

## Purpose

Define when and how concurrent execution is safe across diverse AI runtimes, specifying filesystem and semantic isolation criteria, dependency requirements, and fallback strategies.

## Safety Invariants for Concurrent Execution

Parallel execution is permitted **only** when all of the following conditions are met:
1. **Zero Filepath Overlap**: The planned output paths of concurrent tasks share no common files or directories.
2. **Zero Schema/State Contention**: Tasks do not simultaneously modify global database schemas, shared package dependencies, or shared configuration manifests.
3. **Satisfied Dependencies**: All parent nodes in `.ai/state/tasks.json` have status `COMPLETED` with verified evidence.
4. **Isolated Workspaces**: When tasks modify overlapping subsystems, they must execute in isolated Git worktrees.

## When Isolation is Required (Git Worktrees)

Use isolated Git worktrees when:
- Tasks modify adjacent files within the same subsystem.
- Tasks require distinct environment configurations or transient dependencies.
- A long-running task must proceed without blocking urgent hotfixes.

## When Shared Workspace is Safe

Tasks can run concurrently in the same workspace when:
- They touch completely distinct modules (e.g., backend billing service vs frontend analytics widget).
- One task is strictly read-only (e.g. code review, research, evaluation).
- Task contracts declare explicit disjoint output boundaries.

## Multi-Runtime Execution & Fallback Behavior

| Runtime Capability | Execution Strategy |
|--------------------|--------------------|
| **Native Subagents + Worktrees** (e.g., Antigravity, advanced agent harnesses) | Spawn focused subagents in isolated workspaces; reconcile upon completion. |
| **Workspace Agent Modes** (e.g., Cursor, VS Code Copilot) | Dispatch tasks using runtime agent modes, respecting declared file boundaries. |
| **Single-Agent / CLI Runtimes** (e.g., Codex CLI, Gemini CLI, Claude Code) | Fall back gracefully to sequential execution: run parallel-eligible DAG tasks in topological order with state synchronization after each task. |

## Reconciliation & Verification

1. Each completed concurrent task must record modified files and evidence in `.ai/state/tasks.json`.
2. The orchestrating agent verifies zero file or semantic conflicts before marking dependent tasks `READY`.
3. If conflicts arise, the conflict is flagged in `.ai/state/blockers.json` and escalated to human review.
