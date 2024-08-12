import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import Image from "next/image";
import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";
import logoWhite from "./assets/logo-white.svg";
import logo from "./assets/logo.png";

const logoVariants = cva("aspect-[664/80] relative w-min", {
  variants: {
    size: {
      lg: "h-6",
      md: "h-5",
      sm: "h-4",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

interface LogoProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof logoVariants> {
  asChild?: boolean;
  type?: "default" | "white";
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ asChild, className, size, type = "default" }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        className={cn(
          logoVariants({
            className,
            size,
          }),
        )}
        ref={ref}
      >
        <Image alt="acme logo" src={type === "white" ? logoWhite : logo} />
      </Comp>
    );
  },
);

export type { LogoProps };
export { Logo };

Logo.displayName = "Logo";
