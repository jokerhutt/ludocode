import { SUBMIT_COURSE_SNAPSHOT } from "@/constants/pathConstants";
import { qk } from "@/constants/qk";
import { courseFormOpts, useAppForm } from "@/form/formKit";
import { ludoPost } from "@/Hooks/Queries/Fetcher/ludoPost";
import type { CourseSnap, ModuleSnap } from "@/Types/Snapshot/SnapshotTypes";
import { useQueryClient } from "@tanstack/react-query";

type FormArgs = {
  courseSnapshot: CourseSnap;
  modules: ModuleSnap[];
};

export function useBuilderForm({ courseSnapshot, modules }: FormArgs) {
  const qc = useQueryClient();

  const courseId = courseSnapshot.courseId;

  const form = useAppForm({
    ...courseFormOpts,
    defaultValues: { courseId, modules },
    onSubmit: async ({ value }) => {
      try {
        const fresh = await ludoPost<CourseSnap>(
          SUBMIT_COURSE_SNAPSHOT,
          value,
          true
        );
        qc.setQueryData(qk.courseSnapshot(fresh.courseId), fresh);
        form.update({ defaultValues: fresh });
        form.reset();
      } catch (err) {
        console.log("Error");
        console.error("❌ Submission failed:", err);
      }
    },
  });

  return form;

}
