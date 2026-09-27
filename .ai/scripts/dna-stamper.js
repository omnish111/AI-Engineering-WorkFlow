/**
 * dna-stamper.js (AEW V4)
 * Stamps portable engineering DNA (.ai/, .agents/, AGENTS.md, runtime adapters)
 * into any target project directory across all supported AI runtimes.
 * Pure Node.js - Zero external npm dependencies. Cross-platform.
 */

const fs = require('fs');
const path = require('path');

const FACTORY_ROOT = path.join(__dirname, '../..');
const TEMPLATES_DIR = path.join(__dirname, '../templates/dna');

// 18 Canonical Execution Skills (V4)
const EXECUTION_SKILLS = [
  'analyzing-prd',
  'planning',
  'researching',
  'designing-architecture',
  'designing-ui-ux',
  'implementing-backend',
  'implementing-frontend',
  'designing-database',
  'designing-apis',
  'securing-applications',
  'testing-software',
  'debugging-software',
  'verifying-changes',
  'evaluating-results',
  'reviewing-code',
  'deploying-software',
  'onboarding-projects',
  'upgrading-projects'
];

// Project-level runtime scripts
const PROJECT_SCRIPTS = [
  'task-graph.js',
  'status-manager.js',
  'validate-project.js',
  'worktree-manager.js',
  'git-sync.js',
  'model-router.js',
  'maintenance-runner.js',
  'telemetry-report.js',
  'update-context-manifest.js',
  'state-io.js',
  'security-hook.js'
];

// Portable policies
const PORTABLE_POLICIES = [
  'security-policy.json',
  'decision-policy.json',
  'checkpoint-policy.json',
  'parallel-policy.md',
  'worktree-policy.md'
];

const ALL_RUNTIMES = ['antigravity', 'cursor', 'vscode', 'codex', 'claude-code', 'gemini-cli'];

