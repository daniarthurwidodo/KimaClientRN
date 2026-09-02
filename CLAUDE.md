# Architecture

Modular monolith. Each page is a self-contained module under `src/pages/<page>/`.

```
src/
  pages/
    home/
      data/         ← API clients, queries, DTOs (I/O only)
      business/     ← validators, payload builders, orchestration (pure)
      presentation/ ← screens, components, JSX
  shared/
    utils/          ← pure helpers
    components/     ← reusable UI primitives
    services/       ← singletons (logger, http, auth, storage)
    theme/          ← palette + tokens
```

## Layers (per page module)

- **data/** — API clients, queries, repositories, DTOs. I/O only. No business rules.
- **business/** — validators, payload builders, calculations, orchestration. Pure. No I/O, no JSX.
- **presentation/** — screens, page components, JSX. Reads from business layer.

## Shared

- **shared/utils/** — pure helpers reused across modules.
- **shared/components/** — reusable UI (buttons, inputs, layout primitives).
- **shared/services/** — cross-cutting singletons (logger, auth client, http client, storage).

## Rules

- Presentation never talks to data directly — always through business.
- A page owns its data/business/presentation; only promote to `shared/` when a 2nd page needs it.
- No cross-page imports except via `shared/`.
