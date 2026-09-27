# Claude Code Compatibility Entry Point

This file serves as a thin compatibility entry point for Anthropic's Claude Code into the **AEW V4 Portable Multi-Runtime Engineering Harness**.

## Portable Core Navigation

- **Authoritative Constitution**: [AGENTS.md](AGENTS.md)
- **Canonical Agent Skills**: `.agents/skills/` (18 portable Agent Skills)
- **Persistent Invariants**: `.agents/rules/`
- **Role Contracts**: `.agents/agents/`
- **Portable Policies**: `.ai/policies/` (`security-policy.json`, `decision-policy.json`, `checkpoint-policy.json`)
- **Durable State**: `.ai/state/`
- **Runtime Adapter Details**: [.ai/adapters/claude-code/](.ai/adapters/claude-code/)

## Instructions

When operating with Claude Code in this repository:
1. Always follow the engineering lifecycle and rules defined in [AGENTS.md](AGENTS.md).
2. Activate canonical skills from `.agents/skills/` progressively based on task type.
3. Record task updates and verification evidence in `.ai/state/tasks.json`.
4. Enforce security constraints from `.ai/policies/security-policy.json`.
