import { GET_EXERCISES_FROM_LESSON } from "../../constants/apiPaths";
import type { LudoExercise } from "../../Types/Exercise/LudoExercise";

export async function fetchExercises(lessonId: string) : Promise<LudoExercise[]> {

    const res = await fetch(GET_EXERCISES_FROM_LESSON(lessonId));
    if (!res.ok) throw Error("couldnt get exercise ids");
    return res.json()

}