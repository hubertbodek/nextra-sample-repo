import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "~/lib/tailwind-merge";

const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export { cn };
