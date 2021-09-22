import { endOfMonth, startOfMonth, sub } from "date-fns";

export const getMonthStartAndEndDays = (
  date: Date
): { start: Date; end: Date } => {
  const monthStart = startOfMonth(date);
  const monthEnd = endOfMonth(date);
  const start = sub(monthStart, {
    minutes: date.getTimezoneOffset(),
  });
  const end = sub(monthEnd, {
    minutes: date.getTimezoneOffset(),
  });
  return { start, end };
};
