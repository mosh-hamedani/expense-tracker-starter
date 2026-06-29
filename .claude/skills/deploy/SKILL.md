---
name: deploy
description: Deploy the Finance Tracker to staging. Use when the user asks to deploy, ship, or push to staging. Runs the test/lint gate, builds the production bundle, then pushes the current branch to the staging branch.
---

Deploy the app to staging by running these steps **in order**. If any step fails, stop immediately and report the failure — do not continue to the next step.

## Step 1: Run the test gate

This project has no dedicated test runner yet, so the lint check is the gate:

```bash
npm run lint
```

If lint reports errors, stop and report them. Do not proceed to the build. (When a real test runner is added, run `npm test` here as well.)

## Step 2: Build the production bundle

```bash
npm run build
```

This produces the optimized bundle in `dist/`. If the build fails, stop and report the error.

## Step 3: Push to staging

Push the current branch to the `staging` branch so CI can deploy it:

```bash
git push origin HEAD:staging
```

Before pushing:

- Confirm the working tree is clean (`git status`) — only committed code should ship. If there are uncommitted changes, ask the user whether to commit them first.
- Report the commit SHA being deployed.

## After deploying

Summarize what happened: lint result, build result, and the SHA pushed to `staging`. Mention that CI deploys from the `staging` branch.
