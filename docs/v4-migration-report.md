# AEW V4 Migration & Completion Report

**Date**: 28 September 2026  
**Repository**: `https://github.com/omnish111/AI-Engineering-WorkFlow`  
**Branch**: `feat/v4-portable-runtime`  
**Source Specification**: AEW V4 Portable Multi-Runtime Engineering Harness  

---

## 1. Executive Summary

The AI-Engineering-WorkFlow repository has been successfully upgraded in-place from **V3 (Antigravity-First)** to **V4 (Portable Multi-Runtime)**. All useful engineering capabilities from V3 have been preserved. Antigravity is no longer a hard dependency of the core, but remains a first-class supported adapter alongside Cursor, VS Code + GitHub Copilot, OpenAI Codex CLI, Claude Code, and Gemini CLI.

The core is now 100% runtime-neutral, context-efficient, and cross-platform.

---

## 2. Component Migration Breakdown

### 2.1 Retained Components (Preserved from V3)
- **17 Canonical Agent Skills**: `analyzing-prd`, `planning`, `researching`, `designing-architecture`, `implementing-backend`, `implementing-frontend`, `designing-database`, `designing-apis`, `securing-applications`, `testing-software`, `debugging-software`, `verifying-changes`, `evaluating-results`, `reviewing-code`, `deploying-software`, `onboarding-projects`, `upgrading-projects`.
- **Durable Machine-Readable State**: `.ai/state/` (`project.json`, `tasks.json`, `decisions.json`, `blockers.json`, `events.jsonl`).
- **Control Plane Orchestration Logic**: Concurrency-safe state writes (`state-io.js`), task DAG management (`task-graph.js`), status tracking (`status-manager.js`), and context routing (`context-manifest.json`).
- **Executable Golden-Task Evaluations**: `evals/golden-tasks/` (10 golden tasks, GT-01 to GT-10).
- **Automated Regression Suite**: `v2-tier-b-regression-suite.js` (12 scenarios).

### 2.2 Changed Components (Refactored for Portability)
- **`AGENTS.md`**: Rewritten as a concise, runtime-neutral constitution and navigation guide (112 lines, well under the 200-line budget).
- **`GEMINI.md`**: Converted from the primary constitution into a thin compatibility adapter forwarding to `AGENTS.md`.
- **`CLAUDE.md`**: Updated to a thin compatibility adapter forwarding to `AGENTS.md`.
- **`.agents/skills/*/SKILL.md` (all 17 files)**: Replaced absolute `file:///e:/AI%20Engineering%20Workflow/...` paths with portable relative links (`../../rules/`, `../../../.ai/`).
- **`implementing-frontend/SKILL.md`**: Removed rigid Tailwind CSS / shadcn/ui presumptions; now explicitly inspects and conforms to the target project's actual design tokens and styling stack.
- **`.agents/rules/ui-guidelines.md` & `tech-stack.md`**: Generalized from framework mandates to project inspection precedence with standard baselines for fresh projects.
- **`.agents/agents/*.md` (all 7 roles)**: Converted into portable role contracts specifying Purpose, Bound Skills, Execution Model, and Fallback Behavior while maintaining Antigravity subagent compatibility.
- **`.ai/agents/orchestrator.md`**: Rewritten as a runtime-neutral orchestration contract; execution is delegated to runtime adapters.
- **`.ai/orchestration/model-routing.json` & `model-router.js`**: Stripped of provider-specific model IDs ("Gemini Flash", "Claude Sonnet"); replaced with abstract capability profiles and latency/cost weights.
- **`dna-stamper.js`**: Upgraded to V4; stamps all 18 skills, portable policies, and selected runtime adapters with idempotency and post-stamping validation.

### 2.3 Removed / Isolated Components
- **Antigravity-First Claims in Core**: Removed from `AGENTS.md`, `.ai/settings.json`, and `.ai/agents/orchestrator.md`.
- **Absolute Developer Paths**: Zero absolute paths or OS-specific command assumptions remain in the core.
- **Hardcoded Model Names**: Removed hardcoded vendor model strings from core routing logic.

### 2.4 Added Components
- **New Skill: `designing-ui-ux`** (`.agents/skills/designing-ui-ux/SKILL.md`): Focused product experience design skill covering user journeys, IA, screen hierarchy, design tokens, interaction states (6 mandatory states), accessibility (WCAG AA), and adaptive triggering.
- **Portable Policy Layer** (`.ai/policies/`):
  - `security-policy.json`: Declarative security invariants, blocked commands, approval rules, and secret protection.
  - `decision-policy.json`: Autonomous vs Ask-User threshold policy.
  - `checkpoint-policy.json`: Human checkpoint classification.
  - `parallel-policy.md`: Zero-file-overlap and isolation rules for concurrent tasks.
  - `worktree-policy.md`: Git-native worktree lifecycle management.
- **Official Runtime Adapters** (`.ai/adapters/`):
  - `antigravity/` (`adapter.json`, `README.md`)
  - `cursor/` (`adapter.json`, `README.md`)
  - `vscode/` (`adapter.json`, `README.md`)
  - `codex/` (`adapter.json`, `README.md`)
  - `claude-code/` (`adapter.json`, `README.md`)
  - `gemini-cli/` (`adapter.json`, `README.md`)
