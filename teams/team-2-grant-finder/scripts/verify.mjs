// Simple environment verification for the "npm run verify" prereq step.
// Prints Node version, checks dependencies installed, and runs unit tests.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

function line(msg) {
  process.stdout.write(`${msg}\n`);
}

line('— GitHub Copilot Hackathon: environment check (Team 2 — Grant Finder) —\n');

const nodeVersion = process.version;
line(`Node version:        ${nodeVersion}`);

const major = Number(nodeVersion.replace('v', '').split('.')[0]);
if (Number.isNaN(major) || major < 18) {
  line('\n❌ Node 18+ is required (LTS 20 or 22 recommended). See PREREQUISITES.md.');
  process.exit(1);
}

if (!existsSync(new URL('../node_modules', import.meta.url))) {
  line('\n❌ Dependencies not installed. Run: npm install');
  process.exit(1);
}
line('Dependencies:        installed');

try {
  line('\nRunning unit tests...\n');
  execSync('npm test', { stdio: 'inherit' });
} catch {
  line('\n❌ Unit tests failed. Check the output above.');
  process.exit(1);
}

line('\n✅ Environment looks good. You are ready for the hackathon!');
