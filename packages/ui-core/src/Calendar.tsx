import { useMemo, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

const WEEKDAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  month?: Date;
  onMonthChange?: (month: Date) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
}

function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isSameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

function buildCalendarDays(month: Date) {
  const firstDay = startOfMonth(month);
  const start = new Date(firstDay);
  start.setDate(firstDay.getDate() - firstDay.getDay());

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start);
    day.setDate(start.getDate() + index);
    return day;
  });
}

export function Calendar({
  selected,
  onSelect,
  month: monthProp,
  onMonthChange,
  disabled,
  className,
}: CalendarProps) {
  const [internalMonth, setInternalMonth] = useState(
    () => monthProp ?? selected ?? new Date(),
  );
  const month = monthProp ?? internalMonth;

  const days = useMemo(() => buildCalendarDays(month), [month]);

  const setMonth = (nextMonth: Date) => {
    if (monthProp === undefined) {
      setInternalMonth(nextMonth);
    }
    onMonthChange?.(nextMonth);
  };

  const monthLabel = month.toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });

  return (
    <div className={["ax-calendar", className].filter(Boolean).join(" ")}>
      <div className="ax-calendar-header">
        <button
          type="button"
          className="ax-calendar-nav"
          aria-label="Previous month"
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))
          }
        >
          <ChevronLeftIcon />
        </button>
        <div className="ax-calendar-title">{monthLabel}</div>
        <button
          type="button"
          className="ax-calendar-nav"
          aria-label="Next month"
          onClick={() =>
            setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))
          }
        >
          <ChevronRightIcon />
        </button>
      </div>
      <div className="ax-calendar-weekdays">
        {WEEKDAY_LABELS.map((label) => (
          <span key={label} className="ax-calendar-weekday">
            {label}
          </span>
        ))}
      </div>
      <div className="ax-calendar-grid" role="grid" aria-label={monthLabel}>
        {days.map((day) => {
          const isSelected = selected ? isSameDay(day, selected) : false;
          const isOutside = !isSameMonth(day, month);
          const isDisabled = disabled?.(day) ?? false;

          return (
            <button
              key={day.toISOString()}
              type="button"
              role="gridcell"
              className={[
                "ax-calendar-day",
                isSelected ? "ax-calendar-day-selected" : "",
                isOutside ? "ax-calendar-day-outside" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={isDisabled}
              aria-selected={isSelected}
              onClick={() => onSelect?.(day)}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function formatDisplayDate(date: Date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
