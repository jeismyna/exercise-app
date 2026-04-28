import type { Review, DateGroup } from "../models/reviews-model";

function startOfDay(date: Date): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function startOfWeek(date: Date): Date {
  // Week starts on Monday
  const d = startOfDay(date);
  const day = d.getDay(); // 0=Sun, 1=Mon, ..., 6=Sat
  const diff = day === 0 ? -6 : 1 - day; // days to go back to Monday
  d.setDate(d.getDate() + diff);
  return d;
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function monthName(date: Date): string {
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

interface GroupDefinition {
  label: string;
  start: Date;
  end: Date;
}

export function buildDateGroups(now: Date): GroupDefinition[] {
  const today = startOfDay(now);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const thisWeekStart = startOfWeek(today);

  const lastWeekEnd = new Date(thisWeekStart);
  lastWeekEnd.setDate(lastWeekEnd.getDate() - 1);
  lastWeekEnd.setHours(23, 59, 59, 999);

  const lastWeekStart = new Date(lastWeekEnd);
  const lastWeekEndDay = lastWeekEnd.getDay();
  // Last week Monday
  const daysBack = lastWeekEndDay === 0 ? 6 : lastWeekEndDay - 1;
  lastWeekStart.setDate(lastWeekEnd.getDate() - daysBack);
  lastWeekStart.setHours(0, 0, 0, 0);

  const thisMonthStart = startOfMonth(today);
  const lastMonthStart = startOfMonth(
    new Date(today.getFullYear(), today.getMonth() - 1, 1)
  );
  const lastMonthEnd = endOfMonth(
    new Date(today.getFullYear(), today.getMonth() - 1, 1)
  );

  const groups: GroupDefinition[] = [
    {
      label: "Today",
      start: today,
      end: new Date(today.getTime() + 86400000 - 1),
    },
    {
      label: "Yesterday",
      start: yesterday,
      end: new Date(yesterday.getTime() + 86400000 - 1),
    },
    {
      label: "This week",
      start: thisWeekStart,
      end: new Date(yesterday.getTime() - 1), // up to but not including yesterday
    },
    {
      label: "Last week",
      start: lastWeekStart,
      end: lastWeekEnd,
    },
    {
      label: "This month",
      start: thisMonthStart,
      end: new Date(lastWeekStart.getTime() - 1),
    },
    {
      label: "Last month",
      start: lastMonthStart,
      end: lastMonthEnd,
    },
  ];

  // Generate further months going back
  for (let i = 2; i <= 24; i++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
    const mStart = startOfMonth(monthDate);
    const mEnd = endOfMonth(monthDate);
    groups.push({
      label: monthName(mStart),
      start: mStart,
      end: mEnd,
    });
  }

  return groups;
}

export function groupReviewsByDate(reviews: Review[], now = new Date()): DateGroup[] {
  const groups = buildDateGroups(now);
  const result: DateGroup[] = [];

  for (const group of groups) {
    const matching = reviews.filter((r) => {
      const reviewDate = new Date(r.date);
      return reviewDate >= group.start && reviewDate <= group.end;
    });

    if (matching.length > 0) {
      result.push({
        label: group.label,
        reviews: matching,
      });
    }
  }

  // Reviews that didn't fall in any group (older than 2 years)
  const assignedIds = new Set(result.flatMap((g) => g.reviews.map((r) => r.id)));
  const unassigned = reviews.filter((r) => !assignedIds.has(r.id));
  if (unassigned.length > 0) {
    result.push({ label: "Older", reviews: unassigned });
  }

  return result;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
