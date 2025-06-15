import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateRandomHexColor(): string {
  const color = Math.floor(Math.random() * 0xffffff); // 0x000000 - 0xFFFFFF
  return `${color.toString(16).padStart(6, "0")}`;
}
