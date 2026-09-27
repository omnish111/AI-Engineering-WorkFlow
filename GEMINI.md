# Gemini / Antigravity Compatibility Entry Point

This file serves as a thin compatibility entry point for Google Antigravity IDE/CLI and Gemini CLI into the **AEW V4 Portable Multi-Runtime Engineering Harness**.

## Portable Core Navigation

- **Authoritative Constitution**: [AGENTS.md](AGENTS.md)
- **Canonical Agent Skills**: `.agents/skills/` (18 portable Agent Skills)
- **Persistent Invariants**: `.agents/rules/`
- **Role Contracts**: `.agents/agents/`
- **Portable Policies**: `.ai/policies/` (`security-policy.json`, `decision-policy.json`, `checkpoint-policy.json`)
- **Durable State**: `.ai/state/`
- **Runtime Adapter Details**: [.ai/adapters/antigravity/](.ai/adapters/antigravity/) and [.ai/adapters/gemini-cli/](.ai/adapters/gemini-cli/)

## Native Mechanism Mapping

- **Antigravity**: Discovers `.agents/skills`, `.agents/rules`, `.agents/agents`, and `.agents/hooks.json` natively.
- **Gemini CLI**: Discovers `GEMINI.md` and loads canonical Agent Skills from `.agents/skills/`.
- **Deterministic Hooks**: `.agents/hooks.json` forwards to `.ai/scripts/security-hook.js` enforcing `.ai/policies/security-policy.json`.
