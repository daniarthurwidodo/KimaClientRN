# Design

See [design.md](./design.md) — FluentUI + palette tokens. No hex literals in components.

# Architecture

Modular monolith. Each page is a self-contained module under `src/pages/<page>/`.

```
src/
  pages/
    home/
      data/         ← API clients, queries, DTOs (I/O only)
      business/     ← validators, payload builders, orchestration (pure)
      components/   ← page-scoped UI pieces (Header, Banner, FeatureGrid, ...)
      presentation/ ← screens — compose components + wire data
  shared/
    utils/          ← pure helpers
    components/     ← reusable UI primitives
    services/       ← singletons (logger, http, auth, storage)
    theme/          ← palette + tokens
```

## Layers (per page module)

- **data/** — API clients, queries, repositories, DTOs. I/O only. No business rules.
- **business/** — validators, payload builders, calculations, orchestration. Pure. No I/O, no JSX.
- **components/** — page-scoped presentational components. Own their styles + local icon deps. Props-in, JSX-out. No fetching.
- **presentation/** — screen entrypoints. Compose components, feed them data from business/data. Layout + scroll containers only.

## Shared

- **shared/utils/** — pure helpers reused across modules.
- **shared/components/** — reusable UI (buttons, inputs, layout primitives).
- **shared/services/** — cross-cutting singletons (logger, auth client, http client, storage).

## Rules

- Presentation never talks to data directly — always through business.
- Page-scoped components live in `pages/<page>/components/`. Promote to `shared/components/` only when a 2nd page needs it.
- Components stay presentational: props in, JSX out. No data fetching, no business rules.
- A page owns its data/business/components/presentation; only promote to `shared/` when a 2nd page needs it.
- No cross-page imports except via `shared/`.
