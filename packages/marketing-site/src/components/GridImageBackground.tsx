import type { HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "~/utils/cn";
import gridStarsCta from "/public/media/shared/grid-stars-cta.png";

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
    >
      <Image
        src={gridStarsCta}
        alt="Background image"
        width={704}
        height={704}
      />
    </div>
  );
};
