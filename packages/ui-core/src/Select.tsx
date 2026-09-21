import * as SelectPrimitive from "@radix-ui/react-select";
import {
  forwardRef,
  useEffect,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import { ChevronDownIcon, CheckIcon } from "./icons";
import { Label } from "./Label";
import { fieldWrapperStyle } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

/* ---- Compound primitives (shadcn API) ---- */

export const SelectRoot = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectValue = SelectPrimitive.Value;

export const SelectTrigger = forwardRef<
  HTMLButtonElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    style?: CSSProperties;
  }
>(({ className, style, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={["ax-trigger", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="ax-trigger-icon" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = "SelectTrigger";

export const SelectContent = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
    style?: CSSProperties;
  }
>(
  (
    {
      className,
      style,
      children,
      position = "popper",
      side = "bottom",
      align = "start",
      ...props
    },
    ref,
  ) => (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={["ax-content", className].filter(Boolean).join(" ")}
        style={mergeStyles({ maxHeight: 320 }, style)}
        position={position}
        side={side}
        align={align}
        sideOffset={4}
        collisionPadding={8}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={
            position === "popper" ? "ax-select-viewport-popper" : undefined
          }
          style={{ padding: 4 }}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  ),
);
SelectContent.displayName = "SelectContent";

export const SelectLabel = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={["ax-label", className].filter(Boolean).join(" ")}
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

export const SelectItem = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
    style?: CSSProperties;
  }
>(({ className, style, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={["ax-item", className].filter(Boolean).join(" ")}
    style={style}
    {...props}
  >
    <span className="ax-item-indicator">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = "SelectItem";

export const SelectSeparator = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={["ax-separator", className].filter(Boolean).join(" ")}
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

/* ---- High-level form Select (backward-compatible API) ---- */

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  options?: SelectOption[];
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  style?: CSSProperties;
  triggerStyle?: CSSProperties;
}

export function Select({
  label,
  error,
  helperText,
  required,
  options = [],
  placeholder = "Select an option",
  value,
  defaultValue,
  onValueChange,
  disabled,
  id: idProp,
  style,
  triggerStyle,
}: SelectProps) {
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const [displayError, setDisplayError] = useState<string | undefined>(error);

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  const hasError = Boolean(displayError);

  const handleValueChange = (nextValue: string) => {
    if (nextValue) {
      setDisplayError(undefined);
    }
    onValueChange?.(nextValue);
  };

  return (
    <div style={mergeStyles(fieldWrapperStyle, style)}>
      {label && (
        <Label htmlFor={id} required={required} error={hasError}>
          {label}
        </Label>
      )}
      <SelectRoot
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        disabled={disabled}
        required={required}
        name={undefined}
      >
        <SelectTrigger
          id={id}
          aria-invalid={hasError || undefined}
          aria-describedby={
            displayError
              ? `${id}-error`
              : helperText
                ? `${id}-helper`
                : undefined
          }
          data-invalid={hasError || undefined}
          style={triggerStyle}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      {displayError && (
        <span id={`${id}-error`} role="alert" className="ax-error-text">
          {displayError}
        </span>
      )}
      {!displayError && helperText && (
        <span id={`${id}-helper`} className="ax-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
}
