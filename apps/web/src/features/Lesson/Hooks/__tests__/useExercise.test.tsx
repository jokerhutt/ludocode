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

import { useExercise } from "@/features/Lesson/Hooks/useExercise";
import { l1, l1exercises } from "./fixtures";
import type { AnswerToken } from "@ludocode/types";
import { Route as syncRoute } from "@/routes/_app/sync/$lessonId.tsx";
import { createLessonRouterMock } from "./testHelpers";

describe("useExercise Flow (integration)", () => {
  // ===== TEST 1 =====

  it("full flow => correctly handles lesson submission => navigates to sync page", async () => {
    let currentPosition = 1;

    const { result, rerender } = renderHook(
      ({ position }) =>
        useExercise({ exercises: l1exercises, lesson: l1, position }),
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

    const selectedOption = l1exercises[0].distractors[0];

    act(() => {
      const wrong: AnswerToken = {
        id: selectedOption.id,
        value: selectedOption.content,
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

    const selectedOptionB = l1exercises[0].correctOptions[0];

    act(() => {
      const correct: AnswerToken = {
        id: selectedOptionB.id,
        value: selectedOptionB.content,
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

    const selectedOptionC1 = l1exercises[1].correctOptions[0];
    const selectedOptionC2 = l1exercises[1].correctOptions[1];

    act(() => {
      const s1: AnswerToken = {
        id: selectedOptionC1.id,
        value: selectedOptionC1.content,
      };
      result.current.inputState.replaceAnswerAt(0, s1);
    });

    act(() => {
      const s2: AnswerToken = {
        id: selectedOptionC2.id,
        value: selectedOptionC2.content,
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
      expect(syncNavigation!.computedState.submission.submissions).toHaveLength(
        3,
      );

      // Verify all exercises were submitted

      expect(
        syncNavigation!.computedState.submission.submissions[0].exerciseId,
      ).toBe(l1exercises[0].id);

      // Exercise 1 had 2 attempts
      expect(
        syncNavigation!.computedState.submission.submissions[0].attempts,
      ).toHaveLength(2);

      // Exercise 1 attempt 1 was INCORRECT
      expect(
        syncNavigation!.computedState.submission.submissions[0].attempts[0]
          .isCorrect,
      ).toBe(false);

      // Exercise 1 attempt 2 was CORRECT
      expect(
        syncNavigation!.computedState.submission.submissions[0].attempts[1]
          .isCorrect,
      ).toBe(true);

      expect(
        syncNavigation!.computedState.submission.submissions[1].exerciseId,
      ).toBe(l1exercises[1].id);

      // Exercise 2 had 1 attempt
      expect(
        syncNavigation!.computedState.submission.submissions[1].attempts,
      ).toHaveLength(1);

      // Exercise 2 attempt 1 was CORRECT
      expect(
        syncNavigation!.computedState.submission.submissions[1].attempts[0]
          .isCorrect,
      ).toBe(true);

      expect(
        syncNavigation!.computedState.submission.submissions[2].exerciseId,
      ).toBe(l1exercises[2].id);

      // Exercise 3 had 1 attempt
      expect(
        syncNavigation!.computedState.submission.submissions[2].attempts,
      ).toHaveLength(1);

      // Exercise 3 attempt 1 was CORRECT

      expect(
        syncNavigation!.computedState.submission.submissions[2].attempts[0]
          .isCorrect,
      ).toBe(true);
    });
  });
});

describe("useExercise Phase (integration)", () => {
  // ===== TEST 1 =====

  it("wrong answer => INCORRECT phase", async () => {
    const { result } = renderHook(() =>
      useExercise({ exercises: l1exercises, lesson: l1, position: 1 }),
    );

    const selectedOptionA = l1exercises[0].distractors[0];

    act(() => {
      const wrong: AnswerToken = {
        id: selectedOptionA.id,
        value: selectedOptionA.content,
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
      useExercise({ exercises: l1exercises, lesson: l1, position: 1 }),
    );

    const selectedOption = l1exercises[0].correctOptions[0];

    act(() => {
      const correct: AnswerToken = {
        id: selectedOption.id,
        value: selectedOption.content,
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
      useExercise({ exercises: l1exercises, lesson: l1, position: 3 }),
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
      useExercise({ exercises: l1exercises, lesson: l1, position: 2 }),
    );

    const selectedOption1 = l1exercises[1].correctOptions[1];
    const selectedOption2 = l1exercises[1].correctOptions[0];

    act(() => {
      const s1: AnswerToken = {
        id: selectedOption1.id,
        value: selectedOption1.content,
      };
      result.current.inputState.replaceAnswerAt(0, s1);
    });

    act(() => {
      const s2: AnswerToken = {
        id: selectedOption2.id,
        value: selectedOption2.content,
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
      useExercise({ exercises: l1exercises, lesson: l1, position: 2 }),
    );

    const selectedOption1 = l1exercises[1].correctOptions[0];
    const selectedOption2 = l1exercises[1].correctOptions[1];

    act(() => {
      const s1: AnswerToken = {
        id: selectedOption1.id,
        value: selectedOption1.content,
      };
      result.current.inputState.replaceAnswerAt(0, s1);
    });

    act(() => {
      const s2: AnswerToken = {
        id: selectedOption2.id,
        value: selectedOption2.content,
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
