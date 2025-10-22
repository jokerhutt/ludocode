import { GET_ENROLLED_IDS } from "../../constants/apiPaths";

export async function fetchEnrolledCourseIds() : Promise<string[]> {
      const res = await fetch(GET_ENROLLED_IDS, { credentials: "include" });
      if (!res.ok) throw new Error("Not authenticated");
      const enrolledIds = await res.json();
      return enrolledIds;
}