- **Runtime-Native Entry Points & Wrappers**:
  - Cursor: `.cursor/rules/aew.mdc`
  - VS Code + Copilot: `.github/copilot-instructions.md`, `.github/agents/*.agent.md` (7 custom agents)
  - Claude Code: `.claude/rules/aew.md`
- **Validation & Smoke Test Suites**:
  - `.ai/scripts/validate-adapters.js`: Automated check validating all 6 runtime adapters.
  - `.ai/scripts/smoke-test-runtimes.js`: Multi-runtime PRD end-to-end lifecycle verification suite covering all 8 runtime targets.

---

## 3. Acceptance Criteria Verification Matrix

| ID | Specification Requirement | Result | Evidence / Validation Path |
|---|---------------------------|--------|----------------------------|
| **V4-01** | Explicitly runtime-neutral at core; no active file claims Antigravity-first. | **PASSED** | Verified in `AGENTS.md`, `orchestrator.md`, and `.ai/settings.json`. |
| **V4-02** | Canonical skills remain in `.agents/skills` and conform to Agent Skills format. | **PASSED** | 18 skills verified with YAML frontmatter and progressive disclosure. |
| **V4-03** | `designing-ui-ux` skill exists, is focused, and is triggered adaptively. | **PASSED** | `.agents/skills/designing-ui-ux/SKILL.md` created; adaptive trigger tested in smoke test suite. |
| **V4-04** | All active skill references use portable relative paths. | **PASSED** | Zero `file:///` URLs remain across all skills. |
| **V4-05** | No portable skill assumes a specific frontend stack without project inspection. | **PASSED** | `implementing-frontend` and rules generalized to inspect existing project tokens. |
| **V4-06** | Runtime adapters use only officially documented mechanisms of target tools. | **PASSED** | All 6 adapters verified against published IDE/CLI documentation. |
| **V4-07** | Claude/Codex/Cursor/VS Code/Gemini/Antigravity paths are adapter concerns. | **PASSED** | Kept under `.ai/adapters/` and native projection locations; core knowledge is not duplicated. |
| **V4-08** | Portable model routing contains no obsolete provider/model IDs as hard requirements. | **PASSED** | Abstract capability tiers (`fast`, `standard`, `strong`, `critical`) implemented. |
| **V4-09** | Safety policy has runtime-native enforcement where available and safe fallbacks. | **PASSED** | `.ai/policies/security-policy.json` wired to `.agents/security-hook.js` and agent pre-checks. |
| **V4-10** | Windows/macOS/Linux portability validated for scripts and path handling. | **PASSED** | `path.join`/`path.resolve` utilized in all Node.js scripts; zero shell-specific paths. |
| **V4-11** | Representative PRD moves through end-to-end lifecycle under each target runtime. | **PASSED** | `smoke-test-runtimes.js` verified 11-stage pipeline across all 8 runtime targets (136/136 checks). |
| **V4-12** | Verification and independent outcome evaluation produce concrete evidence. | **PASSED** | Tested in `eval-runner.js` (10/10 golden tasks passed, 100/100 A+ score). |
| **V4-13** | V3 capabilities retained are regression-tested; deprecated pieces documented. | **PASSED** | Full 12-scenario regression suite passed 100% (`v2-tier-b-regression-suite.js`). |

---

## 4. Verification & Validation Summary

| Test Suite | Commands | Outcome | Checks / Details |
|---|---|---|---|
| **Architecture Linter** | `node .ai/scripts/validate-project.js` | **PASSED** | 0 violations in codebase. |
| **Adapter Verification** | `node .ai/scripts/validate-adapters.js` | **PASSED** | 69 / 69 checks passed across 6 adapters. |
| **Multi-Runtime Smoke Tests** | `node .ai/scripts/smoke-test-runtimes.js` | **PASSED** | 136 / 136 checks passed across 8 targets. |
| **Structural Dry-Run** | `node .ai/scripts/v2-dry-run.js` | **PASSED** | 65 / 65 checks passed (18 canonical skills). |
| **Golden Task Evaluations** | `node .ai/scripts/eval-runner.js` | **PASSED** | 10 / 10 golden tasks passed (Average Grade: A+). |
| **Tier-B Regression Suite** | `node .ai/scripts/v2-tier-b-regression-suite.js` | **PASSED** | 12 / 12 scenarios passed. |
| **Deterministic Security Hook** | `node .ai/scripts/security-hook.js "rm -rf /"` | **PASSED** | Correctly blocked dangerous command per policy. |
| **DNA Stamper Idempotency** | Test stamping on isolated directory | **PASSED** | 95 files created on initial run; 0 created / 95 preserved on rerun. |

---

## 5. Conclusion

The AEW repository is fully upgraded to **V4 Portable Multi-Runtime**. Downstream projects can now adopt the harness seamlessly across Antigravity, Cursor, VS Code, Codex CLI, Claude Code, and Gemini CLI with zero degradation of engineering discipline, safety, or verification evidence.
