import { courseFormOpts, withForm } from "@/constants/form/formKit";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderSelector } from "@/components/LudoComponents/Atoms/Selection/OrderSelector";

export const EditNodeDialog = withForm({
  ...courseFormOpts,
  props: {
    removeItem: null as (() => void) | null,
    updateOrder: null as ((oldIndex: number, newIndex: number) => void) | null,
    type: "module" as "module" | "lesson",
    arrayLength: 0 as number,
    moduleIndex: 0 as number,
    lessonIndex: 0 as number,
    children: null as ReactNode | null,
  },
  render: ({
    form,
    updateOrder,
    removeItem,
    arrayLength,
    children,
    type,
    moduleIndex,
    lessonIndex,
  }) => {
    const name =
      type === "module"
        ? (`modules[${moduleIndex}].title` as const)
        : (`modules[${moduleIndex}].lessons[${lessonIndex}].title` as const);

    const currentIndex = type == "module" ? moduleIndex : lessonIndex;
    const canRemoveItem = arrayLength > 1;
    const handleRemoveItem = () => {
      if (!canRemoveItem) return;
      removeItem?.();
    };

    return (
      <Dialog>
        <form>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
            <DialogHeader>
              <div className="flex justify-between mb-2">
                <DialogTitle>Edit {type}</DialogTitle>
                <TrashIcon
                  onClick={() => handleRemoveItem()}
                  className={`h-4 ${
                    canRemoveItem
                      ? "hover:cursor-pointer"
                      : "hover:cursor-not-allowed"
                  } w-4`}
                />
              </div>
              <div className="grid grid-cols-[1fr_2fr] gap-4">
                <h2>{type} Title</h2>
                <form.AppField name={name}>
                  {(f) => <f.FormTitleField className="text-black" />}
                </form.AppField>
                <h2>Order Index</h2>
                <OrderSelector
                  onChange={updateOrder}
                  index={currentIndex}
                  count={arrayLength}
                >
                  <SelectTrigger
                    className="border-ludoLightPurple border-2 rounded-md"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <SelectValue />
                  </SelectTrigger>
                </OrderSelector>
              </div>
            </DialogHeader>
            <div className="grid gap-4"></div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit">Close</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    );
  },
});
