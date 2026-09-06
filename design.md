# Design

UI kit: **FluentUI** (`@fluentui/react-native` for RN, `@fluentui/react-components` for web).

## Palette

| Name | Hex | Role |
|---|---|---|
| Midnight Violet | `#22162b` | background, base surface |
| Dark Amethyst | `#451f55` | elevated surface, nav |
| Dusty Grape | `#724e91` | primary accent, links |
| Blush Rose | `#e54f6d` | destructive, alert, CTA |
| Saffron | `#f8c630` | highlight, warning, focus |

## Tokens

```ts
export const palette = {
  midnightViolet: "#22162b",
  darkAmethyst:   "#451f55",
  dustyGrape:     "#724e91",
  blushRose:      "#e54f6d",
  saffron:        "#f8c630",
} as const;
```

## FluentUI theme mapping

- `colorNeutralBackground1` → `midnightViolet`
- `colorNeutralBackground2` → `darkAmethyst`
- `colorBrandBackground` / `colorBrandForeground1` → `dustyGrape`
- `colorStatusDangerBackground3` → `blushRose`
- `colorStatusWarningBackground3` → `saffron`

Wrap app in `FluentProvider` (web) or `ThemeProvider` (RN) with a theme built from these tokens.

## Visual reference: Spotify

Spotify's mobile app is the reference for surface shape and layout rhythm — dark-first
surfaces, dense content rows, and restrained, consistent corner rounding.

### Border radius

Spotify uses a small, fixed set of radii rather than per-component values. Match it:

| Token | Value | Applies to |
|---|---|---|
| `radius.sm` | `4px` | album/podcast artwork, thumbnails, inline images |
| `radius.md` | `8px` | cards, list rows, tiles, sheets, menus, banners |
| `radius.lg` | `16px` | bottom sheets and modals (top corners only) |
| `radius.pill` | `500px` | buttons, chips, filter pills, search field |
| `radius.circle` | `50%` | artist avatars, profile images, icon-only buttons |

```ts
export const radius = {
  sm: 4,
  md: 8,
  lg: 16,
  pill: 500,
  circle: 9999,
} as const;
```

Rules:

- Cards are `radius.md` (8). Do not use 12, 14, or 20 for cards — the softer corner reads
  as a different product.
- Artwork inside a card stays `radius.sm` (4), one step tighter than its container.
- Anything the user taps that holds a text label (button, chip, filter) is `radius.pill`.
- Circular is reserved for people — avatars and profile entrypoints — plus icon-only buttons.
- Never mix two radii on the same element; a card has one corner value on all four corners
  unless it is anchored to an edge (bottom sheet, header).

### Typography

Spotify ships **Spotify Mix** (its in-house successor to Circular). It is proprietary and
cannot be licensed or bundled, so do not attempt to use it. Match its *behaviour* instead:
a geometric sans with a tall x-height, near-zero tracking, and only three weights in play.

The project font is **Rethink Sans** (`RethinkSans-Regular` / `-Medium` / `-Bold`), which is
the closest open substitute. Keep it as the single family — no second family anywhere.

| Role | Size | Weight | Color |
|---|---|---|---|
| Screen title | 24 | Bold | primary text |
| Section header | 18 | Bold | primary text |
| Card / row title | 15–16 | Medium | primary text |
| Body | 14 | Regular | primary text |
| Secondary / description | 12–13 | Regular | muted text |
| Tab label, badge, caption | 11 | Medium | muted text |

Rules:

- Three weights only: Regular, Medium, Bold. No Light, no Semibold, no italics.
- Weight carries hierarchy before size does. Bump the weight before bumping the size.
- Titles and headings are tight: `letterSpacing` between `-0.5` and `0`. Never track out
  a heading. Small caps labels (11px) may use `letterSpacing: 0.5`.
- Line height is roughly 1.3 for titles, 1.5 for body.
- Secondary text is muted color, not a smaller weight — never render Regular text in Light
  gray *and* a smaller size to push it back; pick one.
- Titles truncate with `numberOfLines` and an ellipsis rather than wrapping to three lines.

### Other Spotify cues worth matching

- Cards carry no border and no drop shadow. Separation comes from a lighter surface color
  against the background, not from strokes.
- Content rows are compact: 12–16px horizontal padding, ~8px gap between cards.
- One accent color per screen for the primary action; everything else is neutral.

## Rules

- No hex literals in components — import from `palette`.
- Only use FluentUI primitives; no ad-hoc styled buttons/inputs.
- Dark theme is default (palette is dark-first).
- No literal radius numbers in components — import from `radius`.
- Card radius is `radius.md`; see the Spotify reference above before choosing anything else.
- One font family (`font.*`), three weights. No hardcoded `fontFamily` strings in components.
