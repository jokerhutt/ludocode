"use client";

import { Drawer } from "vaul";
import { useLessonContext } from "../Context/useLessonContext";
import { LessonFooter } from "../Zone/LessonFooter";

export function LessonFeedbackDrawer() {
  const { phase } = useLessonContext();

  return (
    <Drawer.Root open={phase !== "DEFAULT"} modal={false} dismissible={false}>
      <LessonFooter />
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-transparent" />

        <Drawer.Content className="fixed bottom-0 left-0 right-0 h-40 bg-codeGray border-t-2 border-green-500">
          <div className="p-4">
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-gray-300" />
            <Drawer.Title className="text-white text-lg font-medium">
              Great work!
            </Drawer.Title>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
