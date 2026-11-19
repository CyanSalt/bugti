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

The implemented scope is the website foundation:

- A concise home page and explanations of four dimensions.
- A test entry that explicitly states the questionnaire is unavailable.
- An empty results page without sample scores or fabricated reports.
- An About page explaining the test's purpose and how preferences evolve.
- A `/personality-types` directory with sixteen approved archetypes and bilingual profiles: grouped choices with a sticky reading panel on desktop, inline expansion on mobile, and classification details on demand.
- Responsive layouts, light and dark themes, and Simplified Chinese and English.

Locale selection preserves URLs and is saved in a cookie. No questionnaire, answering flow, scoring, accounts, database, domain, or public deployment is implemented.

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

Use the BUGTI name and the Programmer Personality Test description. Keep a concise test entry with dimension explanations below it, using native Nuxt UI components and styling.

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

## Open decisions

The formal questionnaire, question count, scoring, tie handling, result persistence, and deployment target remain undecided. Do not infer these rules from the current page skeleton.
