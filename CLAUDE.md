# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the starter project for a Claude Code course. It's a basic expense tracker built with React + Vite. It **intentionally** has a bug, poor UI, and messy code — those are fixed incrementally over the course. Don't "clean up" or "fix" things unprompted; changes here are usually driven by explicit course exercises.

## Commands

```bash
npm install      # install dependencies
npm run dev      # start Vite dev server at http://localhost:5173
npm run build    # production build
npm run preview  # preview the production build locally
npm run lint     # run ESLint over the project
```

There is no test setup (no test runner/framework is configured) and no backend — this is a frontend-only, client-state app.

## Architecture

- Entry point `src/main.jsx` mounts `<App />` (from `src/App.jsx`) into `#root`, wrapped in `StrictMode`. This is standard Vite React-template boilerplate.
- Nearly the entire app lives in one component, `src/App.jsx`. There's no routing, no component decomposition, and no state-management library — all state (`transactions`, form fields, filters) is local `useState` in `App`, and all logic (totals, filtering, add-transaction handler) is inlined in that one function body.
- `transactions` is in-memory only (seeded with hardcoded sample data on load); nothing persists across a page refresh.
- Category list (`categories`) is a hardcoded array shared between the "add transaction" form and the filter dropdown.
- Styling is plain CSS: `src/index.css` for global/base styles, `src/App.css` for the app's layout and component classes (e.g. `.summary-card`, `.income-amount`, `.expense-amount`).
- ESLint config (`eslint.config.js`) is the standard Vite React setup (`@eslint/js` recommended + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh`), flat-config style, with one repo-specific rule: unused vars are only allowed if they're uppercase/underscore-prefixed.
