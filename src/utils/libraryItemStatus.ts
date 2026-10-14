import type { LibraryItem } from "@/types";

export const statusFilterOptions = [
  "All items",
  "Available",
  "Loaned",
  "Not for loan",
];

export function getStatus(item: LibraryItem) {
  if (item.borrower || item.borrowDate) return "Loaned";

  if (!item.isBorrowable) return "Not for loan";

  return "Available";
}

export function getStatusLabel(status: string) {
  if (status === "Loaned") return "On loan";

  return status;
}

export function getStatusClass(status: string) {
  if (status === "Available") {
    return "bg-emerald-50 text-emerald-700";
  }

  if (status === "Loaned") {
    return "bg-violet-100 text-violet-700";
  }

  return "bg-slate-100 text-slate-600";
}
