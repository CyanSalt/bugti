# Development Guide

## Environment and installation

Use Node.js 22.12 or later and pnpm 10.20.0. The package manager version is pinned in `package.json`; `pnpm-lock.yaml` controls dependency resolution.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The development server listens on `http://127.0.0.1:3000` by default and is accessible only from the local machine.

If pnpm is not on your PATH and your Node.js installation includes Corepack, use:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm dev
```

Use `pnpm add` for runtime dependencies and `pnpm add -D` for development dependencies. Commit the updated manifest and pnpm lockfile together when committing dependency changes. Do not mix package managers or create another lockfile.

Only the `esbuild` and `vue-demi` dependency build scripts are allowed through `pnpm.onlyBuiltDependencies`. Review any additional build script before extending this list.

## Project structure

```text
app/
  app.vue                  Shared shell, locale integration, accessibility entry
  app.config.ts            Nuxt UI theme configuration
  assets/css/main.css      Global styles and page transitions
  components/              Header, footer, dimensions, language switcher
  composables/             Locale state and localized metadata
  data/dimensions.ts       Stable dimension identifiers, codes, names, and order
  data/personalities.ts    Sixteen archetype codes, group membership, and symbols
  error.vue                Independent error page
  locales/                 Translation dictionaries and locale configuration
  pages/                   Home, personality directory, test, results, and About
  plugins/i18n.ts          Per-request i18n instance and locale persistence
docs/                      Numbered development documentation
public/favicon.svg         BUGTI icon
nuxt.config.ts             Build configuration and shared metadata
pnpm-lock.yaml             Dependency lockfile
tests/                     Dimension and localization tests
AGENTS.md                  Essential development instructions
README.md                  User-facing product introduction
```

## Validation

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

The current test suite checks dimension order, all sixteen personality combinations and their approved names, four-group membership without omissions or overlaps, translation completeness, locale validation, and basic translation switching. `getPersonalitiesInGroup` in `app/data/personalities.ts` matches the configured preference poles: CR/CE use control and cognition; DF/DG use control and constraints. Group identifiers are not always code prefixes. For UI changes, also inspect desktop and narrow mobile layouts, keyboard focus, navigation, and affected empty or error states.

## Build and preview

```sh
pnpm build
pnpm preview
```

The production build is written to `.output/`. `vite.ssr.noExternal` keeps `tailwind-variants` and `@iconify/utils` internal chunks bundled so production output does not retain pnpm-store-relative imports. Verify the running production server as well as a successful build when changing SSR bundling.

For a future static hosting target, `pnpm generate` writes the static output to `.output/public`.

No domain, hosting provider, or public deployment is configured. Do not publish as a side effect of local development.

## Related documentation

- [Product scope](../PRODUCT.md)
- [Internationalization](0002-internationalization.md)
- [Design system](../DESIGN.md)
- [Website layout and states](../.impeccable/surfaces/website.md)
