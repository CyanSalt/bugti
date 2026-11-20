---
name: BUGTI
description: A programmer personality test website built with Nuxt UI
colors:
  primary: "#2563eb"
  primary-dark: "oklch(70.7% 0.165 254.624)"
  secondary: "oklch(52% 0.105 223.128)"
  accent: "oklch(55.3% 0.195 38.402)"
  background: "#ffffff"
  background-dark: "oklch(12.9% 0.042 264.695)"
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

Use the native Nuxt UI design system. The BUGTI name, consistent icons, royal-blue primary, cyan secondary, and warm-orange accent establish the brand. Reuse Nuxt UI layouts, buttons, navigation, cards, alerts, empty states, and theme controls rather than creating a separate component language.

## Colors

Use royal blue for the main action, brand icon, focus, and dimension results. Light mode uses blue 600 (`#2563eb`); dark mode uses blue 400. Cyan marks the dimensions reading destination and its summary; orange marks the personality destination. Use darker cyan/orange steps for small text, reserving the brighter orange 500 (`#e96c43`) for non-text color roles. Neutral colors follow slate. The home hero fades from blue 50 to the white reading canvas; its dark counterpart fades from blue 950 to slate 950, with no full saturated-color takeover. One continuous gradient extends behind the transparent, borderless home header from the document top. Other routes retain the opaque native header; menu overlays keep their native opaque surfaces.

Personality groups have independent, non-status roles: CR blue, CE cyan, DF orange, and DG teal. Use step 700 for light-theme group text, 400 for dark-theme group text, 50/950 for selected surfaces, and 800/200 for their supporting text. Names, codes, icons, and selected/disclosed state remain non-color cues. Success, warning, and error colors are reserved for actual statuses.

Dark mode uses slate 950 for the canvas, 900 for muted areas, 800 for elevated controls, and 700 for borders. Muted body copy uses slate 600 in light mode and 400 in dark mode. Primary solid and link hovers use explicit darker/lighter blue steps rather than translucent foregrounds, keeping text readable.

Both ends of a dimension use the same color. Color must not imply that one preference is better.

The implementation sources are `app/app.config.ts` and `app/assets/css/main.css`. Nuxt UI generates the semantic color scales; do not maintain a competing palette in application code.

## Typography

Use the system font stack with CJK support and no external font loading. Home page titles are 36px on mobile and 60px on desktop, both with 1.25 line height. Home introduction headings are 20px on mobile and 24px on desktop; page and profile titles use 30px / 36px. Result profile section headings use 18px semibold, clearly separate from 16px regular prose. Keep 14px for compact directory summaries, controls, and supporting labels, and 12px for codes, canonical-name annotations, and technical metadata.

Use 16px / 28px for ordinary descriptions, dimension explanations, expanded mobile profiles, and answer options (24px leading inside native radio cards). Longer profile prose uses 16px / 32px. Page introductions and About prose are bounded to approximately 65ch; smaller cards and mobile columns inherit their available width. Balance headings and short centered blocks, and use pretty wrapping for prose. Keep long profile titles in a shrinkable text column beside the icon, with a word-wrap fallback. Use tabular numerals for response indices so changing scores retain alignment.

Allow long translated labels and canonical English names to wrap. Dimension codes remain bold. When an English label already matches its canonical name, omit the duplicate secondary name.

## Layout

Use `UContainer` for width and horizontal spacing. The home page has two short introductions, for four dimensions and sixteen personalities, each with its own destination. Present them side by side on desktop and stack them on mobile, without showing full classification details. On `/dimensions`, the dimension summary has two columns on mobile and four on desktop. Dimension cards use one column on mobile and two on wide screens; `UPageGrid` presents both ends side by side inside each `UPageCard`.

Use `UPageGrid`, naked `UPageCard` sections, and `USeparator` for the home page introductions. Put a native `UButton` link in each heading slot so the heading itself opens the destination, without a repeated footer action. Keep each introduction to one short sentence. Use the `UHeader` mobile menu and a shared footer. A single `UDropdownMenu` groups dimension and personality links on desktop; a vertical `UNavigationMenu` preserves that hierarchy on mobile. Keep About in the footer only. Keep controls content-sized rather than assuming Chinese or English text lengths.

## Elevation & Depth

Use default component borders and subtle background differences to separate regions. Do not add decorative glows or large shadows. Nuxt UI owns overlay layering, focus management, and dismissal.

## Shapes

The base radius is 8px and cards use the Nuxt UI 16px radius. Use `UBadge` for small dimension codes rather than custom ornamental shapes.

## Components

- `UPageHero`: Home page title, description, and entry actions.
- `UPageSection`, `UPageGrid`, and `UPageCard`: Dimension explanations using the shared theme.
- `UButton`: Solid primary actions, outline secondary actions, and ghost navigation.
- `UEmpty`: Missing or invalid result links and error states with actionable recovery.
- `URadioGroup`: Native card-style agreement options; no preselected answer and explicit Next navigation by default.
- `USwitch`: Optional Auto-advance beside Next, off by default.
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

The reading panel has a viewport-bounded height and independent scrolling so long translations remain reachable without shifting surrounding content. Selection uses a full-surface tint and `aria-pressed`, with a polite announcement of the updated profile. The selected tint moves to the next choice over 320ms, bounded to 240px when moving between distant groups. The title/icon, code, summary, prose, and preferences settle in a short 280ms sequence with 24ms offsets, without fading content. Repeated selections cancel unfinished effects; reduced motion updates immediately. Native Nuxt UI controls own mobile disclosure and focus.

## Interaction motion

The home hero previews four approved personality types between the description and Start test, using native UCarousel and naked UPageCard composition. Show existing role icons, names, and one-sentence summaries, with native links to the full profile. Keep dimension definitions and codes out of the hero. Show one item on narrow screens, two on medium screens, and three on wide screens; swipe, keyboard arrows, and native previous/next controls reveal the remaining previews. No autoplay or personalized-result claims. Reduced motion uses zero-duration carousel movement. The primary test action remains independent of preview browsing.

Questionnaire selection retains native radio state and adds a 180ms indicator confirmation. Auto-advance leaves 160ms for the selected response to register before moving; manual navigation, changing the response, turning auto-advance off, restart, route changes, and unmount cancel pending advancement. Reduced motion advances without the visual delay. New headings and radio cards settle directionally over 260ms with bounded stagger; Previous reverses direction. Actual answered progress uses the native UProgress transform transition at 320ms. No animation waits gate manual navigation or result submission.

Short-lived Web Animations are owned by `app/utils/motion.ts`, canceled on replacement and disposal, and removed from the active set when finished. Preserve static rendered defaults and avoid opacity dips or long-distance motion. The system palette, typography, native component behavior, product copy, and scoring stay unchanged.

## Do's and Don'ts

- Reuse Nuxt UI components and semantic colors; avoid wholesale theme overrides.
- Keep stable dimension identifiers in `app/data/dimensions.ts` and translatable copy in `app/locales/`.
- State unimplemented capabilities clearly; do not fabricate scores, reports, or user statistics.
- Do not assign success and error colors to opposing preferences.
- Avoid unrelated decoration, charts, and repetitive explanatory text.
