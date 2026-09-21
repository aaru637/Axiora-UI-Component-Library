import { useEffect, useId, useMemo, useState } from "react";
import { ChevronDownIcon } from "./icons";
import { Label } from "./Label";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { fieldWrapperStyle } from "./styles/formStyles";
import { mergeStyles } from "./utils/mergeStyles";

export interface TimeValue {
  hours: number;
  minutes: number;
}

export interface TimePickerProps {
  label?: string;
  value?: TimeValue;
  defaultValue?: TimeValue;
  onChange?: (value: TimeValue | undefined) => void;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  use24Hour?: boolean;
  minuteStep?: number;
  className?: string;
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function formatDisplayTime(value: TimeValue, use24Hour = false): string {
  if (use24Hour) {
    return `${pad(value.hours)}:${pad(value.minutes)}`;
  }

  const period = value.hours >= 12 ? "PM" : "AM";
  const hours12 = value.hours % 12 || 12;
  return `${hours12}:${pad(value.minutes)} ${period}`;
}

function buildMinuteOptions(step: number) {
  const options: number[] = [];
  for (let minute = 0; minute < 60; minute += step) {
    options.push(minute);
  }
  return options;
}

export function TimePicker({
  label,
  value: valueProp,
  defaultValue,
  onChange,
  placeholder = "Pick a time",
  error,
  helperText,
  required,
  disabled,
  use24Hour = false,
  minuteStep = 5,
  className,
}: TimePickerProps) {
  const generatedId = useId();
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<TimeValue | undefined>(
    defaultValue,
  );
  const [displayError, setDisplayError] = useState<string | undefined>(error);

  useEffect(() => {
    setDisplayError(error);
  }, [error]);

  const value = valueProp ?? internalValue;
  const hasError = Boolean(displayError);
  const minuteOptions = useMemo(
    () => buildMinuteOptions(minuteStep),
    [minuteStep],
  );

  const setValue = (nextValue: TimeValue) => {
    setDisplayError(undefined);
    if (valueProp === undefined) {
      setInternalValue(nextValue);
    }
    onChange?.(nextValue);
  };

  const hours = value?.hours ?? 9;
  const minutes = value?.minutes ?? 0;

  return (
    <div style={fieldWrapperStyle} className={className}>
      {label && (
        <Label htmlFor={generatedId} required={required} error={hasError}>
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild disabled={disabled}>
          <button
            id={generatedId}
            type="button"
            aria-invalid={hasError || undefined}
            data-invalid={hasError || undefined}
            disabled={disabled}
            className="ax-trigger"
            style={mergeStyles({ width: "100%" })}
          >
            <span>
              {value ? formatDisplayTime(value, use24Hour) : placeholder}
            </span>
            <ChevronDownIcon className="ax-trigger-icon" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" style={{ padding: 12, width: "auto" }}>
          <div className="ax-time-picker">
            <div className="ax-time-picker-column">
              <span className="ax-time-picker-label">Hour</span>
              <div
                className="ax-time-picker-list"
                role="listbox"
                aria-label="Hour"
              >
                {Array.from({ length: 24 }, (_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="option"
                    aria-selected={hours === index}
                    className={[
                      "ax-time-picker-option",
                      hours === index ? "ax-time-picker-option-selected" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => setValue({ hours: index, minutes })}
                  >
                    {use24Hour
                      ? pad(index)
                      : `${index % 12 || 12} ${index >= 12 ? "PM" : "AM"}`}
                  </button>
                ))}
              </div>
            </div>
            <div className="ax-time-picker-column">
              <span className="ax-time-picker-label">Minute</span>
              <div
                className="ax-time-picker-list"
                role="listbox"
                aria-label="Minute"
              >
                {minuteOptions.map((minute) => (
                  <button
                    key={minute}
                    type="button"
                    role="option"
                    aria-selected={minutes === minute}
                    className={[
                      "ax-time-picker-option",
                      minutes === minute
                        ? "ax-time-picker-option-selected"
                        : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => {
                      setValue({ hours, minutes: minute });
                      setOpen(false);
                    }}
                  >
                    {pad(minute)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      {displayError && (
        <span
          id={`${generatedId}-error`}
          className="ax-error-text"
          role="alert"
        >
          {displayError}
        </span>
      )}
      {!displayError && helperText && (
        <span id={`${generatedId}-helper`} className="ax-helper-text">
          {helperText}
        </span>
      )}
    </div>
  );
}
