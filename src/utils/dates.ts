export function showBorrowDate(date?: string) {
  if (!date) return "-";

  const dateObject = new Date(date);
  return dateObject.toLocaleDateString();
}

export function isOverdue(date?: string) {
  if (!date) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return new Date(date) < today;
}

export function getDueText(date?: string) {
  if (!date) return "No due date";

  const dueDate = new Date(date);
  const today = new Date();

  dueDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  if (dueDate.getTime() === today.getTime()) return "Due today";

  if (dueDate < today) {
    return `Overdue since ${dueDate.toLocaleDateString()}`;
  }

  return `Due ${dueDate.toLocaleDateString()}`;
}
