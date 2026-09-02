# Architecture

Modular monolith, organized per page. Each page/feature is a self-contained module.

## Layers (per module)

- **data/** — API clients, queries, repositories, DTOs. I/O only. No business rules.
- **business/** — validators, payload builders, calculations, orchestration. Pure. No I/O, no JSX.
- **presentation/** — screens, page components, JSX. Reads from business layer.

## Shared

- **shared/utils/** — pure helpers reused across modules.
- **shared/components/** — reusable UI (buttons, inputs, layout primitives).
- **shared/services/** — cross-cutting singletons (logger, auth client, http client, storage).

## Rules

- Presentation never talks to data directly — always through business.
- A module owns its data/business/presentation; only promote to `shared/` when a 2nd module needs it.
- No cross-module imports except via `shared/`.
