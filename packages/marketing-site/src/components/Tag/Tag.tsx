import type { HTMLAttributes } from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";
import { brandIcon } from "~/icons";

const variants = cva("text-tag font-normal uppercase tracking-[1px]", {
  variants: {
    variant: {
      primary: "text-white",
      secondary: "text-brand-yellow-500",
    },
  },
});

interface TagProps extends HTMLAttributes<HTMLDivElement> {
  wrap?: boolean;
  variant?: "primary" | "secondary";
}

export const Tag = ({
  children,
  className,
  variant = "primary",
  wrap,
  ...props
}: TagProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-4 sm:justify-start",
        wrap &&
          "w-4/6 flex-col justify-center gap-[10px] text-center lg:w-auto lg:flex-row lg:text-left",
        className,
      )}
      {...props}
    >
      {variant === "primary" && (
        <Image
          src={brandIcon.default}
          alt="brand icon"
          height={32}
          width={20}
        />
      )}
      <div className={cn(variants({ variant }), className)}>
        <>{children}</>
      </div>
    </div>
  );
};
