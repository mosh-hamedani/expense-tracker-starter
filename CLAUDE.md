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
- `src/App.jsx` owns the single source of truth: the `transactions` array (seeded with hardcoded sample data) and the shared `categories` constant. It passes them down as props; children never mutate state directly.
  - `Summary` — derives income/expense/balance totals from `transactions` on each render.
  - `TransactionForm` — owns its own input state; builds a transaction and hands it to `App` via `onAdd`.
  - `TransactionList` — owns the type/category filter state and renders the filtered table.
- Components live flat in `src/` as one default-exported component per `.jsx` file.
- Transaction shape: `{ id, description, amount: number, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. `amount` must stay a number (the form converts with `Number()`); totals rely on numeric addition.
- Styling: global CSS in `src/index.css` and `src/App.css` (class names like `summary-card`, `income-amount`, `expense-amount`).

## Gotchas

- ESLint `no-unused-vars` ignores names matching `^[A-Z_]`.
