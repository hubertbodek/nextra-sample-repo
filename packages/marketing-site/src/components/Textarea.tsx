import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const textareaVariants = cva(
  "w-full bg-transparent font-sans text-[0.75rem] leading-4 text-white outline-none placeholder:text-brand-gray-300 placeholder:transition-[color] placeholder:duration-300 placeholder:ease-in-out hover:placeholder:text-white min-h-[104px]",
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

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, onBlur, onFocus, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleOnBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    return (
      <textarea
        className={cn(textareaVariants({ className, focus: isFocused }))}
        onBlur={handleOnBlur}
        onFocus={handleFocus}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
