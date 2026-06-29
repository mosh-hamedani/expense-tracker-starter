# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start the Vite dev server at http://localhost:5173
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the production build locally
- `npm run lint` — run ESLint over the repo

There is no test runner configured.

## Architecture

A single-page React 19 app bundled with Vite. The entire application — state, business logic, and UI — lives in one component, [src/App.jsx](src/App.jsx). [src/main.jsx](src/main.jsx) mounts it into `#root` in [index.html](index.html). Styling is plain CSS in `src/App.css` and `src/index.css` (no CSS framework).

Transactions are held in component `useState` with hardcoded seed data — there is **no backend, no persistence, and no routing**. A page refresh resets all data. Derived values (`totalIncome`, `totalExpenses`, `balance`, filtered list) are recomputed inline on each render from the transactions array.

## Context

This is a deliberately flawed starter project (see [README.md](README.md)) used in a Claude Code course. It ships with an intentional bug, rough UI, and messy code that are meant to be fixed.

Known issue to be aware of: transaction `amount` is stored as a string, so the income/expense `reduce` calls concatenate strings instead of summing numbers. Fixing financial calculations generally requires coercing `amount` to a number (e.g. `Number(t.amount)`).
