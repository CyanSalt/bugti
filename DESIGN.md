---
name: BUGTI
description: A programmer personality test website built with Nuxt UI
colors:
  primary: "oklch(50.8% 0.118 165.612)"
  primary-dark: "oklch(76.5% 0.177 163.223)"
  background: "#ffffff"
  background-dark: "oklch(20.8% 0.042 265.755)"
  text: "oklch(20.8% 0.042 265.755)"
  text-dark: "#ffffff"
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  body:
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif'
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
rounded:
  base: "8px"
  card: "16px"
spacing:
  small: "8px"
  medium: "16px"
  large: "24px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.base}"
  card:
    backgroundColor: "{colors.background}"
    rounded: "{rounded.card}"
---

# Design System

## Overview

Use the native Nuxt UI design system. The BUGTI name, consistent icons, and emerald primary color establish the brand. Reuse Nuxt UI layouts, buttons, navigation, cards, alerts, empty states, and theme controls rather than creating a separate component language.

## Colors

Use the primary color for the main action, brand icon, and dimension codes. Light mode uses emerald 700; dark mode uses emerald 400. Neutral colors follow the slate palette.

Both ends of a dimension use the same color. Color must not imply that one preference is better.

The implementation sources are `app/app.config.ts` and `app/assets/css/main.css`. Nuxt UI generates the semantic color scales; do not maintain a competing palette in application code.

## Typography

Use the system font stack with CJK support and no external font loading. Home page titles are 36px on mobile and 60px on desktop. Section titles are 24px / 30px; body text is 14px / 16px depending on its role.

Allow long translated labels and canonical English names to wrap. Dimension codes remain bold. When an English label already matches its canonical name, omit the duplicate secondary name.

## Layout

Use `UContainer` for width and horizontal spacing. The home page has two short introductions, for four dimensions and sixteen personalities, each with its own destination. Present them side by side on desktop and stack them on mobile, without showing full classification details. On `/dimensions`, the dimension summary has two columns on mobile and four on desktop. Dimension cards use one column on mobile and two on wide screens; `UPageGrid` presents both ends side by side inside each `UPageCard`.

Use `UPageGrid`, naked `UPageCard` sections, and `USeparator` for the home page introductions; preserve native heading, body, and footer slots. Use the `UHeader` mobile menu and a shared footer. A single `UDropdownMenu` groups dimension and personality links on desktop; a vertical `UNavigationMenu` preserves that hierarchy on mobile. Keep About in the footer only. Keep controls content-sized rather than assuming Chinese or English text lengths.

## Elevation & Depth

Use default component borders and subtle background differences to separate regions. Do not add decorative glows or large shadows. Nuxt UI owns overlay layering, focus management, and dismissal.

## Shapes

The base radius is 8px and cards use the Nuxt UI 16px radius. Use `UBadge` for small dimension codes rather than custom ornamental shapes.

## Components

- `UPageHero`: Home page title, description, and entry actions.
- `UPageSection`, `UPageGrid`, and `UPageCard`: Dimension explanations using the shared theme.
- `UButton`: Solid primary actions, outline secondary actions, and ghost navigation.
- `UEmpty`: Missing or invalid result links and error states with actionable recovery.
- `URadioGroup`: Native card-style agreement options; no preselected answer and explicit Next navigation.
- `UProgress`: Actual answered-item progress and dimension response indices, never a fabricated confidence score.
- `UInput`: Read-only, selectable result URL with manual-copy fallback.
- `UAlert`: Product limitations.
- `UColorModeButton`: Native theme switching.
- `LanguageSwitcher`: `UDropdownMenu` with a ghost icon button and native language names.
- `UApp`: Nuxt UI messages synchronized with the vue-i18n locale.

Use a non-blocking 140ms settling animation on the newly rendered page shell and respect `prefers-reduced-motion`. Do not gate route replacement on a CSS leave-animation completion event. Anchor navigation positions content directly, leaving 80px above it. Keyboard focus must be visible, and text selection must remain readable in both themes.

The [design sidecar](.impeccable/design.json) records component snippets and supplementary metadata. It is development material, not a runtime theme source.

## Personality archive

The personality directory uses compact grouped choices and a sticky adjacent reading panel at 1024px and wider. Below that breakpoint, each choice expands in place using UCollapsible. Remove large icon backplates and repeated action buttons; retain role symbols, codes, all approved copy, and four-group color meaning. Classification is secondary disclosure.

The reading panel has a viewport-bounded height and independent scrolling so long translations remain reachable without shifting surrounding content. Selection uses a full-surface tint and `aria-pressed`, with a polite announcement of the updated profile. Profile changes use a cancellable 220ms, 6px horizontal settling motion with bounded blur and no opacity dip. Reduced motion updates immediately. Native Nuxt UI controls own mobile disclosure and focus.

## Do's and Don'ts

- Reuse Nuxt UI components and semantic colors; avoid wholesale theme overrides.
- Keep stable dimension identifiers in `app/data/dimensions.ts` and translatable copy in `app/locales/`.
- State unimplemented capabilities clearly; do not fabricate scores, reports, or user statistics.
- Do not assign success and error colors to opposing preferences.
- Avoid unrelated decoration, charts, and repetitive explanatory text.
