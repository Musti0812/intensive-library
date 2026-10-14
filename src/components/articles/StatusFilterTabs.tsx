import type { LibraryItemWithStatus } from "@/types";
import { getStatusLabel, statusFilterOptions } from "@/utils/libraryItemStatus";

type Props = {
  libraryItems: LibraryItemWithStatus[];
  selectedStatus: string;
  showCounts: boolean;
  onStatusSelect: (status: string) => void;
};

function StatusFilterTabs({
  libraryItems,
  selectedStatus,
  showCounts,
  onStatusSelect,
}: Props) {
  function getStatusCount(status: string) {
    if (status === "All items") {
      return libraryItems.length;
    }

    return libraryItems.filter((item) => item.status === status).length;
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b">
      <div className="flex max-w-full overflow-x-auto">
        {statusFilterOptions.map((status) => (
          <button
            key={status}
            type="button"
            aria-pressed={selectedStatus === status}
            onClick={() => onStatusSelect(status)}
            className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${
              selectedStatus === status
                ? "border-violet-600 text-violet-700"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {getStatusLabel(status)}

            <span
              className={`rounded-full px-2 py-0.5 text-xs ${
                selectedStatus === status
                  ? "bg-violet-100 text-violet-700"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {showCounts ? getStatusCount(status) : "-"}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default StatusFilterTabs;
