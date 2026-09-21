import {
  createContext,
  useContext,
  useId,
  useState,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { spacing } from "@axiora-ui/ui-tokens";
import { Label } from "./Label";
import { fieldWrapperStyle } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

// AI-ASSISTED: Cursor
// PROMPT: Use CSS classes for theme-aware radio group in light/dark mode
// ACCEPTED-BY: dhinesh

interface RadioGroupContextValue {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) {
    throw new Error("Radio must be used within a RadioGroup");
  }
  return ctx;
}

export interface RadioGroupProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

const groupOptionsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: spacing[2],
};

export function RadioGroup({
  label,
  error,
  helperText,
  required,
  name: nameProp,
  value,
  defaultValue,
  onValueChange,
  disabled,
  children,
  style,
}: RadioGroupProps) {
  const generatedName = useId();
  const name = nameProp ?? generatedName;
  const hasError = Boolean(error);
  const groupId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (nextValue: string) => {
    if (!isControlled) setInternalValue(nextValue);
    onValueChange?.(nextValue);
  };

  return (
    <RadioGroupContext.Provider
      value={{ name, value: currentValue, onChange: handleChange, disabled }}
    >
      <div
        role="radiogroup"
        aria-labelledby={label ? groupId : undefined}
        aria-invalid={hasError || undefined}
        style={{ ...fieldWrapperStyle, ...style }}
      >
        {label && (
          <Label id={groupId} required={required} error={hasError}>
            {label}
          </Label>
        )}
        <div style={groupOptionsStyle}>{children}</div>
        {error && (
          <span role="alert" className="ax-error-text">
            {error}
          </span>
        )}
        {!error && helperText && (
          <span className="ax-helper-text">{helperText}</span>
        )}
      </div>
    </RadioGroupContext.Provider>
  );
}

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "size" | "name"
> {
  value: string;
  label?: string;
}

const radioRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: spacing[2],
};

export function Radio({
  value,
  label,
  id: idProp,
  disabled: disabledProp,
  className,
  style,
  ...props
}: RadioProps) {
  const {
    name,
    value: groupValue,
    onChange,
    disabled: groupDisabled,
  } = useRadioGroupContext();
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const disabled = disabledProp ?? groupDisabled;
  const checked = groupValue === value;

  return (
    <div style={radioRowStyle}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        className={["ax-radio", className].filter(Boolean).join(" ")}
        style={mergeStyles(undefined, style)}
        onChange={(e) => {
          if (e.target.checked) onChange?.(value);
        }}
        {...props}
      />
      {label && (
        <label htmlFor={id} className="ax-choice-label">
          {label}
        </label>
      )}
    </div>
  );
}
