import type { ReactNode } from "react";

interface Link {
  label: string;
  href: string;
}

interface Logo {
  href: string;
  icon: ReactNode;
}

export type { Link, Logo };
