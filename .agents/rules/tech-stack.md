---
trigger: model_decision
description: Baseline engineering technology stack preferences and compatibility requirements.
---

# Technical Stack Invariants

- **Stack Precedence**: For existing repositories, always inspect and adhere strictly to the project's actual installed stack, runtime, and package manager. Never force unconfigured frameworks.
- **Default Baseline (Fresh Web Apps)**: Next.js (App Router), React, TypeScript, Node.js LTS, Express/NestJS, MongoDB or PostgreSQL.
- **Testing Standard**: Node test runner or Jest/Vitest for unit/integration tests, Playwright for E2E tests.
- **Package Management**: Respect project-pinned lockfile (npm, pnpm, yarn, bun). Avoid installing redundant dependencies.
