import { cn } from "./cn";

interface Options {
  className?: string;
}

export const colorText = (children: string, options?: Options) => {
  const regex = /\*\*(.*?)\*\*/g;

  const matches = children.match(regex);

  if (!matches) {
    return children;
  }

  const coloredChildren = children.split(regex).map((child, index) => {
    if (index % 2 === 0) {
      return child;
    }

    return (
      <span
        className={cn("text-brand-yellow-500", options?.className)}
        key={index}
      >
        {child}
      </span>
    );
  });

  return coloredChildren;
};
