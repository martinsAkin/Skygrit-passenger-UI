export function isSameDay(a: Date, b: Date): boolean {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }
  
  export function startOfDay(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  
  export function startOfMonth(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  
  // Monday = 0 ... Sunday = 6 (JS's native getDay() is Sunday-first, so we shift it).
  export function mondayIndex(date: Date): number {
    return (date.getDay() + 6) % 7;
  }
  
  export function daysInMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
  
  export function addMonths(date: Date, amount: number): Date {
    return new Date(date.getFullYear(), date.getMonth() + amount, 1);
  }
  
  /** Builds a full grid (leading/trailing days from adjacent months included). */
  export function buildCalendarGrid(viewDate: Date): Date[] {
    const monthStart = startOfMonth(viewDate);
    const leading = mondayIndex(monthStart);
    const total = daysInMonth(viewDate);
    const cellCount = Math.ceil((leading + total) / 7) * 7;
  
    return Array.from({ length: cellCount }, (_, i) =>
      new Date(viewDate.getFullYear(), viewDate.getMonth(), i - leading + 1)
    );
  }
  
  /** Local (not UTC) yyyy-mm-dd — avoids the timezone-shift bug toISOString() has. */
  export function toISODateString(date: Date): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }
  
  export function fromISODateString(value: string): Date | null {
    if (!value) return null;
    const [y, m, d] = value.split("-").map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }