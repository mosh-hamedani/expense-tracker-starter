---
name: deploy
description: Deploy the expense tracker to staging - run lint as the test gate, build the production bundle, then push the current commit to the `staging` branch on origin.
disable-model-invocation: true
---

# Deploy to staging

Run the steps in order. If any step fails, stop, show the failing output, and do not run later steps.

## 1. Preflight

- Run `git status --porcelain`. If it prints anything, stop: uncommitted changes would not be part of the deploy. Tell the user which files are dirty.
- Run `git rev-parse --abbrev-ref HEAD` and `git log --oneline -1` and report the branch and commit being deployed.

## 2. Tests

The project has no test suite yet, so lint is the gate.

```bash
npm run lint
```

Any ESLint error fails the deploy. If a `test` script is later added to `package.json`, run `npm test` here as well, after lint.

## 3. Production build

```bash
npm run build
```

A non-zero exit fails the deploy. The chunk-size warning is not a failure. `dist/` is gitignored, so the build verifies the bundle compiles; it is not pushed.

## 4. Push to staging

```bash
git push origin HEAD:staging
```

This creates `staging` on origin if it doesn't exist. If the push is rejected as non-fast-forward, stop and tell the user - never force-push without their explicit approval.

## 5. Report

State the commit hash pushed, and the result of each step (lint, build, push) with its evidence. Do not report the deploy as done unless all three succeeded.
