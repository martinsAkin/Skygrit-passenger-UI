import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  buildCalendarGrid,
  isSameDay,
  startOfDay,
  startOfMonth,
} from "./dateUtils";

const WEEKDAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

interface CalendarProps {
  value: Date | null;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
}

export default function Calendar({ value, onChange, minDate, maxDate }: CalendarProps) {
  const [viewDate, setViewDate] = useState(() => startOfMonth(value ?? new Date()));

  const cells = buildCalendarGrid(viewDate);
  const today = startOfDay(new Date());
  const min = minDate ? startOfDay(minDate) : null;
  const max = maxDate ? startOfDay(maxDate) : null;

  const prevDisabled = min ? startOfMonth(viewDate) <= startOfMonth(min) : false;
  const nextDisabled = max ? startOfMonth(viewDate) >= startOfMonth(max) : false;

  function isDisabled(date: Date) {
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  }

  return (
    <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-5 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          {viewDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
        </h2>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setViewDate((d) => addMonths(d, -1))}
            disabled={prevDisabled}
            aria-label="Previous month"
            className="rounded p-1 text-slate-300 transition-colors enabled:text-slate-500 enabled:hover:text-slate-800 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => setViewDate((d) => addMonths(d, 1))}
            disabled={nextDisabled}
            aria-label="Next month"
            className="rounded p-1 text-slate-800 transition-colors enabled:hover:text-slate-900 disabled:cursor-not-allowed disabled:text-slate-300"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-7 overflow-hidden rounded-lg border border-slate-100">
        {WEEKDAY_LABELS.map((label) => (
          <div key={label} className="border-b border-slate-100 py-2 text-center text-sm font-medium text-slate-500">
            {label}
          </div>
        ))}

        {cells.map((cellDate) => {
          const inCurrentMonth = cellDate.getMonth() === viewDate.getMonth();
          const selected = value ? isSameDay(cellDate, value) : false;
          const isToday = isSameDay(cellDate, today);
          const disabled = isDisabled(cellDate);

          return (
            <button
              key={cellDate.toISOString()}
              type="button"
              disabled={disabled || !inCurrentMonth}
              onClick={() => onChange(cellDate)}
              className={`aspect-square border-b border-r border-slate-100 text-sm transition-colors last:border-r-0 [&:nth-child(7n)]:border-r-0 ${
                selected
                  ? "bg-blue-800 font-semibold text-white"
                  : !inCurrentMonth
                  ? "cursor-default bg-slate-50 text-slate-300"
                  : disabled
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-800 hover:bg-slate-50"
              } ${isToday && !selected ? "font-bold text-blue-800" : ""}`}
            >
              {cellDate.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}