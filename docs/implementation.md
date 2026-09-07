# Implementation Plan — Sanctuary Modern

Phased rollout of Church Community mobile app (KimaClientRN).
Design source: Stitch project `12494852605889163655` (Sanctuary Modern).
Backend contract source: this repo's `docs/*.md` (as they land).

## Guiding rules

- **Layers per page module**: `data/` (I/O only) · `business/` (pure, no I/O, no JSX) · `components/` (props-in, JSX-out) · `presentation/` (screen composition). Presentation never talks to data — always via business.
- **No hex/radius/spacing/fontFamily literals in components** — import from `src/shared/theme`.
- **Simple form state + dedicated pure payload builder** (never inline shaping in submit handler).
- **Validate at boundaries**: `Number.isFinite` before arithmetic; guard `get_field`-style loose values before iteration.
- **Loading state before auth gate** — never flash "Access Denied" before session resolves.
- **Async**: `for...of` + `await` by default; `Promise.all` only when N is bounded and parallelism is wanted.
- **No FK / cascade / DB constraints** — service layer owns referential integrity.
- **Backend readiness gates the wiring**, not the UI. Screens are built against stub DTOs first; adapter swaps mock → real when the endpoint is ready.

## Backend readiness matrix

| Domain | Doc | Status |
|---|---|---|
| Renungan | `docs/renungan.md` | Contract defined. Endpoints live in dev. |
| Videos | (probed by `apiBase.ts`) | Endpoint exists — no doc yet. |
| Home aggregate | — | Not defined. Front-end drives DTO. |
| Community / Komsel | — | Not defined. Front-end drives DTO. |
| Giving / Persembahan | — | Not defined. Front-end drives DTO. |
| Registration (Pendaftaran Jemaat Baru) | — | Not defined. Front-end drives DTO. |
| Auth (bearer token) | — | Planned; wired in Phase 9. |

**Convention while backend catches up:** each page's `data/` exports typed DTOs + a client function that today returns mock JSON, tomorrow calls `fetch`. Signatures do not change — only the implementation.

## Design import status (this document = end of Phase 0)

Done:
- `design.md` rewritten to Sanctuary Modern (palette, typography, radius, spacing, elevation, component blueprint).
- `src/shared/theme/palette.ts` → Sanctuary Modern tokens.
- `src/shared/theme/typography.ts` → Plus Jakarta Sans roles (`display` / `headline*` / `body*` / `label*`).
- `src/shared/theme/radius.ts` → new `md 12` / `lg 16` / `xl 24` scale.
- `src/shared/theme/spacing.ts` → 4px base scale.
- `src/shared/theme/index.ts` → re-export.

Not done in Phase 0 (deliberate): font file assets, component refactor, theme provider, blur primitives. These land in Phase 1+.

---

## Phase 1 — Shared theme wiring + fonts

**Goal:** Plus Jakarta Sans renders across app; existing components compile against new tokens (may look ugly — that is fine; visual polish is Phase 2+).

Tasks:
1. Add font files to `assets/fonts/`:
   - `PlusJakartaSans-Regular.ttf`
   - `PlusJakartaSans-Medium.ttf`
   - `PlusJakartaSans-SemiBold.ttf`
   - `PlusJakartaSans-Bold.ttf`
   - `PlusJakartaSans-ExtraBold.ttf`
2. Configure `react-native.config.js` `assets: ['./assets/fonts']`. Run `npx react-native-asset` (or update to `link-assets` per RN 0.87 flow).
3. iOS: fonts to Info.plist `UIAppFonts`. Android: auto via asset linking.
4. Ripple through existing components: replace old palette keys (`midnightViolet` → `bg`, etc.). Delete unused legacy keys.
5. Set root background to `palette.bg`. `StatusBar barStyle="light-content"`.
6. Smoke test: `pnpm android` / `pnpm ios`, verify font + colors on Home stub.

Verify: `pnpm test` passes. Screens render with new palette, no red-boxes.

**Checkpoint** — approve to proceed to Phase 2.

---

## Phase 2 — Acrylic primitives + pill nav shell

**Goal:** Reusable Sanctuary-Modern building blocks in `src/shared/components/`.

Add:
- `AcrylicCard.tsx` — `BlurView` (via `@react-native-community/blur`) + hairline border + top specular gradient (`react-native-linear-gradient`). Fallback path: solid `surface2` when blur unsupported.
- `AmbientGlow.tsx` — behind-artwork blurred tint. `Image` + `blurRadius` + `opacity: 0.35`.
- `PillNav.tsx` — floating bottom dock. 4–5 icon slots. Active tab: `grace` dot + radial glow. Absolute position, `bottom: safeArea + 20`.
- `PrimaryButton.tsx` / `SecondaryButton.tsx` / `LiturgicalCTA.tsx` — pill buttons per design blueprint.
- `TextField.tsx` — inset surface, floating label, focus ring in `sacred` or `royal`.
- `Chip.tsx` — idle acrylic pill, selected solid category color.
- `ScreenShell.tsx` — root wrapper: `bg`, safe area top, `paddingBottom: navPillOffset`.

