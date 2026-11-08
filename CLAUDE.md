# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course: a React 19 + Vite expense tracker that **intentionally** ships with a bug, poor UI, and messy code, to be fixed incrementally. Don't assume existing patterns are the intended style.

## Commands

```bash
npm install
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the built dist/
npm run lint      # ESLint (flat config, eslint.config.js)
```

No test runner is configured.

## Architecture

- Plain JavaScript (JSX), no TypeScript, no router, no state library, no backend or persistence. Data resets on reload.
- `src/main.jsx` mounts `<App />` in `StrictMode`.
- `src/App.jsx` is the whole app in a single component: transaction list state (seeded with hardcoded sample data), add-transaction form state, type/category filters, and derived income/expense/balance totals computed inline on each render.
- Styling: global CSS in `src/index.css` and `src/App.css` (class names like `summary-card`, `income-amount`, `expense-amount`).

## Gotchas

- Transaction `amount` is stored as a **string** (both seed data and form input), but totals are computed with `reduce((sum, t) => sum + t.amount, 0)`, which concatenates strings instead of adding numbers.
- ESLint `no-unused-vars` ignores names matching `^[A-Z_]`.
