import { useState } from "react";

type SetPageArg = number | ((page: number) => number);

export function usePagination(
  initialPage = 0,
  onPageChange?: (nextPage: number) => void,
) {
  const [page, setPage] = useState(initialPage);
  const currentPage = onPageChange ? initialPage : page;

  const updatePage = (arg: SetPageArg) => {
    const nextPage = Math.max(
      0,
      typeof arg === "function" ? arg(currentPage) : arg,
    );

    if (onPageChange) {
      onPageChange(nextPage);
      return;
    }

    setPage(nextPage);
  };

  const next = (hasNext?: boolean) => {
    if (hasNext === false) return;
    updatePage((p) => p + 1);
  };

  const prev = () => updatePage((p) => p - 1);

  const goTo = (p: number) => updatePage(p);

  return {
    page: currentPage,
    setPage: updatePage,
    next,
    prev,
    goTo,
  };
}
