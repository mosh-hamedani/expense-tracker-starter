---
name: verify
description: Verify a change to the expense tracker works — runs lint, the production build, and a dev-server smoke check. Use after editing app code and before handing work back for review.
---

Run these from the repo root and report each result. Stop and fix (or report) at the first failure.

1. `npm run lint` — must exit 0.
2. `npm run build` — must exit 0. This is the only compile check; there are no tests.
3. Smoke-check the dev server:
   - If something already answers on http://localhost:5173, reuse it. Otherwise start `npm run dev -- --port 5173 --strictPort` in the background and wait until it responds.
   - `curl -s -o /dev/null -w "%{http_code}" http://localhost:5173/src/App.jsx` must return `200` (a Vite transform error returns 500 with the message in the body — read it).
   - Stop the server only if you started it.
4. If the change affects what the user sees and a browser tool is available, open the page and look at it; otherwise say that visual behavior was not checked.

Summarize: what passed, what failed (with output), and what was not verified.
