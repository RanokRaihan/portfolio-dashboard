import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate estimated reading time in minutes
export function calculateReadTime(content: string): number {
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  const textOnly = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
  const wordCount = textOnly.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);

  return Math.max(1, readTime); // Minimum 1 minute read time
}
