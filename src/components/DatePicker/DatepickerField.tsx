import { useEffect, useRef, useState } from "react";
import { CalendarDays } from "lucide-react";
import Calendar from "./Calender";
import { fromISODateString, toISODateString } from "./dateUtils";

interface DatePickerFieldProps {
  id?: string;
  value: string; // yyyy-mm-dd, or "" for empty
  onChange: (isoDate: string) => void;
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
}

export default function DatePickerField({
  id,
  value,
  onChange,
  placeholder = "Select a date",
  minDate,
  maxDate,
}: DatePickerFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedDate = fromISODateString(value);
  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        id={id}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 px-4 py-3 text-left outline-none transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
      >
        <span className={displayValue ? "text-[#303030]" : "text-gray-400"}>
          {displayValue || placeholder}
        </span>
        <CalendarDays className="h-5 w-5 shrink-0 text-gray-400" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-20 mt-2">
          <Calendar
            value={selectedDate}
            minDate={minDate}
            maxDate={maxDate}
            onChange={(date) => {
              onChange(toISODateString(date));
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}