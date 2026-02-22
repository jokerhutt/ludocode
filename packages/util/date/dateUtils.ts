import dayjs from "dayjs";

export const parseToDate = (dateTime: number) => {
  return dayjs(dateTime * 1000).format("MMMM DD, YYYY");
};

export const parseToDigitDate = (dateTime: number) => {
  return dayjs(dateTime * 1000).format("DD/MM/YYYY");
};
