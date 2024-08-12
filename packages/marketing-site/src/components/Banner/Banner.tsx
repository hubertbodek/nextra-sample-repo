import type { HTMLAttributes, ReactNode } from "react";
import React, { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "~/utils/cn";

interface BannerProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

const Banner = forwardRef<HTMLDivElement, BannerProps>(
  (
    { asChild, children, className, dismissible = true, onDismiss, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        className={cn(
          "md:min-h-12 flex min-h-[42px] items-center bg-brand-green-500",
          className,
        )}
        ref={ref}
        {...props}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-8 px-4 py-2 sm:px-12">
          <>{children}</>
          {dismissible && (
            <button
              className="flex h-6 w-6  items-center justify-center md:h-8 md:w-8"
              onClick={onDismiss}
            ></button>
          )}
        </div>
      </Comp>
    );
  },
);

export type { BannerProps };
export { Banner };

Banner.displayName = "Banner";
