# Website Layout and States

## Scope

Keep the existing website foundation and native Nuxt UI styling. The home page introduces the product and opens the 32-statement questionnaire; the result page restores actual answers from a copyable link.

Product boundaries are defined in the [product overview](../../PRODUCT.md); reusable visual rules are in the [design system](../../DESIGN.md). Scoring and URL behavior are documented in [Questionnaire implementation](../../docs/0004-questionnaire-implementation.md).

## Direction contract

THESIS: Make the path from introduction to answering to a readable result direct. Keep the question count and estimated duration beside Start test. Explain invalid and balanced outcomes without forcing a personality assignment.

OWN-WORLD: Native Nuxt UI styling with royal-blue primary, cyan reading links, warm-orange personality links, and slate neutrals. Keep the bright blue-to-white home surface and clean reading areas. Reuse buttons, containers, navigation, cards, radio groups, progress, empty states, alerts, collapsibles, and theme controls. Preserve system typography, rounding, borders, and keyboard focus.

STORY: Visitors answer concrete coding situations, review their choices, then read a personality summary and dimension breakdown. They can copy a link and reopen it without an account. The About page and dimension explanations remain available independently.

FIRST VIEWPORT: BUGTI branding and navigation at the top; centered title and concise product description; Start test with 32 questions and an estimated 7–10-minute duration. No fabricated usage statistics or sample results.

FORM: Color-only brand replacement approved as option 3, blue/cyan with warm orange; reference `.impeccable/mocks/decision/brand-classic.png`, seed:1b05cda19611e326. Keep the existing composition and Nuxt UI's native component language. Theme switching and non-blocking settling animations respect reduced-motion preferences.

FINISH: Visual and behavioral review includes actual answering, result restoration, recovery, and translation states. No raster media is introduced for the questionnaire.

## Routes and states

- `/`: Brand introduction, Start test, count/duration, and two introductions linking independently to dimensions and personality types.
- `/dimensions`: Four preference pairs in canonical order, with responsive explanations.
- `/test`: Instructions or tab-local draft, one statement at a time, five required agreement choices with hypothetical-scenario instructions, previous/next navigation, and full answer review before submission. Reload resumes the tab's draft.
- `/result`: Query-restored answers and scores, rendered on the server and revalidated by the client. A complete non-tied result shows its approved personality profile with practical and collaboration sections. Tied dimensions retain candidates, older-version incomplete dimensions stay unscored, and a bare or invalid link shows an actionable empty state.
- `/personality-types`: Sixteen approved archetypes grouped by CR/CE/DF/DG, with a desktop reading panel and mobile inline expansion. Candidate links select the intended profile. See the [personality page brief](personality-types.md).
- `/about`: Purpose and reflection on how preferences evolve.
- Unknown routes: A custom 404 page with a return-home action.
- Other page errors: A generic recovery message without exposing internal errors.

## Home composition

Keep the shared brand, language, and theme controls. On the home route, the header is transparent and borderless; a single hero gradient begins at the document top behind it, without shifting content. Other routes keep the opaque header and native menus keep opaque surfaces. About remains in the footer. Group dimensions and personalities under Personality types. Place the primary action above a compact text-only question-count/duration row. Below the hero, use equally prominent introductions to the two existing explanation pages, side by side on desktop and stacked on mobile. Each introduction has one short sentence and a linked heading with an arrow; omit repeated footer actions.

## Test composition

Use a bounded reading width. Put actual answered progress and Start over above the current statement. Show labeled native radio cards vertically so long translations remain legible and the disagreement-to-agreement order never changes. The instructions ask respondents to imagine unfamiliar situations and choose their preference. Neutral is the valid midpoint; there is no skip choice. Put Previous and Next after the options. A native Auto-advance switch beside Next defaults to off; when enabled, selecting a response moves to the next question, with the final response opening review rather than submitting a result. Keep manual navigation available. Review lists all answers with editing controls and a View my result action.

Question changes focus the heading and use a bounded, cancellable settling animation without dimming the whole view. Storage unavailability is explicitly described. No minimum completion-time rule or misleading progress timer is used.

## Result composition

On wide screens, place the personality profile beside four dimension score cards; stack them on narrow screens. Each pole receives equally prominent text and the same primary color. Display the response index, not a confidence percentage. Keep exact ties distinct from malformed data and retain pole-endorsement patterns. Historical results retain their version and cannot be edited into current answers.

The profile preserves approved names and copy, with additional in-practice, trade-off, and collaboration sections. Below it, explain the non-tied preference directions. Keep one Copy result link action in the top toolbar, with brief answer-sharing disclosure and a URL field only if automatic copying fails; no dedicated saving section. Full answer disclosure is secondary. Editing restores current-version answers; retaking explicitly starts a fresh draft.

## Interaction requirements

- Header links, mobile navigation, recovery, candidate links, and result-editing actions lead to their stated destination.
- Language changes preserve the current route and synchronize copy, metadata, and Nuxt UI labels. Copied current-version links include the current language; historical copies keep their original token and language.
- Page replacement occurs immediately without waiting for a CSS leave event; a short new-page settling animation maintains continuity.
- Respect reduced-motion preferences and maintain visible keyboard focus.
- Skip to content must preserve result query data.
- Keep public copy concise and specific; do not repeat scientific claims or introduce ability judgments.
- No account, database, or public deployment is added.

## Verification

Check desktop and narrow mobile layouts in both languages, including long English labels. Check required responses, answer retention, draft reload, all 32 steps, review and result navigation, copy/reopen, invalid data, ties, missing answers, candidate links, language/theme switching, and recovery.

Automated timing does not validate the estimated 7–10-minute completion claim. Scientific validation remains a separate research task.
