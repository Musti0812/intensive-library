import { ClockIcon } from "lucide-react";
import { getDueText, isOverdue, showBorrowDate } from "@/utils/dates";

type Props = {
  borrower?: string;
  borrowDate?: string;
  dueDate?: string;
};

function BorrowerInfo({ borrower, borrowDate, dueDate }: Props) {
  if (!borrower) return "-";

  return (
    <div className="space-y-1">
      <div
        className="text-sm font-medium"
        title={`Checked out: ${showBorrowDate(borrowDate)}`}
      >
        {borrower}
      </div>

      <div
        className={`flex items-center gap-1.5 text-xs ${
          isOverdue(dueDate) ? "text-red-600" : "text-amber-600"
        }`}
      >
        <ClockIcon className="size-3.5" aria-hidden="true" />
        <span>{getDueText(dueDate)}</span>
      </div>
    </div>
  );
}

export default BorrowerInfo;
