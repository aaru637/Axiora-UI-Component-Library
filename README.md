# Axon UI Component Library

Monorepo for Axon design system packages and Storybook documentation.

## Packages

| Package | Description |
|---------|-------------|
| `@axon/ui-tokens` | Design tokens (colors, spacing, typography) |
| `@axon/ui-themes` | Theme definitions built from tokens |
| `@axon/ui-hooks` | Shared React hooks |
| `@axon/ui-core` | UI components |

## Scripts

```bash
pnpm install      # Install dependencies
pnpm build        # Build all packages
pnpm lint         # Type-check all packages
pnpm storybook    # Start Storybook on http://localhost:6006
```

## Project structure

```
packages/
  ui-tokens/   # Design tokens + Tokens/* stories
  ui-themes/   # Themes + Themes/* stories
  ui-hooks/    # Hooks + Hooks/* stories
  ui-core/     # Components + Core/* stories
.storybook/     # Storybook config (loads package stories only)
```
