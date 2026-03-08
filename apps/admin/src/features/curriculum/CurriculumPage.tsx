import { useSuspenseQuery, useQueryClient } from "@tanstack/react-query";
import { CurriculumHero } from "@/features/curriculum/components/CurriculumHero.tsx";
import { qo } from "@/queries/definitions/queries";
import { getRouteApi } from "@tanstack/react-router";
import { useState } from "react";
import {
  curriculumDraftSchema,
  type CurriculumDraft,
  type CurriculumDraftLesson,
} from "@ludocode/types";
import { useAppForm } from "./types";
import { useUpdateCourse } from "@/queries/mutations/useUpdateCourse";
import { useUpdateYamlCourse } from "@/queries/mutations/useUpdateYamlCourse";
import { CurriculumPreview } from "@/features/curriculum/navigator/preview/CurriculumPreview.tsx";
import { CurriculumEditor } from "@/features/curriculum/navigator/editor/CurriculumEditor.tsx";
import { LessonDetailPreview } from "@/features/curriculum/detail/preview/LessonDetailPreview.tsx";
import { CurriculumBreadcrumbs } from "@/features/curriculum/components/CurriculumBreadcrumbs";
import { router } from "@/main";
import { adminNavigation } from "@/constants/adminNavigation";
import { adminApi } from "@/constants/api/adminApi";
import { useChangeCourseStatus } from "@/features/courses-hub/hooks/useToggleCourseVisibility";
import { useDeleteCourse } from "@/features/courses-hub/hooks/useDeleteCourse";
import { DeleteDialog } from "@ludocode/design-system/templates/dialog/delete-dialog";
import { CourseStatusBadge } from "@/features/curriculum/components/CourseStatusBadge.tsx";
import type { CourseStatus } from "@ludocode/types";
import { Archive, Globe, TrashIcon } from "lucide-react";

type CurriculumPageProps = {};