function stampDNA(targetDir, options = {}) {
  if (!fs.existsSync(targetDir)) {
    throw new Error(`Target directory does not exist: ${targetDir}`);
  }

  const resolvedTarget = path.resolve(targetDir);
  const projectName = options.projectName || path.basename(resolvedTarget);
  const projectId = options.projectId || projectName.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
  const now = new Date().toISOString();

  const runtimesArg = options.runtimes || 'all';
  const selectedRuntimes = runtimesArg === 'all'
    ? ALL_RUNTIMES
    : runtimesArg.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);

  const createdFiles = [];
  const updatedFiles = [];
  const preservedFiles = [];

  function safeWrite(filePath, content, isForce = options.force) {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const relPath = path.relative(resolvedTarget, filePath).replace(/\\/g, '/');
    if (fs.existsSync(filePath)) {
      if (isForce) {
        fs.writeFileSync(filePath, content, 'utf8');
        updatedFiles.push(relPath);
      } else {
        preservedFiles.push(relPath);
      }
    } else {
      fs.writeFileSync(filePath, content, 'utf8');
      createdFiles.push(relPath);
    }
  }

  function safeCopy(srcPath, destPath, isForce = options.force) {
    if (!fs.existsSync(srcPath)) return;
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const relPath = path.relative(resolvedTarget, destPath).replace(/\\/g, '/');
    if (fs.existsSync(destPath)) {
      if (isForce) {
        fs.copyFileSync(srcPath, destPath);
        updatedFiles.push(relPath);
      } else {
        preservedFiles.push(relPath);
      }
    } else {
      fs.copyFileSync(srcPath, destPath);
      createdFiles.push(relPath);
    }
  }

  function safeCopyDir(srcDir, destDir, isForce = options.force) {
    if (!fs.existsSync(srcDir)) return;
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

    const entries = fs.readdirSync(srcDir, { withFileTypes: true });
    for (const entry of entries) {
      const srcEntry = path.join(srcDir, entry.name);
      const destEntry = path.join(destDir, entry.name);
      if (entry.isDirectory()) {
        safeCopyDir(srcEntry, destEntry, isForce);
      } else {
        safeCopy(srcEntry, destEntry, isForce);
      }
    }
  }

  // Build replacement dictionary
  const replacements = {
    '{{PROJECT_NAME}}': projectName,
    '{{PROJECT_ID}}': projectId,
    '{{PROJECT_DESCRIPTION}}': options.description || `${projectName} application`,
    '{{PROJECT_DOMAIN}}': options.domain || 'General SaaS Application',
    '{{PROJECT_MODE}}': options.mode || 'Created',
    '{{TECH_STACK_SUMMARY}}': options.techStackSummary || `${options.framework || 'Node.js'} / ${options.language || 'TypeScript'}`,
    '{{FRAMEWORK}}': options.framework || 'Node.js',
    '{{LANGUAGE}}': options.language || 'TypeScript',
    '{{STYLING}}': options.styling || 'CSS',
    '{{DATABASE}}': options.database || 'MongoDB',
    '{{ORM}}': options.orm || 'Mongoose',
    '{{API_PATTERN}}': options.apiPattern || 'REST Handlers',
    '{{PACKAGE_MANAGER}}': options.packageManager || 'npm',
    '{{DEV_COMMAND}}': options.devCommand || 'npm run dev',
    '{{BUILD_COMMAND}}': options.buildCommand || 'npm run build',
    '{{TEST_COMMAND}}': options.testCommand || 'npm test',
    '{{LINT_COMMAND}}': options.lintCommand || 'npm run lint',
    '{{CREATED_AT}}': options.createdAt || now,
    '{{LAST_UPDATED}}': now
  };

  function interpolate(content) {
    let res = content;
    for (const [key, val] of Object.entries(replacements)) {
      res = res.split(key).join(String(val));
    }
    return res;
  }

  // 1. Portable Core Constitution (AGENTS.md)
  const agentsTmpl = path.join(TEMPLATES_DIR, 'AGENTS.md.template');
  const targetAgentsMd = path.join(resolvedTarget, 'AGENTS.md');
  if (fs.existsSync(agentsTmpl)) {
    const raw = fs.readFileSync(agentsTmpl, 'utf8');
    safeWrite(targetAgentsMd, interpolate(raw));
  } else {
    // Fall back to factory AGENTS.md
    safeCopy(path.join(FACTORY_ROOT, 'AGENTS.md'), targetAgentsMd);
  }

  // 2. Machine-Readable State (.ai/state/)
  const stateFiles = {
    'project.json': {
      id: projectId,
      name: projectName,
      description: options.description || `${projectName} application`,
      status: "active",
      architectureVersion: "v4-portable-runtime",
      createdAt: now,
      updatedAt: now
    },
    'tasks.json': {
      version: "4.0",
      project: projectName,
      description: `Task dependency graph (DAG) for ${projectName}`,
      tasks: []
    },
    'decisions.json': {
      version: "4.0",
      decisions: []
    },
    'blockers.json': {
      version: "4.0",
      blockers: []
    }
  };

  for (const [sFile, sData] of Object.entries(stateFiles)) {
    const sPath = path.join(resolvedTarget, '.ai', 'state', sFile);
    safeWrite(sPath, JSON.stringify(sData, null, 2));
  }

  // Append-only events.jsonl
  const eventsPath = path.join(resolvedTarget, '.ai', 'state', 'events.jsonl');
  if (!fs.existsSync(eventsPath)) {
    safeWrite(eventsPath, JSON.stringify({
      id: `evt-${Date.now()}-init`,
      timestamp: now,
      type: "PROJECT_INITIALIZED",
      payload: { projectId, projectName, runtimes: selectedRuntimes }
    }) + '\n');
  }

  // 3. Settings (.ai/settings.json)
  const settingsPath = path.join(resolvedTarget, '.ai', 'settings.json');
  safeWrite(settingsPath, JSON.stringify({
    version: "4.0.0",
    architectureVersion: "v4-portable-runtime",
    project: {
      name: projectName,
      id: projectId,
      status: "active"
    },
    orchestration: {
      model: "capability-tier",
      skillRegistry: "orchestration/skill-registry.json",
      roleRegistry: "orchestration/role-registry.json",
      modelRouting: "orchestration/model-routing.json",
      taskClassifier: "orchestration/task-classifier.md",
      decisionPolicy: "policies/decision-policy.json",
      contextManifest: "orchestration/context-manifest.json",
      checkpointPolicy: "policies/checkpoint-policy.json",
      verificationSchema: "orchestration/verification-schema.json",
      parallelPolicy: "policies/parallel-policy.md",
      securityPolicy: "policies/security-policy.json"
    },
    workflow: {
      model: "task-dag",
      taskGraph: "state/tasks.json",
      taskGraphScript: "scripts/task-graph.js"
    },
    paths: {
      rules: ".agents/rules",
      skills: ".agents/skills",
      agents: ".agents/agents",
      hooks: ".agents/hooks.json",
      orchestration: ".ai/orchestration",
      policies: ".ai/policies",
      adapters: ".ai/adapters",
      state: ".ai/state",
      evaluations: "evals/golden-tasks",
      scripts: ".ai/scripts"
    }
  }, null, 2));

  // 4. Portable Policies (.ai/policies/)
  for (const pol of PORTABLE_POLICIES) {
    const srcPolicy = path.join(FACTORY_ROOT, '.ai', 'policies', pol);
    const destPolicy = path.join(resolvedTarget, '.ai', 'policies', pol);
    safeCopy(srcPolicy, destPolicy);
  }

  // 5. Canonical Execution Skills (.agents/skills/) - all 18 skills
  for (const skill of EXECUTION_SKILLS) {
    const srcSkillDir = path.join(FACTORY_ROOT, '.agents', 'skills', skill);
    const destSkillDir = path.join(resolvedTarget, '.agents', 'skills', skill);
    safeCopyDir(srcSkillDir, destSkillDir);
  }

  // 6. Native Invariant Rules (.agents/rules/)
  const srcRulesDir = path.join(FACTORY_ROOT, '.agents', 'rules');
  const destRulesDir = path.join(resolvedTarget, '.agents', 'rules');
  safeCopyDir(srcRulesDir, destRulesDir);

  // 7. Portable Role Contracts (.agents/agents/)
  const srcAgentsDir = path.join(FACTORY_ROOT, '.agents', 'agents');
  const destAgentsDir = path.join(resolvedTarget, '.agents', 'agents');
  safeCopyDir(srcAgentsDir, destAgentsDir);

  // 8. Control Plane Orchestration (.ai/orchestration/)
  const orchSrcDir = path.join(FACTORY_ROOT, '.ai', 'orchestration');
  const orchDestDir = path.join(resolvedTarget, '.ai', 'orchestration');
  safeCopyDir(orchSrcDir, orchDestDir);

  // 9. Project Runtime Scripts (.ai/scripts/)
  for (const script of PROJECT_SCRIPTS) {
    const srcScript = path.join(FACTORY_ROOT, '.ai', 'scripts', script);
    const destScript = path.join(resolvedTarget, '.ai', 'scripts', script);
    safeCopy(srcScript, destScript);
  }

  // 10. Selected Runtime Adapters
  for (const rt of selectedRuntimes) {
    const adapterSrc = path.join(FACTORY_ROOT, '.ai', 'adapters', rt);
    const adapterDest = path.join(resolvedTarget, '.ai', 'adapters', rt);
    safeCopyDir(adapterSrc, adapterDest);

    // Apply runtime-native project projections
    if (rt === 'antigravity') {
      safeCopy(path.join(FACTORY_ROOT, 'GEMINI.md'), path.join(resolvedTarget, 'GEMINI.md'));
      safeCopy(path.join(FACTORY_ROOT, '.agents', 'hooks.json'), path.join(resolvedTarget, '.agents', 'hooks.json'));
      safeCopy(path.join(FACTORY_ROOT, '.agents', 'security-hook.js'), path.join(resolvedTarget, '.agents', 'security-hook.js'));
    }
    if (rt === 'cursor') {
      safeCopy(path.join(FACTORY_ROOT, '.cursor', 'rules', 'aew.mdc'), path.join(resolvedTarget, '.cursor', 'rules', 'aew.mdc'));
    }
    if (rt === 'vscode') {
      safeCopy(path.join(FACTORY_ROOT, '.github', 'copilot-instructions.md'), path.join(resolvedTarget, '.github', 'copilot-instructions.md'));
      safeCopyDir(path.join(FACTORY_ROOT, '.github', 'agents'), path.join(resolvedTarget, '.github', 'agents'));
    }
    if (rt === 'claude-code') {
      safeCopy(path.join(FACTORY_ROOT, 'CLAUDE.md'), path.join(resolvedTarget, 'CLAUDE.md'));
      safeCopy(path.join(FACTORY_ROOT, '.claude', 'rules', 'aew.md'), path.join(resolvedTarget, '.claude', 'rules', 'aew.md'));
    }
    if (rt === 'gemini-cli') {
      safeCopy(path.join(FACTORY_ROOT, 'GEMINI.md'), path.join(resolvedTarget, 'GEMINI.md'));
    }
  }

  // 11. Post-Stamping Validation
  const validation = validateStampedDNA(resolvedTarget, selectedRuntimes);

  return {
    success: validation.passed,
    targetDir: resolvedTarget,
    selectedRuntimes,
    created: createdFiles.length,
    updated: updatedFiles.length,
    preserved: preservedFiles.length,
    createdFiles,
    updatedFiles,
    preservedFiles,
    validation
  };
}

