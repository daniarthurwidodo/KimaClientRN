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

## Rules

- No hex literals in components — import from `palette`.
- Only use FluentUI primitives; no ad-hoc styled buttons/inputs.
- Dark theme is default (palette is dark-first).
