# Claude Code Project Rules — AEW V4 Integration

This project is governed by the **AEW V4 Portable Multi-Runtime Engineering Harness**.

## Core Guidelines

1. **Constitution**: Follow [AGENTS.md](../../AGENTS.md) as the primary project constitution.
2. **Canonical Skills**: Utilize Agent Skills located in `.agents/skills/`.
3. **Architecture & Coding**: Respect persistent invariants in `.agents/rules/` (`coding-rules.md`, `architecture-rules.md`, `ui-guidelines.md`, `security.md`).
4. **Lifecycle**: Execute requirements through the 11-stage lifecycle (Analyze -> Research -> Architecture -> UI/UX -> Plan -> Implement -> Test -> Verify -> Evaluate -> Review -> Evidence).
5. **Durable State**: Update task contracts and verification evidence in `.ai/state/tasks.json`.
6. **Security Invariants**: Enforce [.ai/policies/security-policy.json](../../.ai/policies/security-policy.json). Prompt the user before executing destructive commands.
