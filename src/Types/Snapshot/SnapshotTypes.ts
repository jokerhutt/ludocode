import type { ExerciseType } from "../Exercise/ExerciseType"

export type OptionSnap = {
  content: string
  answerOrder: number | null
}

export type ModuleSnapshot = {
  moduleId: string        // UUID string
  title: string
  lessons: LessonSnap[]
}

export type ExerciseSnap = {
  id: string | null   // UUID string or null
  title: string
  prompt: string
  exerciseType: ExerciseType    // your existing enum
  options: OptionSnap[]
}

export type LessonSnap = {
  id: string | null   // UUID string or null
  tempId: string      // UUID string
  title: string
  orderIndex: number
  exercises: ExerciseSnap[]
}