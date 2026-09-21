# Axiora UI Component Library

A well-structured, TypeScript-first monorepo that provides a complete design system for building React applications. The library is organized into focused, independently versioned packages — from raw design tokens up to ready-to-use UI components and utility helpers.

---

## 📊 Implementation Status

### Current Progress (UI-First Approach)

| Package                | Progress | Status         | UI-Ready       |
| ---------------------- | -------- | -------------- | -------------- |
| `@axiora-ui/ui-tokens` | 100%     | ✅ Complete    | ✅ Yes         |
| `@axiora-ui/ui-themes` | 100%     | ✅ Complete    | ✅ Yes         |
| `@axiora-ui/utils`     | 100%     | ✅ Complete    | ✅ Yes         |
| `@axiora-ui/ui-hooks`  | 25%      | ✅ Partial     | ✅ Partial     |
| `@axiora-ui/ui-core`   | 8%       | 🚧 In Progress | 🚧 In Progress |

**Overall Progress:** 68% Complete

See [IMPLEMENTATION_STATUS.md](./IMPLEMENTATION_STATUS.md) for detailed breakdown.

---

## Table of Contents

- [Overview](#overview)
- [Packages](#packages)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Tooling](#tooling)
- [Publishing to npm](#publishing-to-npm)
- [Contributing](#contributing)

---

## Overview

Axiora UI is built on the idea that a design system should have clear layers of responsibility. Each package owns exactly one concern, and higher-level packages depend on lower-level ones — never the reverse. This makes the system easy to adopt incrementally and simple to maintain.

```
@axiora-ui/ui-tokens   →   @axiora-ui/ui-themes   →   @axiora-ui/ui-core
                                         →   @axiora-ui/ui-hooks
@axiora-ui/utils       (standalone, no cross-dependencies)
```

---

## Packages

| Package                            | npm name               | Description                                                             | Status  |
| ---------------------------------- | ---------------------- | ----------------------------------------------------------------------- | ------- |
| [ui-tokens](./packages/ui-tokens/) | `@axiora-ui/ui-tokens` | Raw design tokens: colors, spacing, and typography scales               | ✅ 100% |
| [ui-themes](./packages/ui-themes/) | `@axiora-ui/ui-themes` | Light and dark theme objects built from design tokens                   | ✅ 100% |
| [utils](./packages/utils/)         | `@axiora-ui/utils`     | Pure TypeScript utilities for strings, arrays, dates, objects, and more | ✅ 100% |
| [ui-hooks](./packages/ui-hooks/)   | `@axiora-ui/ui-hooks`  | Reusable React hooks for common UI patterns                             | ✅ 25%  |
| [ui-core](./packages/ui-core/)     | `@axiora-ui/ui-core`   | React UI components styled with tokens                                  | 🚧 8%   |

---

## Architecture

```
axiora-ui-component-library/        ← Monorepo root (Turborepo + pnpm workspaces)
├── packages/
│   ├── ui-tokens/                ← Layer 0 — Design tokens (no dependencies)
│   │   └── src/
│   │       ├── colors.ts
│   │       ├── spacing.ts
│   │       └── typography.ts
│   │
│   ├── ui-themes/                ← Layer 1 — Themes (depends on ui-tokens)
│   │   └── src/
│   │       └── index.ts          (lightTheme, darkTheme)
│   │
│   ├── ui-core/                  ← Layer 2 — Components (depends on ui-tokens)
│   │   └── src/
│   │       └── Button.tsx
│   │
│   ├── ui-hooks/                 ← Layer 2 — Hooks (React peer dependency only)
│   │   └── src/
│   │       └── useToggle.ts
│   │
│   └── utils/                    ← Standalone — Pure utilities
│       └── src/
│           ├── array/
│           ├── boolean/
│           ├── common/
│           ├── date/
│           ├── json/
│           ├── list/
│           ├── meta/
│           ├── number/
│           ├── object/
│           ├── react/
│           ├── string/
│           └── url/
│
├── .storybook/                   ← Storybook configuration
├── turbo.json                    ← Turborepo pipeline
├── pnpm-workspace.yaml           ← pnpm workspace config
├── tsconfig.json                 ← Root TypeScript config
└── IMPLEMENTATION_STATUS.md       ← Detailed implementation tracking
```

---

## Getting Started

### Prerequisites

- Node.js `>=18`
- pnpm `>=10.6.2`

### Install

```bash
pnpm install
```

### Build all packages

```bash
pnpm build
```

### Run Storybook

```bash
pnpm storybook
# Opens at http://localhost:6006
```

---

## Scripts

All scripts run across the entire monorepo via Turborepo.

| Command                | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| `pnpm build`           | Build all packages in dependency order                         |
| `pnpm lint`            | Run ESLint and TypeScript type-checking across all packages    |
| `pnpm test`            | Run unit tests for all packages                                |
| `pnpm test:watch`      | Run Vitest in watch mode                                       |
| `pnpm storybook`       | Start the Storybook development server on port 6006            |
| `pnpm build-storybook` | Build the static Storybook site                                |
| `pnpm format`          | Format all files with Prettier                                 |
| `pnpm build:docs`      | Generate TypeDoc API documentation                             |
| `pnpm publish:dry-run` | Build then preview what would be published (no registry write) |
| `pnpm publish:all`     | Build then publish all packages to npm                         |

---

## Project Structure

### Each package follows the same conventions

```
packages/<name>/
├── src/
│   └── index.ts          ← Public exports
├── dist/                 ← Built output (ESM + type declarations)
├── package.json
└── tsconfig.json
```

### Build outputs

Each package builds to `dist/` using `tsup`:

- `dist/index.js` — ESM module
- `dist/index.d.ts` — TypeScript declaration file

---

## Tooling

| Tool                                                      | Purpose                                  |
| --------------------------------------------------------- | ---------------------------------------- |
| [Turborepo](https://turbo.build/)                         | Monorepo task orchestration with caching |
| [pnpm](https://pnpm.io/)                                  | Fast, disk-efficient package manager     |
| [tsup](https://tsup.egoist.dev/)                          | Zero-config TypeScript bundler           |
| [Vitest](https://vitest.dev/)                             | Unit test runner                         |
| [Storybook](https://storybook.js.org/)                    | Component development and documentation  |
| [TypeDoc](https://typedoc.org/)                           | API documentation generator              |
| [ESLint](https://eslint.org/)                             | Code linting                             |
| [Prettier](https://prettier.io/)                          | Code formatting                          |
| [Husky](https://typicode.github.io/husky/)                | Git hooks                                |
| [lint-staged](https://github.com/lint-staged/lint-staged) | Run linters on staged files              |

---

## Publishing to npm

All five packages are scoped under `@axiora-ui/` and configured to publish as **public** packages. The root `.npmrc` sets `access=public` and `publish-workspace-packages=true` so pnpm resolves `workspace:*` dependencies to real version numbers on publish.

### Prerequisites

You must be logged in to npm as `axiora-ui`:

```bash
pnpm login
# Enter username: axiora-ui
# Enter password and OTP when prompted
pnpm whoami   # should print: axiora-ui
```

### Step 1 — Verify everything passes

Run the full quality gate before publishing anything:

```bash
pnpm lint     # type-check + ESLint all packages
pnpm test     # unit tests for all packages
```

### Step 2 — Build all packages

Turbo builds packages in dependency order (`ui-tokens` first, then `ui-themes` and `ui-core`):

```bash
pnpm build
```

Each package outputs to its own `dist/` folder:

| Package                | Build output               |
| ---------------------- | -------------------------- |
| `@axiora-ui/ui-tokens` | `packages/ui-tokens/dist/` |
| `@axiora-ui/ui-themes` | `packages/ui-themes/dist/` |
| `@axiora-ui/ui-core`   | `packages/ui-core/dist/`   |
| `@axiora-ui/ui-hooks`  | `packages/ui-hooks/dist/`  |
| `@axiora-ui/utils`     | `packages/utils/dist/`     |

### Step 3 — Dry run (recommended)

Preview exactly what files would be included in each package tarball without touching the registry:

```bash
pnpm publish:dry-run
# or manually:
pnpm -r publish --dry-run --no-git-checks
```

Review the output carefully. Each package should include only `dist/` and `README.md`. If any unexpected files appear, update the `files` array in the relevant `package.json`.

### Step 4 — Bump versions

Update the version in each package you want to release. Follow [Semantic Versioning](https://semver.org/):

| Change type                       | Version bump | Example           |
| --------------------------------- | ------------ | ----------------- |
| Bug fix                           | patch        | `1.0.0` → `1.0.1` |
| New feature (backward-compatible) | minor        | `1.0.0` → `1.1.0` |
| Breaking change                   | major        | `1.0.0` → `2.0.0` |

Bump a single package:

```bash
# Inside packages/ui-tokens/
npm version patch   # or minor / major
```

Bump all packages to the same version at once:

```bash
pnpm -r exec npm version minor
```

> If `@axiora-ui/ui-themes` or `@axiora-ui/ui-core` depends on a newly bumped `@axiora-ui/ui-tokens`, update the `dependencies` version in those packages too before publishing.

### Step 5 — Publish

Publish all packages in one command (builds first, then publishes):

```bash
pnpm publish:all
# Equivalent to:
pnpm build && pnpm -r publish --no-git-checks
```

To publish a single package only:

```bash
pnpm --filter @axiora-ui/ui-tokens publish --no-git-checks
```

### Publishing only the packages that changed version

`pnpm -r publish` (what `publish:all` runs) automatically **skips any package whose current version is already on the registry** — it doesn't error, it just moves on. So running `pnpm publish:all` after bumping only some packages is always safe: unchanged packages (still at their last-published version) are skipped, and only the ones you bumped actually publish. Use `--force` only if you deliberately want to attempt republishing an existing version (it will still be rejected by npm).

To publish multiple specific packages in a single command — e.g. only the ones you just bumped — repeat `--filter` once per package:

```bash
pnpm build && pnpm --filter @axiora-ui/ui-core --filter @axiora-ui/ui-themes --filter @axiora-ui/ui-tokens publish --no-git-checks
```

This builds everything (so dependency `dist/` output is fresh) but only runs `publish` against the named packages, regardless of their version. Add or remove `--filter <package>` flags to change the set.

### Publish order

Due to inter-package dependencies, always publish in this order if publishing manually:

```
1. @axiora-ui/ui-tokens   (no Axiora UI dependencies)
2. @axiora-ui/utils       (no Axiora UI dependencies)
3. @axiora-ui/ui-themes   (depends on @axiora-ui/ui-tokens)
4. @axiora-ui/ui-core     (depends on @axiora-ui/ui-tokens)
5. @axiora-ui/ui-hooks    (no Axiora UI dependencies)
```

`pnpm publish:all` handles this order automatically via Turborepo.

### Verifying a published package

After publishing, confirm the package is live on the registry:

```bash
npm info @axiora-ui/ui-tokens
npm info @axiora-ui/ui-themes
npm info @axiora-ui/ui-core
npm info @axiora-ui/ui-hooks
npm info @axiora-ui/utils
```

### Unpublishing (within 72 hours)

```bash
npm unpublish @axiora-ui/ui-tokens@1.0.0
```

> npm only allows unpublishing within 72 hours of publishing and only if no other package depends on it.

---

## Contributing

1. Clone the repo and run `pnpm install`
2. Create a branch for your changes
3. Add or modify source files under `packages/<name>/src/`
4. Add Storybook stories (`.stories.tsx`) for any UI changes
5. Add or update unit tests (`.test.ts`)
6. Run `pnpm lint && pnpm test` before committing
7. Open a pull request

Commit hooks enforce linting and formatting automatically on every commit.
