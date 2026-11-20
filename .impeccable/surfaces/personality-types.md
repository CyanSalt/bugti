# Personality Types Page

## Scope

A read-focused `/personality-types` page explaining the sixteen approved BUGTI archetypes. Inherit the existing Nuxt UI design system and locale behavior. Names and descriptions are based on the approved product discussion, not copied from another personality model.

The references are [16Personalities' type directory](https://www.16personalities.com/personality-types) and its [Chinese directory](https://www.16personalities.com/ch/%E7%B1%BB%E5%9E%8B%E6%8F%8F%E8%BF%B0): four named groups, named types, codes, and concise introductions. Reuse their information hierarchy, not their artwork, text, or brand styling.

## Direction contract

THESIS: Make the differences between sixteen coding attitudes easy to browse and understand, without presenting them as professions, ability ratings, or scientific findings.

OWN-WORLD: Native Nuxt UI buttons, badges, collapsibles, and one reading card, with system typography and the shared header/footer. Blue, cyan, orange, and teal distinguish four equally valued groups using dedicated, non-status Nuxt UI color roles. Lucide role symbols stay compact; remove large low-information backplates.

STORY: Visitors scan four groups and sixteen named choices. Desktop selection updates the adjacent sticky archive; mobile choices expand in place. Code order and branching classification remain available through secondary disclosure.

FIRST VIEWPORT: Page title, short introduction, group anchors, classification disclosure, and the first group with its default profile. No introductory explanatory panel delays the directory.

FORM: The user selected an interactive personality archive. At 1024px and wider, a compact grouped list sits beside a viewport-bounded scrollable reading panel. Narrow screens use inline UCollapsible profiles. Keep all approved names, summaries, full descriptions, four preferences, group membership, and no-scoring boundaries.

MOTION: Selection is the focal moment: the native selected tint travels to the next choice over 320ms with a bounded 240px displacement, while title/icon, code, summary, prose, and preferences settle over 280ms with 24ms offsets. Keep all content visible, cancel superseded effects, and preserve surrounding layout. Preserve selection across language changes; reduced motion updates directly. Native disclosure handles mobile expansion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Content and behavior

- Code order: Control/Delegation, Flexibility/Guarantees, Reasoning/Experimentation, Utility/Aesthetics.
- `app/data/personalities.ts` owns stable codes, grouping, and role symbols; `app/locales/` owns names, summaries, and full descriptions in both languages.
- Provide navigation from the shared header, mobile menu, and home page.
- Desktop choices use `aria-pressed`; updates are announced through the archive's live region. Mobile expand/collapse controls name the type for screen readers. Multiple mobile descriptions may stay open. Language changes preserve selection and open state.
- Grouping starts with C/D, then uses R/E for C and F/G for D. CR/CE are not four-letter-code prefixes. Each group contains four types; names and approved full type descriptions remain unchanged.
- Group links use native anchors and the existing header offset. Each section shows its group name, two-letter identifier, and shared coding attitude.
- The directory ends after the four groups. The shared footer provides access to About; omit a separate disclaimer section and limitations link.
- Keep classification copy focused on how group codes map to the four-letter type.
- Questionnaire and scoring remain unavailable.
