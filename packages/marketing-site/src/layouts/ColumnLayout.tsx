import type { HTMLAttributes } from "react";
import { cn } from "~/utils/cn";

interface ColumnLayoutProps extends HTMLAttributes<HTMLDivElement> {
  rows: {
    item1: { node: React.ReactNode; className?: string };
    item2: { node: React.ReactNode; className?: string };
  }[];
}

export const ColumnLayout = ({ rows, ...props }: ColumnLayoutProps) => {
  return (
    <div
      className="mt-18 mb-20 w-full [&>*:nth-child(even)]:lg:flex-row-reverse"
      {...props}
    >
      {rows.map((row, i) => (
        <div
          key={i}
          className="relative flex flex-wrap items-center justify-between gap-14 pb-14 last:pb-0 md:gap-16 md:pb-16 lg:flex-nowrap lg:gap-20 lg:pb-32 xl:gap-40 xl:pb-56"
        >
          <div className="relative basis-full xl:h-[500px] xl:max-w-[550px] xl:basis-6/12">
            <div
              className={cn(
                "relative z-10 border border-brand-dark-400 bg-brand-dark-500 px-7 py-10 text-white lg:px-14",
                row.item1.className,
              )}
            >
              {row.item1.node}
            </div>
            <div className="absolute left-1/2 top-1/2 h-[897px] w-[897px] -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div
            className={cn(
              "relative flex w-full basis-full items-center bg-brand-dark-500 text-white lg:max-h-[500px] xl:max-w-[558px] xl:basis-6/12",
              row.item2.className,
            )}
          >
            {row.item2.node}
          </div>
        </div>
      ))}
    </div>
  );
};
