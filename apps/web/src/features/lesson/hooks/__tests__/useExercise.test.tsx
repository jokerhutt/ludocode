import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";

const { navigateSpy } = vi.hoisted(() => ({
  navigateSpy: vi.fn(),
}));

vi.mock("@/main", () => ({
  router: {
    navigate: navigateSpy,
  },
}));

import { useExercise } from "@/features/lesson/hooks/useExercise";
import { l1, l1exercises, c1Id } from "./fixtures";
import type { AnswerToken } from "@ludocode/types";
import { Route as syncRoute } from "@/routes/app/sync/$lessonId.tsx";
import { createLessonRouterMock } from "./testHelpers";

describe("useExercise Flow (integration)", () => {
  // ===== TEST 1 =====

  it("full flow => correctly handles lesson submission => navigates to sync page", async () => {
    let currentPosition = 1;

    const { result, rerender } = renderHook(
      ({ position }) =>
        useExercise({
          courseId: c1Id,
          exercises: l1exercises,
          lesson: l1,
          position,
          config: { audioEnabled: true },
        }),
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

    // Exercise 0 is CLOZE: wrong answer "/"
    act(() => {
      const wrong: AnswerToken = {
        id: undefined,
        value: "/",
      };
      result.current.inputState.replaceAnswerAt(0, wrong);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("INCORRECT");
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("DEFAULT");
    });

    // Exercise 0: correct answer "+"
    act(() => {
      const correct: AnswerToken = {
        id: undefined,
        value: "+",
      };
      result.current.inputState.replaceAnswerAt(0, correct);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("CORRECT");
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("DEFAULT");
      expect(result.current.currentExercise.id).toBe(l1exercises[1].id);
    });

    // Exercise 1 is CLOZE with 2 blanks: correct answers "+" then "-"
    act(() => {
      const s1: AnswerToken = {
        id: undefined,
        value: "+",
      };
      result.current.inputState.replaceAnswerAt(0, s1);
    });

    act(() => {
      const s2: AnswerToken = {
        id: undefined,
        value: "-",
      };
      result.current.inputState.replaceAnswerAt(1, s2);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("CORRECT");
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("DEFAULT");
      expect(result.current.currentExercise.id).toBe(l1exercises[2].id);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("DEFAULT");

      // Get sync navigation
      const syncNavigation = routerMock.getNavigationTo(syncRoute.to);

      // Assert navigation to sync page
      expect(syncNavigation).not.toBeNull();
      expect(syncNavigation!.params.lessonId).toBe(l1.id);

      // Assert lesson submission structure
      expect(syncNavigation!.computedState.submission).toBeDefined();
      expect(syncNavigation!.computedState.submission.lessonId).toBe(l1.id);
      expect(
        syncNavigation!.computedState.submission.submissionId,
      ).toBeDefined();
      expect(syncNavigation!.computedState.submission.exercises).toHaveLength(
        3,
      );

      // Verify all exercises were submitted

      expect(
        syncNavigation!.computedState.submission.exercises[0].exerciseId,
      ).toBe(l1exercises[0].id);

      // Exercise 1 had 2 attempts
      expect(
        syncNavigation!.computedState.submission.exercises[0].attempts,
      ).toHaveLength(2);

      // Exercise 1 attempt 1 was INCORRECT (wrong CLOZE answer "/")
      expect(
        syncNavigation!.computedState.submission.exercises[0].attempts[0]
          .answer,
      ).toEqual({ type: "CLOZE", valuesByBlank: ["/"] });

      // Exercise 1 attempt 2 was CORRECT (correct CLOZE answer "+")
      expect(
        syncNavigation!.computedState.submission.exercises[0].attempts[1]
          .answer,
      ).toEqual({ type: "CLOZE", valuesByBlank: ["+"] });

      expect(
        syncNavigation!.computedState.submission.exercises[1].exerciseId,
      ).toBe(l1exercises[1].id);

      // Exercise 2 had 1 attempt
      expect(
        syncNavigation!.computedState.submission.exercises[1].attempts,
      ).toHaveLength(1);

      // Exercise 2 attempt 1 was CORRECT (correct CLOZE answer "+", "-")
      expect(
        syncNavigation!.computedState.submission.exercises[1].attempts[0]
          .answer,
      ).toEqual({ type: "CLOZE", valuesByBlank: ["+", "-"] });

      expect(
        syncNavigation!.computedState.submission.exercises[2].exerciseId,
      ).toBe(l1exercises[2].id);

      // Exercise 3 had 1 attempt
      expect(
        syncNavigation!.computedState.submission.exercises[2].attempts,
      ).toHaveLength(1);

      // Exercise 3 is INFO => MCQ with "INFO"
      expect(
        syncNavigation!.computedState.submission.exercises[2].attempts[0]
          .answer,
      ).toEqual({ type: "MCQ", pickedValue: "INFO" });
    });
  });
});

describe("useExercise Phase (integration)", () => {
  // ===== TEST 1 =====

  it("wrong answer => INCORRECT phase", async () => {
    const { result } = renderHook(() =>
      useExercise({
        courseId: c1Id,
        exercises: l1exercises,
        lesson: l1,
        position: 1,
        config: { audioEnabled: true },
      }),
    );

    act(() => {
      const wrong: AnswerToken = {
        id: undefined,
        value: "/",
      };
      result.current.inputState.replaceAnswerAt(0, wrong);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("INCORRECT");
    });
  });

  // ===== TEST 2 =====

  it("correct answer => CORRECT phase", async () => {
    const { result } = renderHook(() =>
      useExercise({
        courseId: c1Id,
        exercises: l1exercises,
        lesson: l1,
        position: 1,
        config: { audioEnabled: true },
      }),
    );

    act(() => {
      const correct: AnswerToken = {
        id: undefined,
        value: "+",
      };
      result.current.inputState.replaceAnswerAt(0, correct);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("CORRECT");
    });
  });

  // ===== TEST 3 =====

  it("INFO answer => DEFAULT phase", async () => {
    const { result } = renderHook(() =>
      useExercise({
        courseId: c1Id,
        exercises: l1exercises,
        lesson: l1,
        position: 3,
        config: { audioEnabled: true },
      }),
    );

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("DEFAULT");
    });
  });

  // ===== TEST 4 =====

  it("incorrect answer order => INCORRECT phase", async () => {
    const { result } = renderHook(() =>
      useExercise({
        courseId: c1Id,
        exercises: l1exercises,
        lesson: l1,
        position: 2,
        config: { audioEnabled: true },
      }),
    );

    // Wrong order: "-" then "+" (correct is "+" then "-")
    act(() => {
      const s1: AnswerToken = {
        id: undefined,
        value: "-",
      };
      result.current.inputState.replaceAnswerAt(0, s1);
    });

    act(() => {
      const s2: AnswerToken = {
        id: undefined,
        value: "+",
      };
      result.current.inputState.replaceAnswerAt(1, s2);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("INCORRECT");
    });
  });

  // ===== TEST 5 =====

  it("correct answer order => CORRECT phase", async () => {
    const { result } = renderHook(() =>
      useExercise({
        courseId: c1Id,
        exercises: l1exercises,
        lesson: l1,
        position: 2,
        config: { audioEnabled: true },
      }),
    );

    // Correct order: "+" then "-"
    act(() => {
      const s1: AnswerToken = {
        id: undefined,
        value: "+",
      };
      result.current.inputState.replaceAnswerAt(0, s1);
    });

    act(() => {
      const s2: AnswerToken = {
        id: undefined,
        value: "-",
      };
      result.current.inputState.replaceAnswerAt(1, s2);
    });

    act(() => {
      result.current.handleExerciseButtonClick();
    });

    await waitFor(() => {
      expect(result.current.phase).toBe("CORRECT");
    });
  });
});
