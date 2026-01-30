import type { RenderHookResult } from "@testing-library/react";

export interface NavigationCapture {
  to: string;
  params?: any;
  search?: any;
  state?: any;
  computedState?: any;
  replace?: boolean;
}

export interface RouterMockOptions {
  onSearchNavigation?: (
    searchFn: (prev: any) => any,
    currentSearch: any,
  ) => any;
  onRouteNavigation?: (navOptions: any) => void;
}

export function createRouterMock(
  rerender: RenderHookResult<any, any>["rerender"],
  options: RouterMockOptions = {},
) {
  const navigations: NavigationCapture[] = [];

  const mockImplementation = (navOptions: any) => {
    if (navOptions.search && typeof navOptions.search === "function") {
      if (options.onSearchNavigation) {
        const newSearch = options.onSearchNavigation(
          navOptions.search,
          navOptions,
        );
        if (newSearch && rerender) {
          rerender(newSearch);
        }
      }
    } else {
      const computedState =
        typeof navOptions.state === "function"
          ? navOptions.state({})
          : navOptions.state;

      const computedSearch =
        typeof navOptions.search === "function"
          ? navOptions.search({})
          : navOptions.search;

      const capture: NavigationCapture = {
        to: navOptions.to,
        params: navOptions.params,
        search: computedSearch,
        state: navOptions.state,
        computedState,
        replace: navOptions.replace,
      };

      navigations.push(capture);

      if (options.onRouteNavigation) {
        options.onRouteNavigation(capture);
      }
    }
  };

  return {
    mockImplementation,
    navigations,
    getLastNavigation: () => navigations[navigations.length - 1],
    getNavigationTo: (routeTo: string) =>
      navigations.find((nav) => nav.to === routeTo),
    clear: () => {
      navigations.length = 0;
    },
  };
}

export function createLessonRouterMock(
  rerender: RenderHookResult<any, any>["rerender"],
  getCurrentPosition: () => number,
  setCurrentPosition: (pos: number) => void,
) {
  return createRouterMock(rerender, {
    onSearchNavigation: (searchFn, _) => {
      const newSearch = searchFn({ exercise: getCurrentPosition() });
      setCurrentPosition(newSearch.exercise);
      return { position: newSearch.exercise };
    },
  });
}
