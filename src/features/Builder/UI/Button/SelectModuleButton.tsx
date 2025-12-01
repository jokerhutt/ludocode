import { ThinNodeButton } from "@/components/LudoComponents/Atoms/Button/ThinNodeButton";

type SelectModuleButtonProps = { selectModule: () => void };

export function SelectModuleButton({ selectModule }: SelectModuleButtonProps) {
  return <ThinNodeButton text="Select" onClick={() => selectModule()} />;
}
