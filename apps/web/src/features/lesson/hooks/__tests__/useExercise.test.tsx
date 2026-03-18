import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { AnswerToken } from "@ludocode/types";
import { useLesson } from "@/features/lesson/hooks/useLesson";
import { useExerciseNavigation } from "@/features/lesson/hooks/useExerciseNavigation.tsx";
import { useExerciseHistory } from "@/features/lesson/hooks/useExerciseHistory.tsx";
import { useExerciseInput } from "@/features/lesson/hooks/normal/useExerciseInput";
import { createInfoExerciseAttempt } from "@/features/lesson/util/submissionUtil.ts";
import { l1, l1exercises, c1Id } from "./fixtures";
import { Route as syncRoute } from "@/routes/app/sync/$lessonId.tsx";
import { createLessonRouterMock } from "./testHelpers";

const { navigateSpy } = vi.hoisted(() => ({
  navigateSpy: vi.fn(),
}));

vi.mock("@/main", () => ({
  router: {
    navigate: navigateSpy,
  },
}));

function useLessonExerciseState(position: number) {
  const state = useLesson({
    courseId: c1Id,
    exercises: l1exercises,
    lesson: l1,
    position,
    config: { audioEnabled: true },
  });
  const navigation = useExerciseNavigation({ position });

  const { correctInputs } = useExerciseHistory({
    currentExercise: state.exercise.currentExercise,
    submissionHistory: state.submission.submissionHistory,
  });

  const inputState = useExerciseInput({
    currentExercise: state.exercise.currentExercise,
    correctInputs,
    onInputInteraction: state.evaluation.dismissIncorrectFeedback,
  });

  const handleExerciseButtonClick = () => {
    if (state.evaluation.isComplete) {
      state.submission.continueToNextExercise();
      return;
    }

    if (state.evaluation.isIncorrect) {
      state.evaluation.dismissIncorrectFeedback();
      return;
    }

    if (!state.exercise.currentExercise.interaction) {
      state.submission.submitAttempt(
        createInfoExerciseAttempt(state.exercise.currentExercise.id),
      );
      return;
    }

    state.submission.submitAttempt(inputState.buildAttemptFromInput());
  };

  return {
    ...navigation,
    currentExercise: state.exercise.currentExercise,
    submissionHistory: state.submission.submissionHistory,
    isComplete: state.evaluation.isComplete,
    isIncorrect: state.evaluation.isIncorrect,
    handleExerciseButtonClick,
    inputState,
  };
}

beforeEach(() => {
  navigateSpy.mockReset();
});

describe("useExercise Flow (integration)", () => {
  it("commits attempts into history and only continues once a correct submission exists", async () => {
    let currentPosition = 1;

    const { result, rerender } = renderHook(
      ({ position }) => useLessonExerciseState(position),
      { initialProps: { position: currentPosition } },
    );

    const routerMock = createLessonRouterMock(
      rerender,
      () => currentPosition,
      (pos) => {
        currentPosition = pos;
      },
    );

    navigateSpy.mockImplementation(routerMock.mockImplementation);

    act(() => {
      const wrong: AnswerToken = { id: undefined, value: "/" };
      result.current.inputState.replaceAnswerAt(0, wrong);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isIncorrect).toBe(true);
      expect(result.current.isComplete).toBe(false);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isIncorrect).toBe(false);
      expect(result.current.currentExercise.id).toBe(l1exercises[0].id);
    });

    act(() => {
      result.current.inputState.replaceAnswerAt(0, {
        id: undefined,
        value: "+",
      });
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isComplete).toBe(true);
      expect(result.current.currentExercise.id).toBe(l1exercises[0].id);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isComplete).toBe(false);
      expect(result.current.currentExercise.id).toBe(l1exercises[1].id);
    });

    act(() => {
      result.current.inputState.replaceAnswerAt(0, {
        id: undefined,
        value: "+",
      });
      result.current.inputState.replaceAnswerAt(1, {
        id: undefined,
        value: "-",
      });
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isComplete).toBe(true);
      expect(result.current.currentExercise.id).toBe(l1exercises[1].id);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isComplete).toBe(false);
      expect(result.current.currentExercise.id).toBe(l1exercises[2].id);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isComplete).toBe(true);
      expect(routerMock.getNavigationTo(syncRoute.to)).toBeUndefined();
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      const syncNavigation = routerMock.getNavigationTo(syncRoute.to);

      expect(syncNavigation).not.toBeNull();
      expect(syncNavigation!.params.lessonId).toBe(l1.id);
      expect(syncNavigation!.computedState.submission.exercises).toHaveLength(
        3,
      );
    });
  });

  it("submits the completed lesson only once even if continue is triggered repeatedly", async () => {
    let currentPosition = 3;

    const { result, rerender } = renderHook(
      ({ position }) => useLessonExerciseState(position),
      { initialProps: { position: currentPosition } },
    );

    const routerMock = createLessonRouterMock(
      rerender,
      () => currentPosition,
      (pos) => {
        currentPosition = pos;
      },
    );

    navigateSpy.mockImplementation(routerMock.mockImplementation);

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isComplete).toBe(true);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
      result.current.handleExerciseButtonClick();
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      const syncNavigations = routerMock.navigations.filter(
        (navigation) => navigation.to === syncRoute.to,
      );

      expect(syncNavigations).toHaveLength(1);
    });
  });

  it("shows completed state again when navigating back to a solved exercise", async () => {
    let currentPosition = 1;

    const { result, rerender } = renderHook(
      ({ position }) => useLessonExerciseState(position),
      { initialProps: { position: currentPosition } },
    );

    const routerMock = createLessonRouterMock(
      rerender,
      () => currentPosition,
      (pos) => {
        currentPosition = pos;
      },
    );

    navigateSpy.mockImplementation(routerMock.mockImplementation);

    act(() => {
      result.current.inputState.replaceAnswerAt(0, {
        id: undefined,
        value: "+",
      });
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isComplete).toBe(true);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.currentExercise.id).toBe(l1exercises[1].id);
    });

    act(() => {
      result.current.goBack();
    });

    await waitFor(() => {
      expect(result.current.currentExercise.id).toBe(l1exercises[0].id);
      expect(result.current.isComplete).toBe(true);
    });
  });
});

describe("useExercise Status (integration)", () => {
  it("wrong answer => isIncorrect", async () => {
    const { result } = renderHook(() => useLessonExerciseState(1));

    act(() => {
      result.current.inputState.replaceAnswerAt(0, {
        id: undefined,
        value: "/",
      });
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isIncorrect).toBe(true);
      expect(result.current.isComplete).toBe(false);
    });
  });

  it("input changes clear incorrect feedback without locking the exercise", async () => {
    const { result } = renderHook(() => useLessonExerciseState(1));

    act(() => {
      result.current.inputState.replaceAnswerAt(0, {
        id: undefined,
        value: "/",
      });
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isIncorrect).toBe(true);
    });

    act(() => {
      result.current.inputState.replaceAnswerAt(0, {
        id: undefined,
        value: "+",
      });
    });

    await waitFor(() => {
      expect(result.current.isIncorrect).toBe(false);
    });
  });

  it("correct answer => isComplete", async () => {
    const { result } = renderHook(() => useLessonExerciseState(1));

    act(() => {
      result.current.inputState.replaceAnswerAt(0, {
        id: undefined,
        value: "+",
      });
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.isComplete).toBe(true);
    });
  });
});
