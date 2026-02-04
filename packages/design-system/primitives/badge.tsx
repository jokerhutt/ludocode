import {
  CustomIcon,
  type IconName,
} from "@ludocode/design-system/primitives/custom-icon";
import { motion } from "framer-motion";

export type BadgeProps = { icon: IconName };

export function Badge({ icon }: BadgeProps) {
  return (
    <div className="h-10 w-10 bg-ludo-background rounded-md flex items-center justify-center">
      <CustomIcon className="h-5 w-5" color="white" iconName={icon} />
    </div>
  );
}

export function AnimatedBadge({ icon }: BadgeProps) {
  return (
    <div className="h-10 w-10 bg-ludo-background rounded-md flex items-center justify-center">
      <motion.div
        key={icon}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 2,
          ease: "easeOut",
          scale: { type: "spring", stiffness: 200, damping: 15 },
        }}
      >
        <CustomIcon className="h-5 w-5" color="white" iconName={icon} />
      </motion.div>
    </div>
  );
}
