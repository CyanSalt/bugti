# Questionnaire Implementation

## Scope

The local website implements the exploratory BUGTI-Q3 questionnaire and BUGTI-S1 scoring described in [Questionnaire content and scoring](0003-questionnaire-and-scoring.md). It does not establish scientific validity or measured completion time. No account, application backend, database, or public deployment is added.

## Flow

- `/` provides Start test, the 32-item count, and an estimated 7–10-minute duration.
- `/test` opens instructions or resumes the current tab's draft. One statement is answered at a time, with five required agreement choices. Respondents imagine the scenario even without experience; Neutral remains a scored midpoint. Previous preserves answers; unanswered statements cannot advance. All 32 choices are reviewed before submission.
- `/test?new=1` resets the draft, then removes the reset query so refresh does not keep resetting it.
- `/test` with a valid current-version result query restores the answers for review/editing, saves them as a tab-local draft, and removes the query so a reload preserves subsequent edits rather than replaying the old link.
- `/result?r=<token>` restores during SSR and client navigation. A bare route is empty; unsupported, duplicated, malformed, or accidentally corrupted payloads show a recovery state. No scores are fabricated from missing data. The locale embedded in a valid token initializes the per-request i18n instance, matching hydration.

Drafts use a versioned `sessionStorage` key. They survive reloads within the same tab, not a closed browser session. Inaccessible storage does not prevent answering; the UI states that reload recovery is unavailable. Vue/Nuxt state is per application/request; neither draft nor locale is stored in a shared server singleton.

## Sources of truth

- Stable question IDs, order, and scoring direction: `app/data/questionnaire.ts`.
- Exact bilingual statements and response labels: `app/locales/en.json` and `app/locales/zh-CN.json`. A unit test checks all statements against the approved specification.
- Dimension definitions and canonical C/D, F/G, R/E, U/A order: `app/data/dimensions.ts`.
- Descriptive archetype codes: `app/data/personalities.ts`.
- Pure scoring and result-state decisions: `app/utils/scoring.ts`.
- URL encoding and validation: `app/utils/resultLink.ts`.
- Tab-local persistence: `app/composables/useQuestionnaireDraft.ts`.
- Pages and result composition: `app/pages/test.vue`, `app/pages/result.vue`, `app/components/ResultProfile.vue`, and `app/components/ResultDimension.vue`.

All original profile names, summaries, and descriptions are retained. Additional in-practice, trade-off, and collaboration sections live in the same localization dictionaries. They are reflective interpretations, not validated performance or career predictions.

## Scoring states

Current results require 32 integer responses from 1 through 5. Every dimension has eight numeric responses; Neutral (3) contributes zero oriented points and remains in the denominator. Null draft answers and former `x` answers are invalid for current scoring, submission, and encoding. Historical BUGTI-Q2.1 results use a separate scoring entry point retaining the former missing-response rule; no unknown response becomes Neutral.

A complete dimension uses equal-weight oriented answers, an exact integer sum, its mean, and a linear 0–100 response index. The displayed index retains up to three decimal places. Opposite poles have the same color and equal text weight; scores are not probabilities or ability ratings. Average raw agreement to each pole is retained so uniform agreement and neutral responding do not collapse into indistinguishable explanations.

A single archetype is assigned only when all four dimensions are complete and nonzero. Exact ties retain the compatible codes; four exact ties show no overall direction without printing sixteen full reports. Near-boundary results are labeled using the specification's arithmetic envelope, not a statistical confidence claim.

## Restorable link format

The result path is `/result?r=<token>`, with no fragment or extra language parameter. The **19-character Base64URL token** encodes 14 bytes:

- One header byte: `0x20` for Simplified Chinese or `0x21` for English. These values pin BUGTI-Q3 + BUGTI-S1 and reserve other values for future schema versions.
- Twelve answer bytes: each of the 32 answers occupies three bits in stable question order, packed least-significant bit first. Codes 0–4 represent response values 1–5; codes 5, 6, and 7 are invalid in current links.
- One CRC-8 byte using polynomial `0x07`, initial value zero, over the preceding 13 bytes.

Base64URL uses `-` and `_` and omits padding. Decode requires the exact token length, canonical encoding, supported header, valid three-bit answers, and matching CRC. Duplicate or unknown query fields are rejected. The relative result path is 29 characters including `/result?r=`. This compresses the full answers rather than storing only scores, preserving answer review and exact recomputation.

Restoration computes the result instead of trusting a caller-provided personality code or score. Earlier headers `0x10`/`0x11` remain viewable as BUGTI-Q2.1 + BUGTI-S1, including code 5 as the historical Cannot judge answer. They show the original bilingual statements and a version notice, keep their original token when copied, and do not offer editing into a new-version draft. Old draft storage is not read by the current version. Keep the header meaning and decoder stable when adding new content versions. Never reuse the same header for changed statements or scoring. The earlier unpublished fragment format is not emitted or accepted.

CRC detects common accidental corruption; it is not encryption, a signature, or protection against deliberate modification. Anyone with the URL can recover the answers. Result links may appear in browser history. Result pages set noindex and no-referrer; these are not secrecy guarantees. No user identity or account is encoded.

Copy result link remains a single toolbar action; there is no dedicated saving section. If the Clipboard API fails, a selected input is shown for manual copying. Copying current results uses the current locale in the token and the current site origin. Historical copies preserve the original token and its embedded locale. A localhost link stays local; cross-device access requires an accessible deployment, which is not performed automatically.

## Interaction and accessibility

Nuxt UI owns radio semantics, focus behavior, card selection, progress, buttons, switches, collapsible disclosure, and input controls. No custom radio widget or fake progress timer is added. Next remains explicit by default. An Auto-advance switch beside Next is initially off; enabling it advances once after a valid answer selection, including keyboard selection. Changing the switch, restoring answers, and revisiting an answered question do not advance by themselves. The last selection opens answer review, never submits the result automatically. The switch is page-local, resets when starting over or reopening the page, and is not stored in drafts or result links.

Page replacement is not gated by a CSS leave transition. A cancellable 140ms settling animation runs on the new page shell after route completion, with a bounded timer and reduced-motion support. Question changes use a similar 180ms settling animation. This avoids leaving users stuck on the previous page when browser animation completion is delayed.

The skip-to-content link focuses and scrolls without changing result query data. Result/profile candidate links select the intended archive profile on desktop and open its inline disclosure on narrow layouts.

## Validation

Run:

```sh
corepack pnpm test tests/questionnaire.test.ts
corepack pnpm typecheck
corepack pnpm lint
corepack pnpm test
corepack pnpm build
```

The questionnaire suite covers approved translations, stable coverage, all sixteen extreme type vectors, ties, missing answers, small directional scores, the documented worked example, URL round trips, corruption, duplicate fields, unsupported versions, codes 5–7, historical result preservation, draft version isolation, and both locales.

Browser checks must cover Auto-advance off/on toggling, no navigation from toggling alone, one-step selection navigation, keyboard selection, last-answer review without auto-submission, reset/reload defaults, Start test, required answers, previous/edit navigation, fresh-test reset, draft recovery, all 32 steps, review and finish, typed/tied results and historical incomplete results, copy feedback, reopening result links, editing restored answers, invalid links, language/theme changes, and responsive layout. Completion-time validity still requires real-sample research; automated completion is not timing evidence.
