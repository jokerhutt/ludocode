import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";

type BadgeProps = { icon: IconName };

export function Badge({ icon }: BadgeProps) {
  return (
    <div className="h-10 w-10 bg-ludoGrayDark rounded-md flex items-center justify-center">
      <CustomIcon className="h-5 w-5" color="white" iconName={icon} />
    </div>
  );
}
