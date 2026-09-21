# @axiora-ui/ui-core

React UI components for the Axiora design system — shadcn-inspired, built on **Radix UI**, styled with **CSS custom properties** from `@axiora-ui/ui-themes`.

**Status:** ✅ **40 components implemented** · Storybook stories for all · Theme-aware light/dark + brand presets

---

## Table of Contents

- [Installation](#installation)
- [Setup (required)](#setup-required)
- [Component inventory](#component-inventory)
- [Usage examples](#usage-examples)
- [Theming](#theming)
- [Storybook](#storybook)
- [Toast notifications](#toast-notifications)
- [Removed from scope](#removed-from-scope)
- [Build](#build)

---

## Installation

```json
"dependencies": {
  "@axiora-ui/ui-core": "workspace:*",
  "@axiora-ui/ui-themes": "workspace:*"
}
```

**Peer dependencies:** `react` and `react-dom` ^19.0.0

---

## Setup (required)

1. Import the stylesheet **once** in your app entry:

```tsx
import "@axiora-ui/ui-core/styles.css";
```

2. Wrap your app with `ThemeProvider`:

```tsx
import { ThemeProvider } from "@axiora-ui/ui-themes";

<ThemeProvider theme={{ mode: "light" }}>
  <App />
</ThemeProvider>;
```

Without both steps, components render but won't follow your theme (labels, surfaces, primary colors, etc.).

---

## Component inventory

| Category       | Components                                                                                                                                                           | Storybook |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| **Form**       | `Button`, `Label`, `Input`, `Textarea`, `Select` (+ compound API), `NativeSelect`, `Checkbox`, `RadioGroup` / `Radio`, `Switch`, `Slider`, `Toggle`                  | ✅ All    |
| **Overlay**    | `Dialog`, `Drawer`, `AlertDialog`, `Popover`, `Tooltip`, `HoverCard`, `ContextMenu`, `Toast`                                                                         | ✅ All    |
| **Layout**     | `Card`, `Badge`, `Tag` / `Chip`, `Alert`, `Separator`, `Avatar`, `Skeleton`, `Progress`, `Spinner`, `AspectRatio`, `Table`, `Pagination`, `Breadcrumb`, `ScrollArea` | ✅ All    |
| **Navigation** | `Tabs`, `Accordion`, `Collapsible`                                                                                                                                   | ✅ All    |
| **Advanced**   | `Combobox`, `Calendar`, `DatePicker`, `Command` (palette)                                                                                                          | ✅ All    |

### Highlights

- **Select** — Radix dropdown with groups, checkmarks, error auto-clear on valid selection
- **Switch** — Button-like track (secondary off, primary on) for settings toggles
- **Toggle** — Formatting chip (subtle border; primary tint when pressed) for toolbar actions
- **Drawer** — Side panel built on Radix Dialog; `side` prop (`left`, `right`, `top`, `bottom`)
- **Toast** — Non-blocking notifications via `Toaster` + imperative `toast()` API; destructive variant, swipe dismiss
- **AlertDialog** — Native alert-dialog primitives; Cancel (secondary) + Action (primary/danger)
- **Table** — Sortable column headers via `sortable`, `sortDirection`, `onSort` on `TableHead`
- **Tag / Chip** — Dismissable filter labels with `default`, `secondary`, and `outline` variants
- **useTableSort** — Client-side column sorting hook for tables
- **Combobox** — Searchable select with filterable listbox inside a Popover
- **DatePicker** — Popover date input built on Calendar with month navigation
- **Command** — Command palette with `CommandDialog`, filterable `CommandInput`, groups, and keyboard navigation
- **Form fields** — Shared label, helper text, and error styling via `.ax-label`, `.ax-input`, etc.

---

## Usage examples

### Form

```tsx
import { Button, Input, Checkbox, Select } from "@axiora-ui/ui-core";

<Input label="Email" placeholder="you@example.com" required />
<Checkbox label="Accept terms" helperText="Required to continue" />
<Select
  label="Country"
  placeholder="Select a country"
  options={[
    { value: "us", label: "United States" },
    { value: "in", label: "India" },
  ]}
/>
<Button variant="primary">Submit</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="danger">Delete</Button>
```

### Dialog & AlertDialog

```tsx
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@axiora-ui/ui-core";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@axiora-ui/ui-core";

// Standard dialog
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>Make changes here.</DialogDescription>
    </DialogHeader>
    <DialogFooter><Button>Save</Button></DialogFooter>
  </DialogContent>
</Dialog>

// Destructive confirmation
<AlertDialog>
  <AlertDialogTrigger asChild><Button variant="danger">Delete</Button></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction variant="danger">Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Drawer (side panel)

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@axiora-ui/ui-core";

<Drawer>
  <DrawerTrigger asChild>
    <Button variant="secondary">Settings</Button>
  </DrawerTrigger>
  <DrawerContent side="right">
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Manage your account preferences.</DrawerDescription>
    </DrawerHeader>
    <DrawerFooter>
      <DrawerClose asChild>
        <Button variant="secondary">Close</Button>
      </DrawerClose>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>;
```

### Data display (Table, Tag, Pagination)

```tsx
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tag,
  Pagination,
  useTableSort,
} from "@axiora-ui/ui-core";

const rows = [
  { name: "Alice", role: "Admin", status: "Active" },
  { name: "Bob", role: "Editor", status: "Pending" },
];

function UserTable() {
  const { sortedData, sortKey, sortDirection, toggleSort } = useTableSort(
    rows,
    {
      initialKey: "name",
    },
  );

  return (
    <>
      <div className="ax-tag-group">
        <Tag variant="secondary" onDismiss={() => {}}>
          Active
        </Tag>
        <Tag variant="outline" onDismiss={() => {}}>
          Admin
        </Tag>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead
              sortable
              sortDirection={sortKey === "name" ? sortDirection : undefined}
              onSort={() => toggleSort("name")}
            >
              Name
            </TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.name}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination page={1} pageCount={5} onPageChange={() => {}} />
    </>
  );
}
```

See **Core/Table → DataDisplay** in Storybook for a full Card + Tags + Table + Pagination example.

### Advanced inputs (Combobox, DatePicker, Command)

```tsx
import {
  Combobox,
  DatePicker,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@axiora-ui/ui-core";

<Combobox
  label="Framework"
  placeholder="Search frameworks…"
  options={[
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
  ]}
  value="react"
  onValueChange={() => {}}
/>;

<DatePicker label="Start date" value={new Date()} onChange={() => {}} />;

<CommandDialog open={open} onOpenChange={setOpen}>
  <CommandInput placeholder="Type a command…" />
  <CommandList>
    <CommandEmpty>No results.</CommandEmpty>
    <CommandGroup heading="Actions">
      <CommandItem onSelect={() => {}}>New file</CommandItem>
      <CommandItem onSelect={() => {}}>Open settings</CommandItem>
    </CommandGroup>
  </CommandList>
</CommandDialog>;
```

### Button variants

| Variant     | Use for             |
| ----------- | ------------------- |
| `primary`   | Main call-to-action |
| `secondary` | Secondary / cancel  |
| `danger`    | Destructive actions |

Colors come from `--color-primary`, `--color-surface`, `--color-danger`, etc. — not hard-coded hex in components.

---

## Theming

Components read CSS variables set by `@axiora-ui/ui-themes` `ThemeProvider`:

| Variable             | Used for                              |
| -------------------- | ------------------------------------- |
| `--color-primary`    | Buttons, switch on-state, focus rings |
| `--color-foreground` | Text, labels                          |
| `--color-background` | Page / container background           |
| `--color-surface`    | Inputs, cards, secondary buttons      |
| `--color-border`     | Borders, dividers                     |
| `--radius-base`      | Border radius                         |
| `--font-family-base` | Typography                            |

Override brand colors:

```tsx
<ThemeProvider
  theme={{
    name: "brand",
    colors: { primary: "#7c3aed", primaryHover: "#6d28d9" },
  }}
>
  <App />
</ThemeProvider>
```

Dark mode:

```tsx
<ThemeProvider theme={{ mode: "dark" }}>
  <App />
</ThemeProvider>
```

---

## Storybook

From the monorepo root:

```bash
pnpm storybook
```

Browse **Core/** for all component stories. Use the **Theme** toolbar to preview light, dark, and brand presets.

---

## Toast notifications

Mount `<Toaster />` once at the app root, then call `toast()` from anywhere:

```tsx
import { Toaster, toast } from "@axiora-ui/ui-core";

<Toaster />;
toast({ title: "Saved", description: "Your changes were saved." });
toast({ variant: "destructive", title: "Error", description: "Try again." });
toast({
  title: "Archived",
  description: "You can undo this action.",
  actionLabel: "Undo",
  onAction: () => toast({ title: "Restored" }),
});
```

## Removed from scope

| Component      | Notes                                 |
| -------------- | ------------------------------------- |
| `DropdownMenu` | Use `ContextMenu` or `Select` instead |

All 40 components have Vitest coverage (render, variants, interactions). Run:

```bash
pnpm test --filter @axiora-ui/ui-core
```

Theming and validation are also covered in `@axiora-ui/ui-themes`.

---

## Build

```bash
pnpm build --filter @axiora-ui/ui-core
```

Output:

- `dist/index.js` + `dist/index.d.ts`
- `dist/styles/components.css` (import as `@axiora-ui/ui-core/styles.css`)

Radix packages, React, and `@axiora-ui/ui-tokens` are externalized — not bundled into the output.
