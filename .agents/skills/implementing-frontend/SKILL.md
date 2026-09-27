---
name: implementing-frontend
description: Implements client-side interfaces, responsive UI components, user flows, state management, and animations. Use when authoring frontend components, pages, or client logic.
---

# Purpose
Create responsive, accessible, aesthetic user interfaces with robust state management and defensive handling of all view states.

# When to Use
- Authoring or modifying frontend components, pages, hooks, client state stores, templates, or styles across the project's chosen stack.
- Implementing UI flows, forms, data tables, modals, and design system elements according to approved UI/UX specifications.

# Procedure
1. **Inspect & Decompose**:
   - Inspect the target project's existing UI architecture, styling conventions (e.g. Tailwind CSS, CSS Modules, styled-components, design tokens, or vanilla CSS), and component patterns.
   - Decompose interface into focused, reusable components with explicit typed prop contracts without imposing an unconfigured framework.
2. **Handle Mandatory States**:
   - **Loading State**: Render skeleton screens or spinner indicators while fetching data.
   - **Empty State**: Provide informative copy and action button when lists or search results are empty.
   - **Error State**: Display understandable error message with a retry trigger.
3. **Form & Input Validation**:
   - Validate client inputs immediately with user-friendly feedback.
   - Disable submission buttons and show loading states during active requests to prevent duplicate submissions.
4. **Responsive & Accessible Polish**:
   - Verify layout adapts seamlessly across mobile (375px), tablet (768px), and desktop (1280px+).
   - Ensure proper contrast, keyboard navigability, and semantic HTML tags.

# Decision Tree
```
Component Implementation
├── Data-driven view? ──► Must implement Loading, Empty, and Error states
├── User input form? ──► Validate fields -> Disable on submit -> Show inline errors
└── Static layout? ──► Mobile-first responsive grid/flex -> Check accessibility contrast
```

# Verification
- All 3 states (Loading, Empty, Error) explicitly handled.
- No unhandled undefined errors (`Cannot read property of undefined`).
- Component renders cleanly across viewport breakpoints.

# References
- [UI Guidelines](../../rules/ui-guidelines.md)
