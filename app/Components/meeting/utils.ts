export function isoDate(d: Date): string {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toISOString().slice(0, 10);
}

export function formatDuration(totalSeconds: number): string {
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const ss = String(totalSeconds % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function formatTime(d: Date): string {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export function formatReadableDate(iso: string): string {
  try {
    const d = new Date(iso + 'T00:00:00');
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
}

export function renderCalendar(calendarDate: Date) {
  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells: {
    date: Date | null;
    day: number | null;
    iso: string;
    isCurrentMonth: boolean;
  }[] = [];

  for (let i = 0; i < 42; i++) {
    const idx = i - firstWeekday + 1;
    if (idx <= 0) {
      const day = prevDays + idx;
      const d = new Date(year, month - 1, day);
      cells.push({
        date: d,
        day,
        iso: d.toISOString().slice(0, 10),
        isCurrentMonth: false,
      });
    } else if (idx > daysInMonth) {
      const day = idx - daysInMonth;
      const d = new Date(year, month + 1, day);
      cells.push({
        date: d,
        day,
        iso: d.toISOString().slice(0, 10),
        isCurrentMonth: false,
      });
    } else {
      const day = idx;
      const d = new Date(year, month, day);
      cells.push({
        date: d,
        day,
        iso: d.toISOString().slice(0, 10),
        isCurrentMonth: true,
      });
    }
  }
  return cells;
}
