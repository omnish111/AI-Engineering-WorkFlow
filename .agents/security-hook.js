/**
 * Deterministic Security Lifecycle Hook & Enforcer (AEW V4)
 * 
 * Enforces safety guardrails across tool executions.
 * Dynamically loads rules from the portable policy: .ai/policies/security-policy.json.
 * Blocks dangerous operations and flags high-blast-radius actions for confirmation.
 */

const fs = require('fs');
const path = require('path');

function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', chunk => { data += chunk; });
    process.stdin.on('end', () => { resolve(data); });
    process.stdin.on('error', () => { resolve(''); });
  });
}

function loadSecurityPolicy() {
  const policyPaths = [
    path.join(__dirname, '../.ai/policies/security-policy.json'),
    path.join(__dirname, '../../.ai/policies/security-policy.json'),
    path.join(__dirname, 'security-policy.json')
  ];

  for (const p of policyPaths) {
    if (fs.existsSync(p)) {
      try {
        return JSON.parse(fs.readFileSync(p, 'utf8'));
      } catch (e) {
        // Fall back to defaults
      }
    }
  }
  return null;
}

const DEFAULT_BLOCKED = [
  { pattern: /rm\s+-rf\s+[\/\\]/i, reason: 'Root directory deletion blocked' },
  { pattern: /format\s+[a-z]:/i, reason: 'Disk format command blocked' },
  { pattern: /drop\s+database/i, reason: 'Database drop command blocked' },
  { pattern: /git\s+push.*(?:--force|-f\b)/i, reason: 'Force push to remote repository blocked' },
  { pattern: /git\s+clean\s+(?:-[a-z]*f[a-z]*d|-[a-z]*d[a-z]*f)/i, reason: 'Untracked file deletion without review blocked' },
  { pattern: /(?:cat|type|more|Get-Content)\s+[^\n]*\.env\b/i, reason: 'Direct display of .env secret file blocked' }
];

const DEFAULT_RISKY = [
  { pattern: /git\s+reset\s+--hard/i, reason: 'Hard git reset discards working changes' },
  { pattern: /(?:npm|pnpm|yarn)\s+publish/i, reason: 'Package publish requires explicit confirmation' },
  { pattern: /docker\s+system\s+prune/i, reason: 'Docker system prune removes local images and containers' }
];

async function main() {
  let commandLine = process.argv.slice(2).join(' ').trim();
  
  if (!commandLine) {
    if (process.stdin.isTTY) {
      console.log(JSON.stringify({ decision: 'allow' }));
      return;
    }
    const input = await readStdin();
    if (!input.trim()) {
      console.log(JSON.stringify({ decision: 'allow' }));
      return;
    }

    try {
      const payload = JSON.parse(input);
      const toolCall = payload.toolCall || {};
      const args = toolCall.args || payload.args || {};
      commandLine = args.CommandLine || args.command || payload.command || '';
    } catch (err) {
      console.log(JSON.stringify({ decision: 'allow' }));
      return;
    }
  }

  // Load policies
  const policy = loadSecurityPolicy();
  let blockedRules = DEFAULT_BLOCKED;
  let riskyRules = DEFAULT_RISKY;

  if (policy) {
    if (Array.isArray(policy.blockedOperations)) {
      blockedRules = policy.blockedOperations.map(r => ({
        pattern: new RegExp(r.pattern, 'i'),
        reason: r.reason
      }));
    }
    if (Array.isArray(policy.approvalRequiredOperations)) {
      riskyRules = policy.approvalRequiredOperations.map(r => ({
        pattern: new RegExp(r.pattern, 'i'),
        reason: r.reason
      }));
    }
  }

  if (commandLine) {
    for (const item of blockedRules) {
      if (item.pattern.test(commandLine)) {
        console.log(JSON.stringify({
          decision: 'deny',
          reason: `[SECURITY GUARD] Blocked dangerous command: ${item.reason}`
        }));
        return;
      }
    }

    for (const item of riskyRules) {
      if (item.pattern.test(commandLine)) {
        console.log(JSON.stringify({
          decision: 'ask',
          reason: `[SECURITY GUARD] High-blast-radius command: ${item.reason}`
        }));
        return;
      }
    }
  }

  console.log(JSON.stringify({ decision: 'allow' }));
}

main();