Dependencies to add:
- `@react-native-community/blur`
- `react-native-linear-gradient`

Replace `BottomTabs.tsx` usage with `PillNav`. Keep `BottomTabs` only until all consumers migrate, then delete (R9 dead-code).

Verify: primitives render standalone in a dev sandbox screen. Snapshot tests updated.

**Checkpoint.**

---

## Phase 3 — Home screen redesign

**Goal:** Match Stitch screen `aed82a34fcf244b2a929704b19e2372a` (Home - Grace Sanctuary).

Structure:
- `pages/home/data/homeApi.ts` — `getHomeFeed()`. Aggregated DTO: `{ hero, liveStream, sermonSeries[], warta[], nextEvent, activeCTA }`.
- `pages/home/business/useHomeFeed.ts` — hook orchestrating fetch, refresh, loading state.
- `pages/home/business/heroCard.ts` — pure builder mapping DTO → hero card view model.
- `pages/home/components/`:
  - `HeroBanner.tsx` — headline hero + live-stream indicator + primary CTA.
  - `LiveIndicator.tsx` — pulsing `grace` dot + "LIVE NOW".
  - `SermonCarousel.tsx` — horizontal 1:1 cards with ambient glow.
  - `WartaFeed.tsx` — vertical acrylic cards.
  - `QuickActions.tsx` — 4-tile grid (Giving · Devotional · Community · Events).
- `pages/home/presentation/HomeScreen.tsx` — compose components, feed VM from business.

Interactions:
- Pull-to-refresh calls `useHomeFeed().refresh()`.
- Card tap → navigate via `HomeStack` (typed nav param).

Verify against Stitch screenshot (see `mcp__stitch__get_screen`). Snapshot per breakpoint.

**Checkpoint.**

---

## Phase 4 — Renungan redesign

**Goal:** Match Stitch `94b5ea4638f5480a974caf725540e875` (Renungan Details). Reuse existing `docs/renungan.md` contract — backend already there.

Structure:
- `pages/renungan/data/renunganApi.ts` — existing; keep. Contract in `docs/renungan.md`.
- `pages/renungan/business/useRenunganMonth.ts` — existing; verify still matches DTO.
- `pages/renungan/business/formatScripture.ts` — pure helper: takes `scripture.ref` + `scripture.text`, returns highlighted line + verse map. Handles `scripture.text === null` fallback (raw ref only, never surface `error` to user).
- `pages/renungan/components/`:
  - `CalendarGrid.tsx` — 7-column month grid. Green dot on `hasContent: true`. Non-content days non-interactive.
  - `ScriptureCard.tsx` — sacred-gold accented, ambient glow.
  - `DevotionalBody.tsx` — long-form body text `bodyLg` `textPrimary` on `surface1`.
- `pages/renungan/presentation/RenunganListScreen.tsx` — month calendar view.
- `pages/renungan/presentation/RenunganDetailScreen.tsx` — existing; rewrite to Sanctuary look.

Verify: real endpoints, error fallbacks for `scripture.error`, timezone rules per `docs/renungan.md` (UTC ISO, WIB format on render only).

**Checkpoint.**

---

## Phase 5 — Community / Komsel

**Goal:** Match Stitch `b1d4d270b18d4aa6adfa728e0f06c65a` (Komunitas & Materi Komsel).

Structure:
- `pages/community/data/communityApi.ts` — new. DTOs: `Komsel`, `KomselMaterial`, `KomselSchedule`. Stub returns mock array until backend ready.
- `pages/community/business/useKomselList.ts`.
- `pages/community/components/`:
  - `KomselCard.tsx` — leader avatar + schedule + join CTA.
  - `MaterialItem.tsx` — PDF/video list row with icon.
  - `SectionHeader.tsx` — chip filter row (all · my komsel · nearby).
- `pages/community/presentation/CommunityScreen.tsx` — rewrite.

**Blocked-by backend**: real endpoints. Ship with mock, mark client TODO with `// backend: ready when POST /api/komsel exists`.

**Checkpoint.**

---

## Phase 6 — Giving / Persembahan

**Goal:** Match Stitch `d36931f84a6f4cd19169e5ecd07f7516` (Giving - Persembahan).

Structure:
- `pages/giving/data/givingApi.ts` — new. DTOs: `Fund`, `BankAccount`, `SubmitGiftRequest`, `Gift`.
- `pages/giving/business/`:
  - `useFunds.ts` — list of funds with progress.
  - `useGivingAccounts.ts` — bank accounts + copy-to-clipboard.
  - `buildGiftPayload.ts` — **pure payload builder** mapping form state → `SubmitGiftRequest`. Never inline in submit handler.
  - `validateGift.ts` — amount `> 0`, fund selected, method selected. Uses `Number.isFinite`.
