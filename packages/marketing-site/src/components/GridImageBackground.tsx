import type { HTMLAttributes } from "react";
import { cn } from "~/utils/cn";

export const GridImageBackground = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute -top-[138px] right-1/2 -z-20 min-w-max translate-x-1/2",
        className,
      )}
      {...props}
    ></div>
  );
};
