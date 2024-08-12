import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const containerVariants = cva("", {
  variants: {
    overflow: {
      clip: "overflow-x-clip",
      none: "",
    },
    variant: {
      primary: "bg-brand-dark-500",
      secondary: "bg-brand-dark-600",
      tertiary: "bg-brand-dark-700",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    overflow: "clip",
    variant: "primary",
  },
});

const innerVariants = cva(
  "relative mx-auto box-content max-w-screen-2xl px-4 sm:px-12",
  {
    variants: {
      size: {
        "2xl": "max-w-screen-2xl",
        xl: "max-w-screen-xl",
      },
    },
    defaultVariants: {
      size: "2xl",
    },
  },
);

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants>,
    VariantProps<typeof innerVariants> {
  innerClassName?: string;
}

export const Container = ({
  overflow,
  children,
  variant,
  className,
  innerClassName,
  size,
}: ContainerProps) => {
  return (
    <div className={cn(containerVariants({ variant, overflow }), className)}>
      <div className={innerVariants({ size, className: innerClassName })}>
        {children}
      </div>
    </div>
  );
};
