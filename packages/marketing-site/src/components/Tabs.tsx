import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "~/utils/cn";

interface TabsContextValue {
  setValue: (value: string) => void;
  value: string | undefined;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

const TabsContextProvider = TabsContext.Provider;

const useTabsContext = () => {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error(
      "useTabsContext must be used within a TabsContextProvider.",
    );
  }

  return context;
};

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>((props, ref) => {
  const defaultValue = props.defaultValue;
  const [value, setValue] = React.useState<string | undefined>(defaultValue);

  return (
    <TabsContextProvider value={{ setValue, value }}>
      <TabsPrimitive.Root ref={ref} {...props} />
    </TabsContextProvider>
  );
});
Tabs.displayName = TabsPrimitive.Root.displayName;

const tabListVariants = cva(
  "flex items-center overflow-visible border-b border-brand-gray-900 min-w-max",
  {
    variants: {
      grow: {
        true: "justify-between [&>*]:w-full",
        false: "",
      },
      position: {
        apart: "justify-between",
        left: "",
        right: "justify-end",
      },
    },
    defaultVariants: {
      grow: false,
      position: "left",
    },
  },
);

type Position = "apart" | "left" | "right";

interface TabListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  grow?: boolean;
  position?: Position;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabListProps
>(({ className, grow = false, position = "left", ...props }, ref) => (
  <div className="no-scrollbar overflow-scroll">
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        tabListVariants({
          className,
          grow,
          position,
        }),
      )}
      {...props}
    />
  </div>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    innerClassName?: string;
  }
>(({ className, innerClassName, ...props }, ref) => {
  const currentValue = props.value;
  const { value, setValue } = useTabsContext();

  const hasUnderline = currentValue === value;

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    props.onClick?.(event);
    setValue(currentValue);
  };

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          "mb-4 px-2 py-4 opacity-40 transition-[opacity] duration-500 ease-in-out hover:opacity-100 data-[state=active]:opacity-100",
          innerClassName,
        )}
        {...props}
        onClick={handleOnClick}
      />
      {hasUnderline && (
        <motion.div
          className="absolute bottom-[-1px] left-0 right-0 h-px bg-brand-yellow-500"
          layoutId="underline"
        />
      )}
    </div>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const variants = {
  hidden: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
    withAnimation?: boolean;
  }
>(({ className, withAnimation = true, ...props }, ref) => {
  const currentValue = props.value;
  const { value } = useTabsContext();

  const isVisible = currentValue === value;

  const children = (
    <TabsPrimitive.Content
      ref={ref}
      className={cn("mt-8 md:mt-20", className)}
      {...props}
    />
  );

  return withAnimation ? (
    <motion.div animate={isVisible ? variants.visible : variants.hidden}>
      {children}
    </motion.div>
  ) : (
    children
  );
});
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
