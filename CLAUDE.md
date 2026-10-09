# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A Task Tracker demo app for a Claude Code crash course. Plain HTML, CSS and JavaScript — no framework, no build step, no package manager, no tests.

Run it by opening `index.html` in a browser (`open index.html` on macOS).

## Architecture

- `index.html` — static markup: a form (`#task-form`, `#task-input`), filter buttons (`#filters`, each with a `data-filter` of `all`, `active` or `completed`), an empty list (`#task-list`), and a footer with the tasks-left count (`#task-count`) and a "Clear completed" button (`#clear-completed`). Loads `style.css` and `app.js`.
- `app.js` — all behavior. A single in-memory `tasks` array (`{ text, done }` objects) is the source of truth, persisted to `localStorage` under the key `"tasks"`.
  - Every change follows the same pattern: mutate `tasks` → `saveTasks()` → `renderTasks()`.
  - `renderTasks()` rebuilds the whole list from scratch each time; event handlers reference tasks by array index (including when a filter is active, since the index is the position in the full `tasks` array).
  - Filters: `currentFilter` (`"all"`, `"active"` or `"completed"`) is UI state only, not saved. `renderTasks()` skips tasks that don't match it. The tasks-left count always covers all tasks, whatever the filter.
  - Clear completed: removes every task with `done: true`. The button is hidden when nothing is completed.
  - Editing: double-clicking a task's text calls `startEditing()`, which swaps the text for an input. Enter saves (trimmed), Escape or clicking away cancels, and an empty edit keeps the old text.
- `style.css` — styling; a completed task gets the `done` class on its `<li>`, and the selected filter button gets the `active` class.

## Conventions

- Keep code short and beginner friendly: plain `function` declarations, no modules, no libraries.
- Use `textContent` (not `innerHTML`) when inserting user-entered text.

## Project skill

`.claude/skills/review` — reviews the three app files for bugs and beginner-unfriendly code (under 15 lines, read-only).
