import dayjs from "dayjs";

export const parseToDate = (dateTime: number) => {
  return dayjs(dateTime).format("MMMM DD, YYYY");
};

export const parseToDigitDate = (dateTime: number) => {
  return dayjs(dateTime).format("DD/MM/YYYY");
};
