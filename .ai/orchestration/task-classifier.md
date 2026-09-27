# Multidimensional Task Classifier (V4)

## Purpose

Classify incoming engineering tasks across multiple dimensions (domain, activity, risk, scope, parallelizability) to activate the minimum high-signal roles, skills, and model tiers. This eliminates single-bucket limitations and prevents unnecessary harness sprawl.

## Classification Dimensions

Each task is classified across five orthogonal dimensions:

### 1. Primary Domain
- `frontend`: UI components, client-side rendering, styling, browser state.
- `uiux`: User flows, information architecture, screen hierarchy, design tokens, interaction states, accessibility.
- `backend`: Services, business logic, controllers, background workers.
- `fullstack`: Coordinated backend and frontend changes.
- `database`: Schemas, migrations, query optimization, indexes.
- `security`: Authentication, authorization, cryptography, secrets, permissions.
- `devops`: Docker, CI/CD, environments, build pipelines.
- `architecture`: System boundaries, ADRs, module refactoring.

### 2. Activity Type
- `implementation`: Authoring new code or features.
- `bugfix`: Diagnosing and resolving defects or regressions.
- `planning`: Requirements decomposition, task contracts, DAG generation.
- `review`: Evaluating code quality, security, and conventions.
- `evaluation`: Independently assessing actual functional outcomes against acceptance criteria.
- `research`: Investigating technical questions, libraries, or external APIs.

### 3. Risk Level
- `low`: Isolated formatting, doc changes, small CSS tweaks.
- `standard`: Routine feature development, standard CRUD, unit tests.
- `high`: Database migrations, public API changes, major refactors.
- `critical`: Authentication, encryption, payments, data deletion, production config.

### 4. Scope
- `isolated`: Modifies 1–2 files within a single module.
- `modular`: Modifies multiple files within a single subsystem.
- `cross-cutting`: Modifies interfaces across multiple subsystems or shared libraries.

### 5. Parallelizability
- `true`: Task has zero output path conflicts and no semantic dependencies with concurrent tasks.
- `false`: Task modifies shared files, database schemas, or package manifests.

---

## Classification Matrix & Routing Output

| Domain + Activity | Risk Level | Scope | Assigned Roles | Activated Skills | Model Tier |
|-------------------|------------|-------|----------------|------------------|------------|
| `frontend` + `implementation` (simple) | `low` | `isolated` | `implementer`, `verifier` | `implementing-frontend`, `verifying-changes` | `fast` |
| `uiux` / `new-user-flow` + `implementation` | `standard` | `modular` | `planner`, `implementer`, `verifier` | `designing-ui-ux`, `implementing-frontend`, `verifying-changes` | `standard` |
| `backend` + `implementation` | `standard` | `modular` | `planner`, `implementer`, `verifier`, `reviewer` | `planning`, `implementing-backend`, `testing-software`, `verifying-changes`, `reviewing-code` | `standard` |
| `any` + `bugfix` | `standard` | `isolated`/`modular` | `debugger`, `implementer`, `verifier` | `debugging-software`, `testing-software`, `verifying-changes` | `standard` |
| `security` + `any` | `critical` | `any` | `planner`, `implementer`, `verifier`, `security-reviewer` | `securing-applications`, `testing-software`, `verifying-changes` | `critical` |
| `architecture` + `planning` | `high` | `cross-cutting` | `planner`, `reviewer` | `analyzing-prd`, `planning`, `designing-architecture` | `strong` |
| `any` + `evaluation` | `standard` | `any` | `evaluator` | `evaluating-results` | `standard` |

---

## Task Contract Metadata Schema

Tasks stored in `.ai/state/tasks.json` include multidimensional metadata:

```json
{
  "id": "task-ui-01",
  "title": "Design and Implement Interactive Onboarding Flow",
  "classification": {
    "domain": "uiux",
    "activity": "implementation",
    "risk": "standard",
    "scope": "modular",
    "parallelizable": false
  },
  "roles": ["planner", "implementer", "verifier"],
  "skills": ["designing-ui-ux", "implementing-frontend", "verifying-changes"],
  "modelTier": "standard",
  "contextGroups": ["core", "uiux", "frontend"],
  "dependsOn": [],
  "expectedOutputs": [
    "src/components/onboarding/wizard.tsx",
    "src/components/onboarding/step-indicator.tsx"
  ],
  "acceptanceCriteria": [
    "Wizard renders 3 progressive onboarding steps with back/next actions",
    "Loading, empty, and validation states are explicitly handled",
    "Contrast ratios meet WCAG AA standards"
  ]
}
```

## Fallback & Non-Visual Rule

- If a task has no visual or user experience impact (e.g. backend endpoint, DB migration, script update), the `designing-ui-ux` skill is **never** loaded.
- If a task is a minor CSS fix or localized label edit, the task bypasses `designing-ui-ux` and routes directly to `implementing-frontend`.