function validateStampedDNA(targetDir, selectedRuntimes = ALL_RUNTIMES) {
  const errors = [];
  const warnings = [];

  // Check constitution
  if (!fs.existsSync(path.join(targetDir, 'AGENTS.md'))) {
    errors.push('Missing core constitution: AGENTS.md');
  }

  // Check state
  const stateFiles = ['project.json', 'tasks.json', 'decisions.json', 'blockers.json'];
  for (const sf of stateFiles) {
    if (!fs.existsSync(path.join(targetDir, '.ai', 'state', sf))) {
      errors.push(`Missing state file: .ai/state/${sf}`);
    }
  }

  // Check skills count
  const skillsDir = path.join(targetDir, '.agents', 'skills');
  if (!fs.existsSync(skillsDir)) {
    errors.push('Missing skills directory: .agents/skills');
  } else {
    const presentSkills = fs.readdirSync(skillsDir);
    for (const skill of EXECUTION_SKILLS) {
      if (!presentSkills.includes(skill)) {
        errors.push(`Missing canonical skill: ${skill}`);
      }
    }
  }

  // Check selected runtimes
  for (const rt of selectedRuntimes) {
    const adapterDir = path.join(targetDir, '.ai', 'adapters', rt);
    if (!fs.existsSync(adapterDir)) {
      warnings.push(`Adapter directory not stamped for runtime: ${rt}`);
    }
  }

  return {
    passed: errors.length === 0,
    errors,
    warnings
  };
}

// CLI Execution Support
if (require.main === module) {
  const target = process.argv[2];
  if (!target) {
    console.error('Usage: node dna-stamper.js <targetDirectory> [--runtimes <all|list>] [--config <jsonFile>] [--force]');
    process.exit(1);
  }

  let options = {};
  const runtimesIdx = process.argv.indexOf('--runtimes');
  if (runtimesIdx !== -1 && process.argv[runtimesIdx + 1]) {
    options.runtimes = process.argv[runtimesIdx + 1];
  }

  const configIdx = process.argv.indexOf('--config');
  if (configIdx !== -1 && process.argv[configIdx + 1]) {
    try {
      const cfg = JSON.parse(fs.readFileSync(process.argv[configIdx + 1], 'utf8'));
      options = { ...options, ...cfg };
    } catch (e) {
      console.warn(`Could not read config file: ${e.message}`);
    }
  }

  if (process.argv.includes('--force')) {
    options.force = true;
  }

  try {
    const res = stampDNA(target, options);
    console.log(JSON.stringify(res, null, 2));
    process.exit(res.success ? 0 : 1);
  } catch (err) {
    console.error(`Stamping error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = { stampDNA, validateStampedDNA, EXECUTION_SKILLS };
