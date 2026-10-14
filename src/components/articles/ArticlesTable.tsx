import { ImageIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { LibraryItemWithStatus, SortColumn } from "@/types";
import ArticlesTableSkeleton from "./ArticlesTableSkeleton";
import BorrowerInfo from "./BorrowerInfo";
import CheckoutArticleDialog from "./CheckoutArticleDialog";
import EditArticleDialog from "./EditArticleDialog";
import StatusBadge from "./StatusBadge";

type Props = {
  libraryItems: LibraryItemWithStatus[];
  isLoading: boolean;
  isError: boolean;
  sortColumn: SortColumn;
  onSort: (path: string) => void;
  onCheckin: (id: string) => void;
  onDelete: (id: string) => void;
  isCheckinPending: boolean;
  isDeletePending: boolean;
};

function ArticlesTable({
  libraryItems,
  isLoading,
  isError,
  sortColumn,
  onSort,
  onCheckin,
  onDelete,
  isCheckinPending,
  isDeletePending,
}: Props) {
  function renderSortIcon(path: string) {
    if (path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <span>↑</span>;

    return <span>↓</span>;
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-card text-card-foreground">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow className="hover:bg-transparent">
            <TableHead className="px-4 text-xs text-muted-foreground">
              Title
            </TableHead>
            <TableHead className="px-4 text-xs text-muted-foreground">
              <button
                type="button"
                className="inline-flex cursor-pointer select-none items-center gap-1 transition-colors hover:text-foreground"
                onClick={() => onSort("libraryItemType.name")}
              >
                Type {renderSortIcon("libraryItemType.name")}
              </button>
            </TableHead>
            <TableHead className="px-4 text-xs text-muted-foreground">
              <button
                type="button"
                className="inline-flex cursor-pointer select-none items-center gap-1 transition-colors hover:text-foreground"
                onClick={() => onSort("category.name")}
              >
                Category {renderSortIcon("category.name")}
              </button>
            </TableHead>
            <TableHead className="px-4 text-xs text-muted-foreground">
              Author
            </TableHead>
            <TableHead className="px-4 text-xs text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="px-4 text-xs text-muted-foreground">
              Borrower
            </TableHead>
            <TableHead className="px-4 text-right text-xs text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isLoading && <ArticlesTableSkeleton />}
          {isError && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="px-4 py-12 text-center text-sm text-destructive"
              >
                Could not load library items.
              </TableCell>
            </TableRow>
          )}
          {!isLoading && !isError && libraryItems.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={7}
                className="px-4 py-12 text-center text-sm text-muted-foreground"
              >
                No library items match this filter.
              </TableCell>
            </TableRow>
          )}
          {libraryItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="px-4">
                <div className="flex items-center gap-3">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt="image"
                      className="h-12 w-9 shrink-0 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-9 shrink-0 items-center justify-center rounded bg-muted text-muted-foreground">
                      <ImageIcon className="size-4" aria-hidden="true" />
                    </div>
                  )}

                  <div>
                    <div className="font-medium">{item.title}</div>

                    {item.acronym && (
                      <div className="text-sm text-muted-foreground">
                        {item.acronym}
                      </div>
                    )}
                  </div>
                </div>
              </TableCell>
              <TableCell className="px-4">{item.libraryItemType.name}</TableCell>
              <TableCell className="px-4">{item.category.name}</TableCell>
              <TableCell className="px-4">{item.author}</TableCell>
              <TableCell className="px-4">
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell className="px-4">
                <BorrowerInfo
                  borrower={item.borrower}
                  borrowDate={item.borrowDate}
                  dueDate={item.dueDate}
                />
              </TableCell>
              <TableCell className="px-4">
                <div className="flex justify-end gap-2">
                  {item.status === "Available" && (
                    <CheckoutArticleDialog libraryItemId={item.id} />
                  )}
                  {item.status === "Loaned" && (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={isCheckinPending}
                      onClick={() => onCheckin(item.id)}
                    >
                      Check In
                    </Button>
                  )}
                  <EditArticleDialog libraryItem={item} />
                  <Button
                    variant="destructive"
                    size="sm"
                    className="w-7 px-0"
                    aria-label={`Delete ${item.title}`}
                    disabled={isDeletePending}
                    onClick={() => onDelete(item.id)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default ArticlesTable;
