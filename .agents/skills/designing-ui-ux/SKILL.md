---
name: designing-ui-ux
description: Designs user flows, information architecture, screen hierarchy, design tokens, interaction states, and accessibility. Use when requirements materially introduce or alter product experience, user journeys, or interface workflows.
---

# Purpose

Design purposeful, accessible, high-signal user experiences, screen layouts, and interaction flows that translate product requirements into clear, implementation-ready UI specifications for frontend engineering.

# When to Use

- **Activate when**:
  - A feature introduces a new user journey, multi-step flow, onboarding path, or checkout/submission workflow.
  - A new view, dashboard, or complex screen is being architected from PRD requirements.
  - Existing user navigation, information architecture, or core interaction models are being redesigned.
- **Do NOT activate when**:
  - The task is backend-only, database-only, DevOps, or purely non-visual logic.
  - The task is a routine visual bug fix, simple CSS tweak, or localized text correction (proceed directly to `implementing-frontend`).
  - Existing UI patterns and screens already provide sufficient specification for straightforward component implementation.

# Core Design Disciplines & Procedure

1. **Product Goals & User Needs**:
   - Establish primary user persona, emotional tone, and core job-to-be-done.
   - Define success criteria for the user (clarity, speed to completion, low friction).

2. **User Journeys & Task Flows**:
   - Map out the end-to-end user path from entry point to goal achievement.
   - Identify decision forks, branch conditions, and potential drop-off points.

3. **Information Architecture & Navigation**:
   - Organize domain concepts into clear mental models and page hierarchies.
   - Establish predictable navigation landmarks (app shell, breadcrumbs, sidebar, tabs, modal dialogs).

4. **Screen Hierarchy & Layout**:
   - Apply structured visual hierarchy: Primary call-to-action (hero/primary focus), supporting content, and secondary utilities.
   - Structure layout using consistent spacing grids (4px/8px scale) and responsive containers.

5. **Interaction & State Design**:
   - Explicitly specify behavior for all 6 essential interactive states:
     1. **Default / Rest**: Clear visual affordance, legible contrast, explicit role.
     2. **Hover / Focus-Visible**: High-visibility focus indicators meeting WCAG standards.
     3. **Active / Pressed**: Tactile visual feedback on user engagement.
     4. **Loading / Pending**: Skeleton screens or inline indicators preventing duplicate actions.
     5. **Empty State**: Friendly messaging, explanatory context, and actionable recovery button.
     6. **Error / Disabled**: Human-readable error recovery guidance and clear disabled cues.

6. **Component & Design-System Consistency**:
   - Inspect and inherit the project's existing design tokens (colors, typography, radii, shadows).
   - If scaffolding a new project, define a clean semantic token palette (neutral scale, primary brand, semantic feedback colors: success, warning, error, info).

7. **Responsive & Multi-Device Behavior**:
   - Define breakpoint adaptations: Mobile (375px–640px), Tablet (768px–1024px), Desktop (1280px+).
   - Ensure touch targets are at least 44x44px on mobile and navigation adapts smoothly.

8. **Accessibility (a11y) by Construction**:
   - Enforce WCAG AA minimum 4.5:1 text-to-background contrast ratio (3:1 for large text).
   - Specify semantic HTML elements (`<nav>`, `<main>`, `<dialog>`, `<form>`) and ARIA labels where needed.
   - Guarantee full keyboard navigability (logical tab order, Escape to close modals, Enter/Space activation).

9. **Edge Cases & Failure Modes**:
   - Plan for extreme text lengths (truncation vs wrapping), long usernames, and localized content.
   - Handle slow network latency, partial data availability, and rate-limit states.

10. **Implementation-Ready Handoff**:
    - Produce structured component hierarchy, required props/data contracts, state definitions, and UX copy.
    - Hand off clean specification to `implementing-frontend`.

# Decision Tree

```
Incoming Request Involves UI?
├── No ──► Do NOT activate designing-ui-ux (skip to backend/devops/planning)
└── Yes ──► Does it introduce a new flow, complex view, or interaction redesign?
    ├── No (Small CSS tweak / bugfix / minor label change) ──► Skip designing-ui-ux ──► implementing-frontend
    └── Yes (New journey / new screen / complex interaction) ──► ACTIVATE designing-ui-ux
        ├── Step 1: Map user journeys & information architecture
        ├── Step 2: Establish screen hierarchy, layout, & responsive breakpoints
        ├── Step 3: Specify 6 mandatory interactive & data states
        ├── Step 4: Validate accessibility (WCAG AA) & design system tokens
        └── Step 5: Generate component specifications ──► Handoff to implementing-frontend
```

# Verification & Acceptance Validation

- [ ] User task flow has zero dead ends or ambiguous navigation loops.
- [ ] Screen hierarchy clearly distinguishes primary from secondary actions.
- [ ] All 6 view states (Default, Hover/Focus, Active, Loading, Empty, Error) are explicitly defined.
- [ ] Contrast ratios meet or exceed WCAG AA requirements (4.5:1 for normal text).
- [ ] Layout behaves predictably across mobile (375px), tablet (768px), and desktop (1280px+) breakpoints.
- [ ] Output provides concrete component specifications ready for `implementing-frontend`.

# References

- [UI Guidelines & Visual Invariants](../../rules/ui-guidelines.md)
- [Implementing Frontend Skill](../implementing-frontend/SKILL.md)
- [Analyzing PRD Skill](../analyzing-prd/SKILL.md)
