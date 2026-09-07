# MANUFACTOR

**An offline-capable token counter and rules engine for artifact-token-heavy Magic: The Gathering decks.**

Live app: https://jimna-h.github.io/manufactor/

Keeping track of Clue, Food, and Treasure token counts by hand gets messy fast once a deck has several token-doublers and modifiers stacked on top of each other — the order those effects apply in changes the final count, and it's easy to lose track mid-game. MANUFACTOR handles that math for you: log a token-creation event, and it runs the event through your deck's full modifier stack in the correct order, then updates your live counts.

## How it works

Each deck is saved as a **profile** — a set of which token types and which modifiers that deck actually uses (doublers, replacement effects like Academy Manufactor, conditional add-ons, etc.). When you log an event, MANUFACTOR resolves it through a fixed pipeline:

1. **Additive increasers** — effects that add one specific token whenever a token is made
2. **Replacement effects** — like Academy Manufactor, which replace some or all of a token-creation event
3. **Multiplicative increasers** — doublers, applied last, on whatever tokens remain after steps 1–2

This mirrors how these effects actually interact in-game, so the final count matches what you'd get resolving them manually — just without the mental math mid-turn.

## Features

- Profile system — save multiple decks, each with its own modifier configuration, switch between them without losing state
- Full undo history per game
- Installable as a Progressive Web App (works offline, home-screen icon, no browser chrome)
- Built for one-handed use at the table — large tap targets, minimal screen, dark theme

## Tech

Single-file vanilla HTML/CSS/JS (no build step, no dependencies) plus a service worker and manifest for PWA installability. State persists to `localStorage` per-profile.

## Running locally

No build required — clone the repo and open `index.html` in a browser, or serve the folder with any static file server (e.g. `python3 -m http.server`) to get full PWA/service-worker behavior.
