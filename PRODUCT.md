# Product Overview

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Nuxt 4, Nuxt UI 4, TypeScript, and vue-i18n. Use pnpm at the version pinned in `package.json`.

## Users

Programmers who want to understand the preferences behind their technical decisions.

## Product Purpose

BUGTI is a programmer personality test for people who want to understand the preferences behind their technical decisions. Its purpose is self-reflection and discussion, not assessment of engineering ability.

The product name is **BUGTI**. Its user-facing description is **Programmer Personality Test**. The website uses Nuxt, Nuxt UI, TypeScript, and vue-i18n, with native Nuxt UI components and styling.

## Capabilities and Constraints

The implemented scope includes the website foundation and an exploratory questionnaire:

- A concise home page introducing BUGTI, with a **Start test** action, 32-question count, and an estimated 7–10-minute duration.
- A dedicated `/dimensions` page with four preference-pair summaries and explanations.
- A `/test` flow with instructions, one statement at a time, five required agreement levels, hypothetical-scenario instructions, previous/next navigation, and answer review.
- Versioned, tab-local draft recovery after reload; a fresh-test action and restoration of answers for editing from result links.
- A `/result` page with actual response-based dimension scores, descriptive personality profiles, practical trade-offs, and collaboration notes. Exact ties do not assign a fabricated single type; incomplete or invalid current answer sets cannot generate a result.
- Copyable result links that restore answers, scores, and the same descriptive type without an account or database.
- An About page explaining the test's purpose and how preferences evolve.
- A `/personality-types` directory with sixteen approved archetypes and bilingual profiles: grouped choices with a sticky reading panel on desktop, inline expansion on mobile, and classification details on demand.
- Responsive layouts, light and dark themes, and Simplified Chinese and English.

Locale selection preserves URLs and is saved in a cookie. The questionnaire uses BUGTI-Q3 content and BUGTI-S1 scoring. There are no accounts, database, domain, or public deployment. Drafts use session storage in the current tab. Result links use a query parameter with three-bit packed answers, a version/locale header, and a compact checksum, encoded as 19 Base64URL characters. Whoever has a link can read its answers; the query can also appear in server logs. The checksum detects accidental corruption, not deliberate alteration or authenticity. See [Questionnaire implementation](docs/0004-questionnaire-implementation.md).

## Dimensions

The order below defines the future four-letter type order and must remain stable.

### Control / Delegation (C/D)

**Question:** Who should control key mechanisms?

- **Control:** Prefer mechanisms that are visible, explainable, and adjustable, accepting more complexity in exchange for control.
- **Delegation:** Entrust general complexity to reliable languages, frameworks, and platforms, leaving effort for problems that need direct attention.

This concerns responsibility and control boundaries. It does not equate delegation with lack of technical knowledge or control with building every tool from scratch.

### Flexibility / Guarantees (F/G)

**Question:** How much implementation freedom should be retained?

- **Flexibility:** Preserve room for composition and change, accepting that developers will judge and verify some rules.
- **Guarantees:** Encode rules in types, interfaces, and models to prevent invalid states and operations upfront.

This concerns constraints, independently of who manages complexity. Neither preference implies careless implementation or resistance to business change.

### Reasoning / Experimentation (R/E)

**Question:** Where does a technical judgment begin?

- **Reasoning:** Build a model and use premises, causes, and boundaries to deduce why a solution works.
- **Experimentation:** Start with prototypes, measurements, and observations, then revise judgments based on actual results.

Both sides use thought and evidence. The distinction concerns the preferred starting point under uncertainty.

### Utility / Aesthetics (U/A)

**Question:** What makes additional investment in code worthwhile?

- **Utility:** Evaluate benefits, costs, risks, and maintenance burden; additional effort needs a practical return.
- **Aesthetics:** Value coherent structure, precise concepts, and elegant expression; invest in intrinsic design quality even when immediate returns are unclear.

Aesthetics refers to code and design quality rather than visual decoration. Neither side implies poor workmanship or overengineering.

## Brand Commitments

Use the BUGTI name and the Programmer Personality Test description. Keep the home page focused on the product's purpose and test availability, with clear routes to personality types and a dedicated dimensions page. Use native Nuxt UI components and styling.

## Evidence on Hand

The product name and dimension definitions are confirmed. There are no validated test results, user statistics, testimonials, or scientific-validity evidence to cite.

## Product Principles

- Treat both ends of every dimension as reasonable trade-offs.
- Separate personal preference from technical ability and specific language choices.
- State unavailable functionality clearly.
- Do not fabricate results, usage statistics, testimonials, or scientific evidence.
- Preferences may change with projects, teams, and experience.

BUGTI is not a scientifically validated psychological assessment. Conceptual separation of the dimensions does not establish statistical independence. Do not use the product for recruitment screening or career decisions.

## Personality Types

The approved code order is C/D, F/G, R/E, U/A: control, constraints, cognition, then values. Names describe coding attitudes, not occupations or ability levels.

The four browsing groups first split by Control/Delegation. Control types split by Reasoning/Experimentation; Delegation types split by Flexibility/Guarantees. Grouping is a presentation hierarchy, not a scoring weight or claim of statistical importance. CR and CE combine the first and third letters; DF and DG combine the first and second. Four-letter codes keep their canonical order.

- CR Planners: CFRU Philosopher, CFRA Artist, CGRU Goalkeeper, CGRA Architect.
- CE Practitioners: CFEU Engineer, CFEA Inventor, CGEU Inspector, CGEA Craftsperson.
- DF Pioneers: DFRU Planner, DFRA Director, DFEU Doer, DFEA Explorer.
- DG Guardians: DGRU Steward, DGRA Lawmaker, DGEU Administrator, DGEA Sound Engineer.

Stable codes and group membership are maintained in `app/data/personalities.ts`; approved Chinese names and all user-facing descriptions are maintained in `app/locales/`. The directory uses the same content intended for future result explanations, without assigning users a result.

## Questionnaire content specification

[Questionnaire content and scoring](docs/0003-questionnaire-and-scoring.md) defines BUGTI-Q3 content and BUGTI-S1 scoring: 32 original bilingual, hypothetical scenario statements, five fully labeled agreement categories, eight equal-weight items per dimension, required answers and explicit tie handling, and empirical validation requirements. The exploratory answering and result flow implements this convention; scientific validity and the completion-time estimate remain unverified.

## Open decisions

Questionnaire validation, empirical confirmation of the response format and completion time, long-term/server-side result persistence, and the deployment target remain open. The implemented content and scoring convention require independent review and real-sample validation before any scientific-validity claims.
