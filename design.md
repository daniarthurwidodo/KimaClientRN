# Design — Sanctuary Modern

Imported from Stitch project `Church Community Mobile App` (`12494852605889163655`).
Reference theme: Spotify-black canvas + Microsoft Fluent 2 acrylic membranes + liturgical accents.
Target: modern church mobile app — intimate reverence, fluent depth, sacred restraint.

## Palette

Dark-first. No hex literals in components — import from `src/shared/theme/palette.ts`.

### Canvas + surfaces

| Token | Hex | Role |
|---|---|---|
| `bg` | `#121212` | root canvas (Spotify black) |
| `surface1` | `#181818` | contained surface, search inputs |
| `surface2` | `#242424` | elevated card |
| `surface3` | `#2A2A2A` | high-elevation acrylic |
| `acrylic` | `rgba(36,36,36,0.75)` | translucent card body |
| `acrylicHigh` | `rgba(40,40,40,0.85)` | floating nav + modal |
| `hairline` | `rgba(255,255,255,0.08)` | 1px border on acrylic |
| `hairlineHot` | `rgba(255,255,255,0.15)` | top specular edge |

### Accents

| Token | Hex | Role |
|---|---|---|
| `grace` | `#1DB954` | primary CTA, live indicator, playback |
| `sacred` | `#E5B25D` | scripture, liturgical banners, focus rings |
| `royal` | `#3B82F6` | admin, community, educational |
| `tithe` | `#F59E0B` | tithe fund |
| `building` | `#10B981` | building fund |
| `mission` | `#F43F5E` | mission / natal fund |

### Text

| Token | Hex | Role |
|---|---|---|
| `textPrimary` | `#FFFFFF` | headlines, scripture, sermon titles |
| `textSecondary` | `#B3B3B3` | body, metadata |
| `textMuted` | `#727272` | timestamps, inactive |

## Typography

Family: **Plus Jakarta Sans** (only). Weights: 400 / 600 / 700 / 800.

Roles live in `src/shared/theme/typography.ts` (`text.*`). Spread role then apply color:
`{ ...text.headlineSm, color: palette.textPrimary }`.

| Role | Size | Weight | Tracking |
|---|---|---|---|
| `display` | 40 | 800 | -0.03em |
| `headlineLg` | 32 (mobile 26) | 700 | -0.02em |
| `headlineMd` | 22 | 700 | -0.015em |
| `headlineSm` | 18 | 600 | -0.01em |
| `bodyLg` | 16 | 400 | -0.005em |
| `bodyMd` | 14 | 400 | 0 |
| `bodySm` | 13 | 400 | 0.005em |
| `labelLg` | 14 | 600 | 0.01em |
| `labelMd` | 12 | 600 | 0.02em |
| `labelSm` | 10 | 700 | 0.05em |

Rules:
- Single family. No second font anywhere.
- Weight carries hierarchy before size.
- Titles tight, labels tracked out slightly.
- Line height ~1.3 titles, ~1.5 body.
- Truncate titles (`numberOfLines`) — no 3-line wraps.

## Radius

`src/shared/theme/radius.ts`.

| Token | Value | Applies to |
|---|---|---|
| `sm` | 4 | (unused — kept for legacy) |
| `md` | 12 | form fields, thumbnails, media artwork |
| `lg` | 16 | cards, list rows, warta/sermon panels |
| `xl` | 24 | featured hero panels, acrylic banners |
| `pill` | 500 | buttons, chips, filter pills, nav dock |
| `circle` | 9999 | avatars, icon-only buttons |

Rules:
- Card = `lg`. Hero banner = `xl`. Never mix radii on one element.
- Artwork inside a card sits at `md` — one step tighter than container.
- Everything tappable that holds a text label = `pill`.

## Spacing

`2xs 4` · `xs 8` · `sm 12` · `md 16` · `lg 20` · `xl 24` · `2xl 32` · `3xl 40`.
Mobile gutter `16`. Mobile page margin `20`. Bottom safe-zone above nav pill `88` (`nav-pill-offset 5.5rem`).

## Elevation

Depth via acrylic + ambient glow. **No stark drop shadows** on cards.

| Layer | Recipe |
|---|---|
| 0 canvas | `#121212` matte |
| 1 recessed | `#181818` + `inset 0 1 2 rgba(0,0,0,0.4)` |
| 2 acrylic card | `rgba(36,36,36,0.75)` + `backdrop-filter: blur(20) saturate(160%)` + hairline border + top specular gradient |
| 3 floating | `rgba(40,40,40,0.85)` + `blur(32)` + volumetric `0 16 36 rgba(0,0,0,0.55)` |

Dynamic ambient glow: sermon artwork casts blurred (`blur(28)`) tinted footprint at opacity `0.35`.

> React Native note: `backdropFilter` unsupported natively. Use `@react-native-community/blur` (`BlurView`) or acceptable fallback (solid `surface2` + hairline border). Document per component.

## Components (blueprint)

### Buttons
- **Primary (Grace):** pill, fill `grace`, text `#121212` (`labelLg`). Press: `scale(0.98)`.
- **Secondary (acrylic):** pill, fill `rgba(255,255,255,0.08)`, border hairline, text `textPrimary`. Hover `rgba(255,255,255,0.16)`.
- **Liturgical CTA:** pill, fill `tithe` / `building` / `mission`, dark label.

### Floating pill nav
- Detached, centered, 20px above bottom safe area.
- Acrylic `rgba(30,30,30,0.82)`, blur 28.
- 4–5 icons (Home · Sermons/Renungan · Devotional · Giving · Profile).
- Active tab: `grace` micro-dot + radial glow footprint.

### Acrylic card (Warta / Sermon / Bulletin)
- `surface2` acrylic, radius `lg`–`xl`.
- 1:1 artwork leading, ambient blur footprint dominant-color tinted.
- Headline `headlineSm` primary, metadata `bodySm` `textSecondary`, pill badge for ministry.

### Form inputs
- Surface `surface1` inset, idle border hairline.
- Focus: border `sacred` or `royal`, external ring `0 0 0 3 rgba(229,178,93,0.2)`.
- Floating labels: start inside → animate to micro-label above on focus.

### Chips / filter pills
- Idle: acrylic pill low-profile.
- Selected: solid category color, `textPrimary` label, ambient halo.

### Checkboxes / radios
- Checkbox 6px radius square. Radio circle.
- Active fill `grace` + white check. Inactive border `rgba(255,255,255,0.25)`.

### Mini media player
- Above nav dock. Frosted horizontal bar. 1:1 sermon art, title ticker, scrubber, play/pause.

## Rules (enforced)

- No hex literals in components — import from `palette`.
- No literal radius / spacing numbers — import from `radius` / `spacing`.
- Single family: Plus Jakarta Sans. No `fontFamily` strings in components.
- Dark theme is default. Light theme not planned.
- Presentation never calls data layer — always via business layer.
