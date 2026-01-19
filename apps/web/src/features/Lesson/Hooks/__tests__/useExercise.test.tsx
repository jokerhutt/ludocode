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

describe("useExercise Flow (integration)", () => {
  // ===== TEST 1 =====

  it("wrong answer => INCORRECT phase", async () => {
    const { result } = renderHook(() =>
      useExercise({ exercises: l1exercises, lesson: l1, position: 1 }),
    );

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
