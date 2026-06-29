# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server at http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint over the repo

There is no test runner configured.

## Architecture

A single-page React 19 app bundled with Vite. [src/main.jsx](src/main.jsx) mounts `App` into `#root` in [index.html](index.html). Styling is plain CSS in `src/App.css` and `src/index.css` (no CSS framework).

[src/App.jsx](src/App.jsx) is the container: it owns the `transactions` state (hardcoded seed data) and the `categories` list, exposes an `addTransaction` handler, and composes three presentational children:

- [src/Summary.jsx](src/Summary.jsx) — receives `transactions` and computes `totalIncome`/`totalExpenses`/`balance` itself.
- [src/TransactionForm.jsx](src/TransactionForm.jsx) — owns its own form input state and calls the `onAdd` prop with a new transaction.
- [src/TransactionList.jsx](src/TransactionList.jsx) — owns its own filter state (`filterType`/`filterCategory`) and renders the filtered table.

Transactions live only in `App`'s `useState` — there is **no backend, no persistence, and no routing**. A page refresh resets all data. Derived values are recomputed on each render rather than stored.

## Context

This is a deliberately flawed starter project (see [README.md](README.md)) used in a Claude Code course. It shipped with an intentional bug, rough UI, and messy code meant to be fixed.

`amount` is now stored as a number everywhere (seed data and form submissions), so the income/expense totals sum numerically. Note that the seed "Freelance Work" entry is labeled `type: "expense"` (a data quirk, not a calculation bug), so it counts toward expenses.
