import type { ReactNode } from "react";
import { cn } from "~/utils/cn";

interface RootLayoutProps {
  className?: string;
  banner?: ReactNode;
  children: ReactNode;
  header: ReactNode;
  footer: ReactNode;
}

export const RootLayout = ({
  className,
  banner,
  header,
  children,
  footer,
}: RootLayoutProps) => {
  return (
    <>
      <div className={cn("min-h-screen", className)}>
        <div className="sticky top-0 z-50 w-full bg-brand-yellow-500">
          {banner}
          {header}
        </div>
        <main>{children}</main>
      </div>
      {footer}
    </>
  );
};
