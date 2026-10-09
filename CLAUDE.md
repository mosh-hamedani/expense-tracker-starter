# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

Starter project for a Claude Code course (codewithmosh.com). It is a basic React expense tracker that **intentionally** ships with a bug, poor UI, and messy code, all meant to be fixed step by step during the course. Don't assume existing patterns are conventions worth preserving, and don't silently fix the known issues below while doing unrelated work.

## Commands

```bash
npm install       # install dependencies
npm run dev       # Vite dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build
npm run lint      # ESLint (flat config in eslint.config.js)
```

There is no test framework or test script configured.

## Architecture

- React 19 + Vite 7, plain JavaScript (`.jsx`), no TypeScript, no router, no state library, no backend or persistence. Data lives only in React state and resets on reload.
- `src/main.jsx` mounts `<App />` in `StrictMode`. Practically all logic and markup live in a single component, `src/App.jsx`: transaction state seeded with sample data, the add-transaction form, the type and category filters, derived totals (income, expenses, balance), and the transactions table.
- Totals and the filtered list are recomputed on every render from the `transactions` array; nothing is memoized or stored separately.
- Styling is plain global CSS: `src/index.css` (page-level) and `src/App.css` (component classes such as `summary-card`, `income-amount`, `expense-amount`).
- A transaction is `{ id, description, amount, type: "income" | "expense", category, date: "YYYY-MM-DD" }`. Categories are a hardcoded array inside `App.jsx`, shared by the form and the filter.

## Known issues

- The intentional bug: `amount` is stored as a string (both in the seed data and from the form input), so the `reduce` calls that compute totals concatenate strings instead of adding numbers. The summary cards show values like `$05000`.
- The seed entry "Freelance Work" has `type: "expense"` but category `salary`, which looks like a data mistake.
