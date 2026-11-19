# Agent Instructions

## Project constraints

- Write code, comments, and unit tests in **English**. Keep localized UI strings in `app/locales/*.json`, including native language labels; do not hardcode Chinese text in source or tests.
- Use Nuxt 4, Nuxt UI 4, TypeScript, and vue-i18n. Reuse Nuxt UI components and their native design language.
- Use **pnpm only**, at the version pinned in `package.json`. Keep `pnpm-lock.yaml`; do not introduce npm or Yarn lockfiles.
- Product scope and open decisions are maintained in `PRODUCT.md`. Do not treat unavailable questionnaire or scoring features as implemented.
- Preserve dimension order and codes: **C/D, F/G, R/E, U/A**. Stable identifiers belong in `app/data/dimensions.ts`; translatable copy belongs in `app/locales/`.
- Both ends of a dimension are valid preferences, not ability ratings. Do not fabricate results or claims of scientific validity.
- Keep vue-i18n, Nuxt UI messages, and page metadata synchronized. Each SSR request needs its own i18n instance; never share mutable locale state across requests.

## Commands

```sh
pnpm install --frozen-lockfile
pnpm dev
pnpm typecheck
pnpm lint
pnpm test
pnpm test tests/i18n.test.ts
pnpm build
```

For UI changes, inspect desktop and narrow mobile layouts in the affected languages. Documentation-only changes require language, link, and consistency checks rather than an application rebuild.

## Documentation

- Write repository documentation in **English**; product translations remain multilingual.
- Keep `README.md` user-facing. Keep this file limited to essential agent guidance.
- Ordinary development documents use `docs/NNNN-descriptive-name.md`, with unique four-digit numbers and lowercase hyphenated filenames.
- Preserve `PRODUCT.md`, `DESIGN.md`, `.impeccable/surfaces/`, and `.impeccable/design.json` at their tool-required paths. These are exceptions to the numbered-doc rule; reference them instead of duplicating or relocating them.

## References

- [Product scope and dimensions](PRODUCT.md)
- [Development setup and project structure](docs/0001-development-guide.md)
- [Internationalization](docs/0002-internationalization.md)
- [Design system](DESIGN.md)
- [Website layout and states](.impeccable/surfaces/website.md)
