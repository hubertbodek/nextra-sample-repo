import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const codeTagVariants = cva(
  "border px-2 py-1 transition-all font-mono text-tag whitespace-nowrap relative",
  {
    variants: {
      checked: {
        false:
          "border-brand-dark-400 text-brand-gray-300 hover:text-white hover:border-white",
        true: "border-brand-yellow-500 text-brand-yellow-500",
      },
    },
    defaultVariants: {
      checked: false,
    },
  },
);

const bgOverlayVariants = cva("absolute inset-0 bg-gradient-to-r opacity-0", {
  variants: {
    checked: {
      true: "from-brand-yellow-700 via-brand-dark-700 to-transparent opacity-20",
      false:
        "from-brand-gray-300 via-brand-dark-700 to-transparent hover:opacity-20",
    },
  },
  defaultVariants: {
    checked: false,
  },
});

export interface CodeTagProps
  extends HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof codeTagVariants> {
  asChild?: boolean;
  children: ReactNode;
}

export const CodeTag = forwardRef<HTMLButtonElement, CodeTagProps>(
  ({ asChild, checked, children, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          codeTagVariants({
            checked,
            className,
          }),
        )}
        ref={ref}
        {...props}
      >
        {children}
        <div className={bgOverlayVariants({ checked })} />
      </Comp>
    );
  },
);

CodeTag.displayName = "CodeTag";
