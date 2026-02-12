import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind classes without style conflicts.
 * Useful for role-based styling (e.g., border-red-500 vs border-emerald-500).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}