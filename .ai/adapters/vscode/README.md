# VS Code + GitHub Copilot Runtime Adapter (AEW V4)

## Overview

The VS Code adapter integrates AEW V4 into Visual Studio Code with GitHub Copilot, utilizing Copilot's official Agent Skills, Custom Instructions, and Custom Agents specifications.

## Native Mechanism Mapping

| Dimension | AEW V4 Standard | VS Code + Copilot Native Mechanism |
|-----------|-----------------|-----------------------------------|
| **Discovery** | `AGENTS.md` | Discovered natively as workspace instructions; referenced by `.github/copilot-instructions.md`. |
| **Instructions** | `AGENTS.md` | `.github/copilot-instructions.md` points directly to the portable constitution. |
| **Skills** | `.agents/skills/` | Copilot natively discovers Agent Skills under `.agents/skills/`. |
| **Rules** | `.agents/rules/` | Linked in custom instructions; honored during file generation and review. |
| **Roles / Agents** | `.agents/agents/` | Mapped to native custom agents in `.github/agents/*.agent.md`. |
| **Safety** | `.ai/policies/security-policy.json` | VS Code Workspace Trust + Copilot terminal execution confirmation. |
| **Execution** | Multi-step DAG | Dispatched to specialized custom agents (`@planner`, `@implementer`, `@verifier`). |

## Usage

1. Open workspace in VS Code with GitHub Copilot Chat extension installed.
2. In Chat, ask Copilot or use custom agents:
   - `@planner Decompose doc/prd.md into task contracts`
   - `@implementer Execute task-auth-01`
   - `@verifier Run verification checks and capture evidence`
   - `@evaluator Run outcome evaluation against acceptance criteria`

## Fallback Behavior

- If custom agents are disabled, the general Copilot Chat participant (`@workspace`) reads `AGENTS.md` and executes all roles in sequence.
