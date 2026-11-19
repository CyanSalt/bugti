# Website Layout and States

## Scope

Keep the existing website foundation and native Nuxt UI styling. The home page is a concise test entry with dimension explanations below it. The questionnaire and scoring are not connected.

Product boundaries are defined in the [product overview](../../PRODUCT.md); reusable visual rules are in the [design system](../../DESIGN.md).

## Direction contract

THESIS: Introduce the programmer personality test clearly. Keep the entry action and unavailable status together; do not suggest the questionnaire can already be answered.

OWN-WORLD: Native Nuxt UI styling with emerald primary and slate neutral colors. Reuse the library's buttons, containers, navigation, cards, empty states, alerts, and theme controls. Preserve system typography, rounding, borders, and focus behavior.

STORY: Visitors understand the purpose, explore four dimensions, and open a test entry that explains the unavailable questionnaire. The About page supports reflection and discussion; a direct result-page visit shows an honest empty state.

FIRST VIEWPORT: BUGTI branding and navigation at the top; centered title and concise description; two actions and the unavailable-status message below; a four-pair summary that uses two columns on mobile. No fabricated statistics, scores, or reports.

FORM: seed: none (pinned). The user requested Nuxt and Nuxt UI with maximum reuse of their native component styling, and confirmed a concise test entry. Preserve that direction rather than creating a new visual identity. Theme switching and short page transitions must respect reduced-motion preferences.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Routes and states

- `/`: Brand introduction, test entry, dimension summary, and four dimension explanations.
- `/test`: Questionnaire unavailable; actions lead to the dimensions or home page.
- `/result`: No result available; no sample scores or fabricated report.
- `/personality-types`: Sixteen approved archetypes grouped by CR/CE/DF/DG, with a desktop reading panel and mobile inline expansion. See the [personality page brief](personality-types.md).
- `/about`: Purpose and reflection on how preferences evolve.
- Unknown routes: A custom 404 page with a return-home action.
- Other page errors: A generic recovery message without exposing internal errors.

## Home page composition

Keep the BUGTI brand and navigation at the top, including language and theme controls. Place a centered title and concise description above two actions: view the test entry and explore the dimensions. Show the questionnaire's unavailable status next to these actions.

The four code pairs appear in a horizontal summary on desktop and a two-column layout on mobile. Detailed explanations follow in responsive cards. Do not add fabricated usage numbers, scores, or report previews.

## Interaction requirements

- Header links, mobile navigation, anchor links, and recovery actions must lead to their stated destination.
- Language changes preserve the current route and synchronize copy, metadata, and Nuxt UI labels.
- Theme switching and short page transitions preserve visual continuity.
- Respect reduced-motion preferences and maintain visible keyboard focus.
- Keep public copy affirmative and specific. Omit repeated disclaimers, ability comparisons, scoring-weight caveats, and editorial promises about avoiding fabricated content. Preserve unavailable states and recovery instructions.
- Keep both sides of each dimension equally legible and avoid value judgments in styling.

## Verification

For changes to this surface, check desktop and narrow mobile layouts, including long English labels. Inspect language and theme switching, mobile menu opening and closing, anchor positioning, and empty/error state recovery.

Never represent an unavailable feature as working. A page skeleton does not establish questionnaire, scoring, or result rules.
