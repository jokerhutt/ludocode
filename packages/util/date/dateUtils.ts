import dayjs from "dayjs";

export const parseToDate = (dateTime: number) => {
  return dayjs(dateTime * 1000).format("MMMM DD, YYYY");
};

export const parseToDigitDate = (dateTime: number) => {
  return dayjs(dateTime * 1000).format("DD/MM/YYYY");
};

export const formatShortDate = (date: Date) => {
  return dayjs(date).format("MMM D, YYYY");
};

export const toDate = (
  timestamp: number,
  MILLISECOND_TIMESTAMP_THRESHOLD: number = 1_000_000_000_000,
): Date => {
  return new Date(
    timestamp < MILLISECOND_TIMESTAMP_THRESHOLD ? timestamp * 1000 : timestamp,
  );
};

export const getDateRangeProgress = (
  startDate: Date,
  endDate: Date,
  currentDate: Date = new Date(),
): number => {
  const duration = endDate.getTime() - startDate.getTime();
  if (duration <= 0) return 0;
  const elapsed = currentDate.getTime() - startDate.getTime();
  return Math.min(100, Math.max(0, (elapsed / duration) * 100));
};
