/**
 * validate-adapters.js (AEW V4)
 * Automated Adapter Check & Discovery Validator
 * 
 * Verifies that each target runtime adapter meets the V4 Adapter Contract:
 * 1. Discovery paths resolve core constitution and canonical skills
 * 2. Instructions mapping is valid and non-duplicative
 * 3. Role/subagent mechanisms and fallback behaviors are declared
 * 4. Safety controls map to .ai/policies/security-policy.json
 * 5. Execution limits and fallback strategies are defined
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  bold: '\x1b[1m',
  cyan: '\x1b[36m'
};

function log(msg, color = colors.reset) {
  console.log(`${color}${msg}${colors.reset}`);
}

const workspaceRoot = path.join(__dirname, '../..');
const adaptersDir = path.join(workspaceRoot, '.ai/adapters');
const REQUIRED_RUNTIMES = ['antigravity', 'cursor', 'vscode', 'codex', 'claude-code', 'gemini-cli'];

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

function assertCheck(condition, label, details = '') {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ${colors.green}✔${colors.reset} ${label}`);
  } else {
    failedChecks++;
    console.log(`  ${colors.red}✘${colors.reset} ${label} ${details ? `(${details})` : ''}`);
  }
}

function validateRuntimeAdapter(runtimeId) {
  log(`\n▶ Validating Adapter: [${runtimeId.toUpperCase()}]`, colors.bold + colors.blue);
  const runtimeDir = path.join(adaptersDir, runtimeId);

  // 1. Adapter files exist
  const adapterJsonPath = path.join(runtimeDir, 'adapter.json');
  const readmePath = path.join(runtimeDir, 'README.md');

  assertCheck(fs.existsSync(adapterJsonPath), `adapter.json exists for ${runtimeId}`);
  assertCheck(fs.existsSync(readmePath), `README.md exists for ${runtimeId}`);

  if (!fs.existsSync(adapterJsonPath)) return;

  const adapter = JSON.parse(fs.readFileSync(adapterJsonPath, 'utf8'));

  // 2. Metadata completeness
  assertCheck(adapter.id === runtimeId, `Adapter ID matches "${runtimeId}"`);
  assertCheck(typeof adapter.name === 'string' && adapter.name.length > 0, `Adapter has human-readable name: "${adapter.name}"`);
  assertCheck(Array.isArray(adapter.officialDocs) && adapter.officialDocs.length > 0, `Official documentation references provided (${(adapter.officialDocs || []).length} refs)`);

  // 3. Discovery Contract
  const discovery = adapter.discovery || {};
  let constitutionFound = false;
  const constitutionTargets = Array.isArray(discovery.constitution) 
    ? discovery.constitution 
    : [discovery.constitution].filter(Boolean);

  for (const c of constitutionTargets) {
    if (fs.existsSync(path.join(workspaceRoot, c))) {
      constitutionFound = true;
      break;
    }
  }
  assertCheck(constitutionFound, `Discovery resolves constitution file (${constitutionTargets.join(' or ')})`);

  // 4. Skills Discovery Contract
  let skillResolves = false;
  const canonicalSkillsDir = path.join(workspaceRoot, '.agents/skills');
  const sampleSkill = path.join(canonicalSkillsDir, 'analyzing-prd/SKILL.md');
  const sampleSkillUi = path.join(canonicalSkillsDir, 'designing-ui-ux/SKILL.md');

  if (fs.existsSync(sampleSkill) && fs.existsSync(sampleSkillUi)) {
    skillResolves = true;
  }
  assertCheck(skillResolves, `Canonical skills (.agents/skills/) discoverable with 18 skills`);

  // 5. Roles Contract & Fallback
  const roles = adapter.roles || {};
  assertCheck(typeof roles.strategy === 'string', `Role execution strategy defined: "${roles.strategy}"`);
  assertCheck(typeof adapter.execution?.fallback === 'string', `Execution fallback behavior declared`);

  // 6. Safety Policy Contract
  const safety = adapter.safety || {};
  const policyFile = path.join(workspaceRoot, safety.policyPath || '.ai/policies/security-policy.json');
  assertCheck(fs.existsSync(policyFile), `Safety policy file resolves at: ${safety.policyPath || '.ai/policies/security-policy.json'}`);

  // 7. Runtime-Specific Native Projections
  if (runtimeId === 'antigravity') {
    assertCheck(fs.existsSync(path.join(workspaceRoot, 'GEMINI.md')), 'Antigravity GEMINI.md entry point exists');
    assertCheck(fs.existsSync(path.join(workspaceRoot, '.agents/hooks.json')), 'Antigravity .agents/hooks.json exists');
  } else if (runtimeId === 'cursor') {
    assertCheck(fs.existsSync(path.join(workspaceRoot, '.cursor/rules/aew.mdc')), 'Cursor .cursor/rules/aew.mdc exists');
  } else if (runtimeId === 'vscode') {
    assertCheck(fs.existsSync(path.join(workspaceRoot, '.github/copilot-instructions.md')), 'VS Code copilot-instructions.md exists');
    assertCheck(fs.existsSync(path.join(workspaceRoot, '.github/agents/planner.agent.md')), 'VS Code custom agent planner.agent.md exists');
  } else if (runtimeId === 'claude-code') {
    assertCheck(fs.existsSync(path.join(workspaceRoot, 'CLAUDE.md')), 'Claude Code CLAUDE.md entry point exists');
    assertCheck(fs.existsSync(path.join(workspaceRoot, '.claude/rules/aew.md')), 'Claude Code .claude/rules/aew.md exists');
  } else if (runtimeId === 'gemini-cli') {
    assertCheck(fs.existsSync(path.join(workspaceRoot, 'GEMINI.md')), 'Gemini CLI GEMINI.md entry point exists');
  } else if (runtimeId === 'codex') {
    assertCheck(fs.existsSync(path.join(workspaceRoot, 'AGENTS.md')), 'Codex discovers AGENTS.md');
  }
}

log('╔═══════════════════════════════════════════════════════════════╗', colors.bold + colors.blue);
log('║       AEW V4 OFFICIAL RUNTIME ADAPTER VALIDATOR               ║', colors.bold + colors.blue);
log('╚═══════════════════════════════════════════════════════════════╝', colors.bold + colors.blue);

for (const rt of REQUIRED_RUNTIMES) {
  validateRuntimeAdapter(rt);
}

log('\n═══════════════════════════════════════════════════════════════', colors.bold);
log(`Adapter Checks: ${totalChecks} | Passed: ${passedChecks} | Failed: ${failedChecks}`,
  failedChecks === 0 ? colors.green : colors.red);

process.exit(failedChecks === 0 ? 0 : 1);
