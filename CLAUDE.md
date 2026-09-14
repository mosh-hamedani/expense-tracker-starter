# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Starter project for a Claude Code course: a React 19 + Vite 7 expense tracker that **intentionally** ships with a bug, poor UI, and messy code, to be fixed during the course. Plain JavaScript (JSX), no TypeScript.

## Commands

```bash
npm install
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the built dist/
npm run lint      # ESLint (flat config, eslint.config.js)
```

There is no test runner or test suite configured.

## Architecture

- `index.html` → `src/main.jsx` (mounts `<App />` in StrictMode) → `src/App.jsx`.
- No routing, no persistence (data resets on reload), no backend, no state library. All state is local `useState`.
- Components are flat files in `src/` (no `components/` folder), one default-exported function component per file:
  - `App.jsx`: owns the single source of truth, the `transactions` array (hardcoded seed data), and `handleAdd`, which appends a transaction. Also defines the module-level `categories` array and passes it down as a prop.
  - `Summary.jsx`: props `transactions`. Derives income, expense and balance totals on each render.
  - `TransactionForm.jsx`: props `categories`, `onAdd`. Owns its own form-field state, builds the full transaction object (id from `Date.now()`, today's date), calls `onAdd`, then resets the fields.
  - `TransactionList.jsx`: props `transactions`, `categories`. Owns the type/category filter state and renders the filtered table.
- Data flows one way: `App` passes `transactions` down; the only upward path is `TransactionForm` → `onAdd`. Form and filter state are local to their components, so `App` does not see them.
- Each transaction is `{ id, description, amount, type: "income" | "expense", category, date }`.
- `amount` must be a **number**: `Summary` sums it with `+`, so a string amount concatenates instead of adding. The form input value is a string and is converted with `parseFloat` in `TransactionForm`.
- Styles: `src/index.css` (global) and `src/App.css` (all component classes, e.g. `.summary-card`, `.add-transaction`, `.transactions`, `.income-amount`, `.expense-amount`). Components don't import their own CSS.

## Lint notes

ESLint uses `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` (Vite preset). `no-unused-vars` ignores names starting with an uppercase letter or `_`.
