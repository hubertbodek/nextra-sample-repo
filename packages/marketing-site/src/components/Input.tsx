import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const inputWrapperVariants = cva(
  "duration-300 flex min-h-[40px] border border-brand-dark-500 bg-brand-dark-700 py-2 pl-4 pr-2.5 outline-none transition-[border-color] gap-2.5 ease-in-out",
  {
    variants: {
      focus: {
        false: "",
        true: "border-brand-dark-400 [&+label]:text-brand-yellow-300",
      },
    },
    defaultVariants: {
      focus: false,
    },
  },
);

const inputVariants = cva(
  "w-full bg-transparent font-sans text-[0.75rem] leading-4 text-brand-gray-300 outline-none placeholder:text-brand-gray-300 placeholder:transition-[color] placeholder:duration-300 placeholder:ease-in-out hover:placeholder:text-white",
  {
    variants: {
      focus: {
        false: "",
        true: "placeholder:text-white",
      },
    },
    defaultVariants: {
      focus: false,
    },
  },
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  right?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, onBlur, onFocus, right, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    return (
      <div
        className={cn(inputWrapperVariants({ className, focus: isFocused }))}
      >
        <input
          className={cn(inputVariants({ className, focus: isFocused }))}
          onBlur={handleOnBlur}
          onFocus={handleFocus}
          ref={ref}
          {...props}
        />
        {right}
      </div>
    );
  },
);
Input.displayName = "Input";
