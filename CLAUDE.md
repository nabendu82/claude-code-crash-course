# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Task Tracker demo app for a Claude Code crash course. Plain HTML, CSS and JavaScript — no framework, no build step, no package manager, no tests.

Run it by opening `index.html` in a browser (`open index.html` on macOS).

## Architecture

- `index.html` — static markup: a form (`#task-form`, `#task-input`) and an empty list (`#task-list`). Loads `style.css` and `app.js`.
- `app.js` — all behavior. A single in-memory `tasks` array (`{ text, done }` objects) is the source of truth, persisted to `localStorage` under the key `"tasks"`.
  - Every change follows the same pattern: mutate `tasks` → `saveTasks()` → `renderTasks()`.
  - `renderTasks()` rebuilds the whole list from scratch each time; event handlers reference tasks by array index.
- `style.css` — styling; a completed task gets the `done` class on its `<li>`.

## Conventions

- Keep code short and beginner friendly: plain `function` declarations, no modules, no libraries.
- Use `textContent` (not `innerHTML`) when inserting user-entered text.

## Project skill

`.claude/skills/review` — reviews the three app files for bugs and beginner-unfriendly code (under 15 lines, read-only).
