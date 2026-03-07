import { adminApi } from "@/constants/api/adminApi";

export async function downloadCurriculumYaml(
  courseId: string,
  courseName: string,
) {
  const res = await fetch(
    `${adminApi.snapshots.byCourseCurriculum(courseId)}?mode=yaml`,
    { credentials: "include" },
  );

  if (!res.ok) throw new Error("Failed to download curriculum");

  const blob = await res.blob();

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${courseName}.yaml`;
  a.click();

  URL.revokeObjectURL(url);
}
