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
- The whole app lives in one component, `src/App.jsx`: all state is local `useState` (transactions, form fields, filters). There is no routing, no persistence (data resets on reload), and no backend.
- Seed transactions are hardcoded in the initial state. Each transaction is `{ id, description, amount, type: "income" | "expense", category, date }`.
- `amount` must be a **number**: the income/expense totals `reduce` over it with `+`, so a string amount concatenates instead of adding. The form input value is a string and is converted with `parseFloat` in `handleSubmit`.
- Summary totals and the filtered list are derived on every render, not stored in state.
- Categories are a hardcoded array in `App.jsx`, shared by the add form and the category filter.
- Styles: `src/index.css` (global) and `src/App.css` (component classes such as `.summary-card`, `.income-amount`, `.expense-amount`).

## Lint notes

ESLint uses `eslint-plugin-react-hooks` and `eslint-plugin-react-refresh` (Vite preset). `no-unused-vars` ignores names starting with an uppercase letter or `_`.
