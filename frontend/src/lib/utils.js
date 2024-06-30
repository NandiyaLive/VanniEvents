import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function truncate(str, length = 20) {
  return str?.length > length ? str.slice(0, length) + "..." : str;
}
