# AGENTS.md

## Cursor Cloud specific instructions

### Overview

This is a simple full-stack To-Do List application (Node.js/Express backend + vanilla JS frontend). There is a single service: the Express server, which serves both the REST API and static frontend files.

### Running the app

- `npm run dev` or `npm start` — starts the server on `http://localhost:3000` (port configurable via `PORT` env var)
- No build step required; the frontend is plain HTML/CSS/JS served as static files

### Notes

- Data is stored in `todos.json` (auto-created on first run, git-ignored). Deleting this file resets all data.
- No test framework, linter, or CI is configured in the project. There are no automated tests to run.
- No external services or databases required — the app is fully self-contained.
- See `README.md` for API endpoints and usage instructions.