- `pages/giving/components/`:
  - `FundCard.tsx` — color-coded (`tithe` / `building` / `mission`), progress bar, amount raised.
  - `AccountCard.tsx` — existing; restyle. Tap → copy account number.
  - `GivingForm.tsx` — amount input, fund picker chips, method picker, submit button.
- `pages/giving/presentation/GivingScreen.tsx` — rewrite.

Handler pattern:
```ts
async function onSubmit(form: GivingForm) {
  const errors = validateGift(form);
  if (errors.length) return setErrors(errors);
  const payload = buildGiftPayload(form);
  await submitGift(payload);
}
```

**Checkpoint.**

---

## Phase 7 — Pendaftaran Jemaat Baru

**Goal:** New page matching Stitch `d7d88ffa654042b7ad96a87507350dbe`. Currently no matching module in `src/pages/`.

Structure:
- `pages/registration/data/registrationApi.ts` — `submitRegistration(payload)`. Stub until backend.
- `pages/registration/business/`:
  - `useRegistrationForm.ts` — `useState` per field (KISS, no reducer).
  - `buildRegistrationPayload.ts` — pure builder, trims strings, lowercases email, parses date.
  - `validateRegistration.ts` — required fields, email regex, valid birthdate, phone digits.
- `pages/registration/components/`:
  - `Step.tsx` — reusable multi-step wrapper (if multi-step) or single form panel.
  - `FormField.tsx` — labeled `TextField` wrapper.
  - `DatePickerField.tsx` — birthdate picker.
- `pages/registration/presentation/RegistrationScreen.tsx`.

Backend contract to define (draft for backend team):
```ts
type SubmitRegistrationRequest = {
  fullName: string; email: string; phone: string;
  birthDate: string; // YYYY-MM-DD
  address?: string; komselInterest?: boolean;
  baptismStatus: 'baptized' | 'not_baptized' | 'unknown';
};
// 201 → { id: string, createdAt: ISO string }
// 400 → { message, fields: Record<string, string> }
// 409 → email/phone already registered
```

**Blocked-by backend**: `POST /api/registration`. Ship with mock success + TODO.

**Checkpoint.**

---

## Phase 8 — Videos restyle

**Goal:** Existing `videos` module keeps data layer; visuals move to Sanctuary Modern. Optionally add mini-player bar above nav dock.

Tasks:
- Restyle `VideoCard.tsx` to acrylic card + ambient glow.
- `MiniPlayerBar.tsx` — frosted horizontal bar, 1:1 art, title ticker, play/pause. Renders when a player is minimized.
- Wire mini-player state via lightweight context (no external state lib — KISS).

**Checkpoint.**

---

## Phase 9 — Auth + real endpoint wiring

**Goal:** Bearer-token auth, session provider, guarded screens. Swap remaining mocks per backend readiness.

Tasks:
- `shared/services/authClient.ts` — login, refresh, logout, secure token storage (`react-native-keychain` recommended).
- `shared/services/httpClient.ts` — wraps `fetch`. Injects `Authorization: Bearer <token>`. Handles 401 → refresh once → retry.
- `shared/services/SessionProvider.tsx` — context exposing `{ session, isLoading, signIn, signOut }`.
- `pages/auth/` — login screen (Stitch has none yet — TBD or ad-hoc).
- Guarded screens: check `isLoading` **first**, render `<LoadingSpinner />`; only then check permission. Never flash "Access Denied".
- Swap each page's mock adapter → real client as backend ships.

**Ship criteria per screen**:
- [ ] Loading state renders before any auth check.
- [ ] Error path logs via structured logger (never `console.*`).
- [ ] `Number.isFinite` guards on parsed strings.
- [ ] Presentation → business → data. No cross-layer shortcuts.

---

## Cross-cutting deliverables (all phases)

- **Structured logger**: `shared/services/logger.ts` — replace any `console.*`. Context param mandatory. Env-gated verbosity.
- **Error boundary**: `shared/components/ErrorBoundary.tsx` at root + per major stack.
- **Snapshot tests**: one per component in `__tests__/` mirrored path.
- **A11y**: `accessibilityLabel` on every touchable, min tap target 44×44.
- **Typography scale test**: verify no component hardcodes font size (regex test in CI).

## Backend prep — quick list for parallel work

Order suggested by front-end demand:

1. `POST /api/registration` (Phase 7 depends).
2. `GET /api/home/feed` (Phase 3).
3. `GET /api/komsel`, `GET /api/komsel/{id}/materials` (Phase 5).
4. `GET /api/giving/funds`, `GET /api/giving/accounts`, `POST /api/giving/submit` (Phase 6).
5. Auth: `POST /auth/login`, `POST /auth/refresh`, `POST /auth/logout` (Phase 9).
6. Videos: keep current — document the shape in `docs/videos.md` when convenient.

Renungan already contracted — no backend work needed there.

---

## Change log

- **2026-09-07** — Phase 0 complete: design import + tokens + this doc.
