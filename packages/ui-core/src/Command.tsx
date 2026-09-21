import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./Dialog";
import { ScrollArea } from "./ScrollArea";
import { Separator } from "./Separator";

interface CommandContextValue {
  search: string;
  setSearch: (value: string) => void;
  registerItem: (key: string, searchText: string) => void;
  unregisterItem: (key: string) => void;
  getFilteredCount: () => number;
}

const CommandContext = createContext<CommandContextValue | null>(null);

function useCommandContext() {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error("Command components must be used within Command");
  }
  return context;
}

export interface CommandProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Command({ className, children, ...props }: CommandProps) {
  const [search, setSearch] = useState("");
  const itemsRef = useRef(new Map<string, string>());
  const [itemVersion, setItemVersion] = useState(0);

  const registerItem = useCallback((key: string, searchText: string) => {
    itemsRef.current.set(key, searchText);
    setItemVersion((version) => version + 1);
  }, []);

  const unregisterItem = useCallback((key: string) => {
    if (itemsRef.current.delete(key)) {
      setItemVersion((version) => version + 1);
    }
  }, []);

  const getFilteredCount = useCallback(() => {
    const normalized = search.trim().toLowerCase();
    const texts = [...itemsRef.current.values()];
    if (!normalized) {
      return texts.length;
    }
    return texts.filter((text) => text.includes(normalized)).length;
  }, [search, itemVersion]);

  const value = useMemo(
    () => ({
      search,
      setSearch,
      registerItem,
      unregisterItem,
      getFilteredCount,
    }),
    [search, registerItem, unregisterItem, getFilteredCount],
  );

  return (
    <CommandContext.Provider value={value}>
      <div
        className={["ax-command", className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  );
}

export interface CommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export function CommandDialog({
  open,
  onOpenChange,
  title = "Command palette",
  description = "Search for a command to run.",
  children,
}: CommandDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="ax-command-dialog"
        style={{ padding: 0, overflow: "hidden" }}
        showClose={false}
      >
        <DialogHeader className="ax-command-dialog-header">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Command>{children}</Command>
      </DialogContent>
    </Dialog>
  );
}

export const CommandInput = forwardRef<
  HTMLInputElement,
  ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => {
  const { search, setSearch } = useCommandContext();

  return (
    <input
      ref={ref}
      className={["ax-command-input", className].filter(Boolean).join(" ")}
      value={search}
      onChange={(event) => setSearch(event.target.value)}
      {...props}
    />
  );
});
CommandInput.displayName = "CommandInput";

export function CommandList({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <ScrollArea
      className={["ax-command-list", className].filter(Boolean).join(" ")}
    >
      <div role="listbox" {...props}>
        {children}
      </div>
    </ScrollArea>
  );
}

export function CommandEmpty({
  className,
  children = "No results found.",
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  const { getFilteredCount } = useCommandContext();

  if (getFilteredCount() > 0) {
    return null;
  }

  return (
    <div
      className={["ax-command-empty", className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}

export function CommandGroup({
  heading,
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement> & { heading?: string }) {
  return (
    <div
      className={["ax-command-group", className].filter(Boolean).join(" ")}
      role="group"
      aria-label={heading}
      {...props}
    >
      {heading && <div className="ax-command-group-heading">{heading}</div>}
      {children}
    </div>
  );
}

export interface CommandItemProps extends Omit<
  HTMLAttributes<HTMLButtonElement>,
  "onSelect"
> {
  value: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
}

export function CommandItem({
  value,
  onSelect,
  disabled,
  className,
  children,
  ...props
}: CommandItemProps) {
  const { search, registerItem, unregisterItem } = useCommandContext();
  const normalizedSearch = search.trim().toLowerCase();
  const haystack =
    `${value} ${typeof children === "string" ? children : ""}`.toLowerCase();

  useEffect(() => {
    registerItem(value, haystack);
    return () => unregisterItem(value);
  }, [value, haystack, registerItem, unregisterItem]);

  if (normalizedSearch && !haystack.includes(normalizedSearch)) {
    return null;
  }

  return (
    <button
      type="button"
      role="option"
      disabled={disabled}
      className={["ax-command-item", className].filter(Boolean).join(" ")}
      onClick={() => onSelect?.(value)}
      {...props}
    >
      {children}
    </button>
  );
}

export function CommandSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Separator>) {
  return (
    <Separator
      className={["ax-command-separator", className].filter(Boolean).join(" ")}
      {...props}
    />
  );
}
