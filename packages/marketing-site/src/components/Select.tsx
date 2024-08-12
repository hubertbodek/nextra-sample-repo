import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import * as SelectPrimitive from "@radix-ui/react-select";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { cn } from "~/utils/cn";

const selectVariants = cva(
  "flex w-full items-center justify-between text-sm shadow-sm disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "!bg-brand-dark-700 border border-brand-dark-500 data-[state=open]:border-brand-dark-400 text-white placeholder:text-white ",
      },
      size: {
        md: "p-[14px]",
        sm: "px-[14px] py-2",
      },
      withOverlay: {
        true: "[&>span]:relative [&>span]:z-10 ring-transparent ring-1 data-[state=open]:ring-white",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      withOverlay: false,
    },
  },
);

export interface SelectProps
  extends SelectPrimitive.SelectProps,
    VariantProps<typeof selectVariants> {}

const SelectContext = React.createContext<VariantProps<typeof selectVariants>>({
  variant: "primary",
  size: "md",
});

const useSelect = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Select compound components cannot be rendered outside the Select component",
    );
  }
  return context;
};

const Select = ({ variant, ...props }: SelectProps) => {
  return (
    <SelectContext.Provider value={{ variant }}>
      <SelectPrimitive.Select {...props} />
    </SelectContext.Provider>
  );
};

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps
  extends React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> {
  withOverlay?: boolean;
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, withOverlay, ...props }, ref) => {
  const { variant } = useSelect();

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        selectVariants({ variant, className, withOverlay }),
        "group z-10 ring-offset-background focus:outline-none focus:ring-1 focus:ring-brand-dark-300 [&:focus~label]:text-brand-yellow-400 [&[data-state='open']~label]:text-brand-yellow-400",
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild {...props}>
        <ChevronDownIcon className={"select-icon h-4 w-4"} />
      </SelectPrimitive.Icon>
      {withOverlay && (
        <div
          id="overlay"
          className="absolute inset-0 z-0 border-brand-dark-400 bg-gradient-to-r from-brand-gray-300 via-brand-dark-700 to-transparent opacity-0 group-hover:opacity-20"
        ></div>
      )}
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const selectContentVariants = cva(
  "text-popover-foreground relative z-50 min-w-[8rem] overflow-hidden shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
  {
    variants: {
      variant: {
        primary: "bg-brand-dark-700 border border-brand-dark-400",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => {
  const { variant } = useSelect();

  React.useEffect(() => {
    document.body.style.overflow = "visible";
  }, []);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          selectContentVariants({ variant, className }),
          position === "popper" &&
            "data-[side=bottom]:translate-y-2 data-[side=left]:-translate-x-2 data-[side=right]:translate-x-2 data-[side=top]:-translate-y-2",
        )}
        avoidCollisions={false}
        position={position}
        {...props}
      >
        <SelectPrimitive.Viewport
          className={cn(
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[calc(var(--radix-select-trigger-width)_-_2px)] !overflow-auto",
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
});
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const selectItemVariant = cva(
  "relative flex w-full cursor-default select-none items-center py-2 pl-2 pr-8 text-sm text-white outline-none  data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
  {
    variants: {
      variant: {
        primary: "focus:bg-brand-dark-500 hover:bg-brand-dark-500",
        secondary: "bg-white",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  },
);

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  const { variant } = useSelect();

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(selectItemVariant({ variant, className }), className)}
      {...props}
    >
      <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="h-4 w-4" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
});

SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
};