export function CurriculumPage({}: CurriculumPageProps) {
  const routeApi = getRouteApi("/_app/curriculum/$courseId/");
  const { courseId } = routeApi.useParams();

  const { data: curriculumSnap } = useSuspenseQuery(
    qo.curriculumSnapshot(courseId),
  );

  const { data: courses } = useSuspenseQuery(qo.allCourses());
  const courseName =
    courses.find((c) => c.id === courseId)?.title ?? "Untitled Course";

  const courseLanguage = courses.find((c) => c.id == courseId)?.language;

  const courseIcon = courses.find((c) => c.id === courseId)?.courseIcon;

  const courseStatus: CourseStatus =
    courses.find((c) => c.id === courseId)?.courseStatus ?? "DRAFT";

  const changeCourseStatus = useChangeCourseStatus({ courseId });
  const deleteCourseMutation = useDeleteCourse({ courseId });

  const [isEditing, setIsEditing] = useState(false);

  const qc = useQueryClient();

  const submitMutation = useUpdateCourse({
    courseId,
  });

  const { mutate: uploadYamlCurriculum, isPending: isUploadingYaml } =
    useUpdateYamlCourse({ courseId });

  const form = useAppForm({
    defaultValues: {
      modules: curriculumSnap.modules.map((m) => ({
        id: m.id,
        title: m.title,
        lessons: m.lessons.map((l) => ({
          id: l.id,
          title: l.title,
        })),
      })),
    } satisfies CurriculumDraft,
    validators: {
      onSubmit: curriculumDraftSchema,
    },
    onSubmit: async ({ value }) => {
      submitMutation.mutate(value, {
        onSuccess: (payload) => {
          form.reset(payload);
        },
      });
      setIsEditing(false);
    },
  });

  const [selectedLesson, setSelectedLesson] =
    useState<CurriculumDraftLesson | null>(null);

  const handleSaveOrEdit = () => {
    if (isEditing) {
      form.handleSubmit();
    } else {
      setIsEditing(true);
    }
  };

  async function downloadCurriculumYaml(courseId: string, courseName: string) {
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

  const cancelEditing = () => {
    form.reset();
    setIsEditing(false);
  };

  const navigateToLesson = (lesson: CurriculumDraftLesson) => {
    router.navigate(adminNavigation.curriculum.toLesson(courseId, lesson.id));
  };

  return (
    <div className="col-span-10 min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0">
      <form
        className="min-h-0 w-full h-full flex flex-col gap-8 items-stretch justify-start min-w-0"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="w-full flex justify-between border-b border-b-ludo-accent-muted pb-6">
          <div className="w-full flex gap-4 flex-col">
            <CurriculumBreadcrumbs
              courseId={courseId}
              courseName={courseName}
            />
            <div className="flex items-center gap-4">
              <h1 className="text-ludo-white-bright text-3xl font-bold">
                {courseName}
              </h1>
              <CourseStatusBadge status={courseStatus} />
            </div>

            <div className="flex items-center gap-3">
              {courseStatus === "DRAFT" && (
                <>
                  <button
                    type="button"
                    disabled={changeCourseStatus.isPending}
                    onClick={() =>
                      changeCourseStatus.mutate({ value: "PUBLISHED" })
                    }
                    className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
                  >
                    <Globe className="h-4 w-4" />
                    Publish
                  </button>
                  <DeleteDialog
                    targetName={courseName}
                    triggerClassName="w-auto"
                    asChild
                    destructiveConfirmation={{
                      confirmationText: `type ${courseName} to confirm`,
                      confirmationValue: courseName,
                    }}
                    onClick={() => {
                      if (!deleteCourseMutation.isPending) {
                        deleteCourseMutation.mutate(undefined, {
                          onSuccess: () => {
                            router.navigate(
                              adminNavigation.hub.courses.toCoursesHub(),
                            );
                          },
                        });
                      }
                    }}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-md bg-ludo-danger px-4 py-2 text-sm font-medium text-white transition hover:bg-ludo-danger/80"
                    >
                      <TrashIcon className="h-4 w-4" />
                      Delete
                    </button>
                  </DeleteDialog>
                </>
              )}

              {courseStatus === "PUBLISHED" && (
                <button
                  type="button"
                  disabled={changeCourseStatus.isPending}
                  onClick={() =>
                    changeCourseStatus.mutate({ value: "ARCHIVED" })
                  }
                  className="flex items-center gap-2 rounded-md bg-amber-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-amber-500 disabled:opacity-50"
                >
                  <Archive className="h-4 w-4" />
                  Archive
                </button>
              )}

              {courseStatus === "ARCHIVED" && (
                <button
                  type="button"
                  disabled={changeCourseStatus.isPending}
                  onClick={() =>
                    changeCourseStatus.mutate({ value: "PUBLISHED" })
                  }
                  className="flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500 disabled:opacity-50"
                >
                  <Globe className="h-4 w-4" />
                  Publish
                </button>
              )}
            </div>

            <CurriculumHero
              courseLanguage={courseLanguage}
              courseId={courseId}
              courseIcon={courseIcon}
            />
          </div>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-4 min-h-0">
              <div className="w-full flex flex-col h-full">
                {!isEditing ? (
                  <CurriculumPreview
                    selectedLesson={selectedLesson}
                    onLessonClick={setSelectedLesson}
                    onLessonNavigate={navigateToLesson}
                    modules={form.state.values.modules}
                    onEditClick={handleSaveOrEdit}
                    onYamlUpload={(file) =>
                      uploadYamlCurriculum(file, {
                        onSuccess: async () => {
                          const freshSnap = await qc.fetchQuery(
                            qo.curriculumSnapshot(courseId),
                          );
                          form.reset({
                            modules: freshSnap.modules.map((m) => ({
                              id: m.id,
                              title: m.title,
                              lessons: m.lessons.map((l) => ({
                                id: l.id,
                                title: l.title,
                              })),
                            })),
                          });
                        },
                      })
                    }
                    isUploadingYaml={isUploadingYaml}
                    onDownload={() =>
                      downloadCurriculumYaml(courseId, courseName)
                    }
                  />
                ) : (
                  <CurriculumEditor
                    form={form}
                    onSave={handleSaveOrEdit}
                    onCancel={cancelEditing}
                    canSubmit={canSubmit}
                    isSubmitting={isSubmitting}
                  />
                )}
              </div>

              <div className="w-1/2 flex min-h-0 flex-col h-full">
                {!isEditing && selectedLesson && (
                  <LessonDetailPreview
                    lesson={selectedLesson}
                    courseId={courseId}
                  />
                )}
              </div>
            </div>
          )}
        />
      </form>
    </div>
  );
}
