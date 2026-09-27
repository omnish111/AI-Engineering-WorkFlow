# Worktree Lifecycle Policy (V4)

## 1. Overview

Git worktrees provide clean, filesystem-level isolation for parallel agent task execution. This policy coordinates native Git worktrees with the portable AI Engineering Workflow task DAG across diverse agent environments without depending on a specific IDE's proprietary worktree engine.

## 2. Worktree Lifecycle

```
[DAG Task: READY]
       │
       ▼
   1. CREATE       → Create branch `feat/<taskId>` & worktree at `.worktrees/<taskId>`
       │
       ▼
 2. ATTACH TASK    → Link worktree metadata into `.ai/state/tasks.json`
       │
       ▼
  3. EXECUTE       → Agent executes task in isolated worktree directory
       │
       ▼
  4. VERIFY        → Run automated test suite within worktree environment
       │
       ▼
  5. COLLECT       → Collect outputs, test results, and verification evidence
       │
       ▼
 6. RECONCILE      → Merge branch into primary branch (or create PR)
       │
       ▼
  7. REMOVE        → Safe cleanup (REFUSES removal if uncommitted or unmerged)
```

## 3. Worktree Naming & Directory Convention

- **Directory**: `.worktrees/<taskId>`
- **Branch**: `feat/<taskId>` (or `fix/<taskId>`)
- **Metadata**: Recorded in `tasks.json` under `task.worktree`:
  ```json
  {
    "path": ".worktrees/task-001",
    "branch": "feat/task-001",
    "createdAt": "2026-09-28T00:00:00Z",
    "status": "ATTACHED|EXECUTING|VERIFIED|RECONCILED"
  }
  ```

## 4. Multi-Runtime Execution & Fallback

- **CLI / Standalone Environments**: Use Git-native worktrees managed deterministically via `node .ai/scripts/worktree-manager.js`.
- **Integrated IDEs**: When an IDE provides native worktree management, map task worktree metadata to the IDE's active workspace session.
- **Runtimes without Worktree Support**: Fall back to sequential in-place execution on feature branches.

## 5. Safety & Invariant Rules

1. **Uncommitted Work Protection**:
   Cleanup operations MUST check for uncommitted changes (`git status --porcelain`) before removal. If untracked or modified files exist, cleanup is aborted.
2. **Unmerged Branch Protection**:
   Worktree cleanup ensures branches are merged into the target integration branch before deletion.
3. **Conflict Handling**:
   Merge conflicts halt automatic integration; the task is marked `BLOCKED` with details in `.ai/state/blockers.json`.
4. **Stale Worktree Detection**:
   Completed or failed worktrees older than 48 hours are automatically audited for reconciliation.
