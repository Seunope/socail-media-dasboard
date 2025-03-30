import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// export function formatDate(input: string | number): string {
//   const date = new Date(input)
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   })
// }

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function jsonToCsv(data: Record<string, unknown>[]): string {
  if (data.length === 0) return "";

  // Get headers
  const headers = Object.keys(data[0]);
  let csv = headers.join(",") + "\n";

  // Add rows
  data.forEach((item) => {
    const row = headers.map((header) => {
      let value = item[header];

      // Handle nested objects
      if (typeof value === "object" && value !== null) {
        value = JSON.stringify(value);
      }

      // Escape quotes and wrap in quotes if contains comma
      if (
        typeof value === "string" &&
        (value.includes(",") || value.includes('"'))
      ) {
        value = `"${value.replace(/"/g, '""')}"`;
      }

      return value;
    });
    csv += row.join(",") + "\n";
  });

  return csv;
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}
