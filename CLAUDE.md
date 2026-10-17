# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

React 19 + Vite 7 expense tracker (plain JS/JSX, no TypeScript). It's a course starter that **intentionally** contains a bug, poor UI, and messy code. Only fix what the current task asks for — don't fix unrelated flaws or refactor on your own initiative.

## Commands

- `npm run dev` — dev server at http://localhost:5173
- `npm run lint` — ESLint (flat config in `eslint.config.js`)
- `npm run build` — production build; use it as the compile check
- There is no test framework and no formatter.

## Gotchas

- All app logic and state lives in `src/App.jsx`; transactions are in-memory `useState` only (no persistence, no backend).
- Transaction `amount` values are stored as strings (seed data and form input), so arithmetic on them concatenates unless converted to numbers.

## Git

Commits stay local — never push. `origin` is the upstream course repo, not the user's.
