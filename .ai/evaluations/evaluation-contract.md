# AEW V4 Evaluation Contract & Evidence Standards

## Purpose

Define the standards for independent outcome evaluation and verification across all agent runtimes. No task is complete without concrete, reproducible verification evidence.

## Verification vs. Evaluation vs. Review

- **Verification (`verifying-changes`)**:
  - Technical engineering checks: build compilation, typecheck, linting, unit/integration test execution, runtime status.
  - Evidence required: command executed, exit code, stdout/stderr snippet, passing test count.
- **Evaluation (`evaluating-results`)**:
  - Independent user-outcome validation: does the change fulfill user requirements, acceptance criteria, and expected end-to-end journey without regressions?
  - Evidence required: actual acceptance criteria checked, user-journey trace, state validation, regression check.
- **Review (`reviewing-code` / `securing-applications`)**:
  - Architectural integrity, layer boundaries, code clarity, security analysis (authn/authz, input validation, least privilege, zero secret exposure).

## Evaluation Matrix & Golden Tasks

Golden tasks are defined in `evals/golden-tasks/`:
1. `GT-01`: Simple Frontend Change
2. `GT-02`: Backend CRUD Endpoint
3. `GT-03`: Authentication & Password Reset
4. `GT-04`: Runtime Bug Fix
5. `GT-05`: Security-Sensitive Feature
6. `GT-06`: Database Schema Change
7. `GT-07`: Independent Parallel Work
8. `GT-08`: Ambiguous Requirement Handling
9. `GT-09`: Interrupted Workflow Resume
10. `GT-10`: Deployment & Infrastructure Analysis

## Executable Evidence Schema

Recorded in `.ai/state/tasks.json` under `task.evidence`:
```json
{
  "taskId": "task-001",
  "verifiedBy": "verifier",
  "evaluatedBy": "evaluator",
  "timestamp": "2026-09-28T00:00:00Z",
  "verification": {
    "type": "unit-and-e2e-test",
    "command": "npm test",
    "exitCode": 0,
    "passed": true
  },
  "evaluation": {
    "acceptanceCriteriaMet": ["AC-1", "AC-2"],
    "outcomeGrade": "A+",
    "userJourneyVerified": true
  }
}
```
