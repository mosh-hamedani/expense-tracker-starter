#!/usr/bin/env node
// Driver for the Finance Tracker (expense-tracker-starter) Vite + React SPA.
//
// Runs a real end-to-end flow against the app in a headless browser and
// proves it rendered + reacted to input by taking screenshots and checking
// the console for errors. Self-contained: it starts the Vite dev server,
// waits for it, drives Playwright Chromium against it, then tears everything
// down.
//
//   node .claude/skills/run-expense-tracker-starter/driver.mjs
//
// Flags:
//   --url <url>   Drive an already-running dev server instead of spawning one
//                 (e.g. --url http://localhost:5173). Skips the npm run dev step.
//   --headed      Launch a visible browser window (default: headless).
//
// Screenshots land in:
//   .claude/skills/run-expense-tracker-starter/screenshots/
//
// Exit code 0 = the flow worked and no console errors. Non-zero otherwise.

import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..', '..', '..'); // skill dir -> unit root
const shotsDir = join(__dirname, 'screenshots');
mkdirSync(shotsDir, { recursive: true });

const args = process.argv.slice(2);
const externalUrl = args.includes('--url') ? args[args.indexOf('--url') + 1] : null;
const headed = args.includes('--headed');

const log = (...a) => console.log('[driver]', ...a);
let devProc = null;

function startDevServer() {
  return new Promise((resolve, reject) => {
    log('starting vite dev server (npm run dev)...');
    // detached: true puts vite in its own process group so we can signal the
    // whole tree on teardown — SIGTERM to `npm` alone leaves the vite child orphaned.
    devProc = spawn('npm', ['run', 'dev'], { cwd: projectRoot, env: process.env, detached: true });
    let settled = false;
    const onData = (buf) => {
      const s = buf.toString();
      process.stdout.write(s.replace(/^/gm, '[vite] '));
      const m = s.match(/Local:\s+(http:\/\/\S+)/);
      if (m && !settled) {
        settled = true;
        resolve(m[1].replace(/\/$/, ''));
      }
    };
    devProc.stdout.on('data', onData);
    devProc.stderr.on('data', onData);
    devProc.on('exit', (code) => {
      if (!settled) reject(new Error(`vite exited early with code ${code}`));
    });
    setTimeout(() => {
      if (!settled) reject(new Error('vite did not report a Local URL within 30s'));
    }, 30000);
  });
}

function stopDevServer() {
  if (devProc && !devProc.killed) {
    log('stopping dev server...');
    try {
      // Negative PID signals the whole process group (npm + vite child).
      process.kill(-devProc.pid, 'SIGTERM');
    } catch {
      devProc.kill('SIGTERM');
    }
  }
}

async function main() {
  const url = externalUrl || (await startDevServer());
  log('app url:', url);

  const browser = await chromium.launch({ headless: !headed });
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => consoleErrors.push('pageerror: ' + err.message));

  log('navigating...');
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: 'Finance Tracker' }).waitFor();
  await page.screenshot({ path: join(shotsDir, '01-initial.png'), fullPage: true });
  log('rendered initial page -> 01-initial.png');

  // Read the starting balance so we can prove the summary recomputed.
  const balanceBefore = (await page.locator('.balance-amount').innerText()).trim();
  log('balance before:', balanceBefore);

  // Real flow: add an income transaction and confirm it lands in the table
  // and the summary updates.
  const desc = 'Driver Smoke Income';
  await page.getByPlaceholder('Description').fill(desc);
  await page.getByPlaceholder('Amount').fill('2500');
  await page.locator('.add-transaction select').first().selectOption('income');
  await page.getByRole('button', { name: 'Add' }).click();

  // The new row appears in the transactions table.
  const newRow = page.locator('table tbody tr', { hasText: desc });
  await newRow.waitFor();
  const balanceAfter = (await page.locator('.balance-amount').innerText()).trim();
  log('balance after:', balanceAfter);

  await page.screenshot({ path: join(shotsDir, '02-after-add.png'), fullPage: true });
  log('added transaction -> 02-after-add.png');

  if (balanceBefore === balanceAfter) {
    throw new Error(`balance did not change after adding income (${balanceBefore} -> ${balanceAfter})`);
  }

  await browser.close();

  if (consoleErrors.length) {
    log('CONSOLE ERRORS:');
    consoleErrors.forEach((e) => log('  ', e));
    throw new Error(`${consoleErrors.length} console error(s) during run`);
  }

  log('SUCCESS: app rendered, transaction added, summary updated, no console errors.');
}

main()
  .then(() => stopDevServer())
  .catch((err) => {
    console.error('[driver] FAILED:', err.message);
    stopDevServer();
    process.exit(1);
  });
