import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cn } from "~/utils/cn";

const buttonVariants = cva(
  "ease-in-out duration-300 flex flex-nowrap font-bold uppercase text-center items-center justify-center ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 font-mono",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-yellow-500 leading-4 text-brand-dark-500 hover:bg-brand-yellow-600 fill-brand-dark-500",
        secondary:
          "bg-brand-gray-950 leading-4 text-brand-yellow-500 hover:bg-brand-gray-950/80 fill-brand-yellow-500",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        ghost:
          "bg-transparent text-white hover:text-brand-yellow-500 fill-white",
      },
      size: {
        sm: "button-sm gap-2.5 h-8 px-7 text-button-small",
        md: "button-md gap-2 h-10 px-8 text-button-large",
        lg: "button-lg gap-2.5 h-12 px-9 text-button-large",
        icon: "button-icon h-8 w-12 px-0",
        ghost: "p-0 font-normal font-sans text-xs",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ size, variant, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";

export { Button, buttonVariants };
