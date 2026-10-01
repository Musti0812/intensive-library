import CheckoutArticleDialog from "@/components/articles/CheckoutArticleDialog";
import CreateArticleDialog from "@/components/articles/CreateArticleDialog";
import EditArticleDialog from "@/components/articles/EditArticleDialog";
import SearchBox from "@/components/common/SearchBox";
import useLibraryItems, {
  useCheckinLibraryItem,
  useDeleteLibraryItem,
} from "@/hooks/useLibraryItems";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { SortColumn } from "@/types";
import { ImageIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import _ from "lodash";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SORT_STORAGE_KEY = "dashboardSortColumn";

const DEFAULT_SORT_COLUMN: SortColumn = {
  path: "category.name",
  order: "asc",
};

function getSavedSortColumn() {
  const savedSortColumn = sessionStorage.getItem(SORT_STORAGE_KEY);

  if (!savedSortColumn) return DEFAULT_SORT_COLUMN;

  return JSON.parse(savedSortColumn) as SortColumn;
}

function DashboardPage() {
  const { libraryItems, isLoading, isError } = useLibraryItems();
  const deleteLibraryItem = useDeleteLibraryItem();
  const checkinLibraryItem = useCheckinLibraryItem();
  const [sortColumn, setSortColumn] = useState(getSavedSortColumn);
  const [statusFilter, setStatusFilter] = useState("All items");
  const [searchQuery, setSearchQuery] = useState("");

  const libraryItemsWithStatus = libraryItems.map((item) => ({
    ...item,
    status: getStatus(item.isBorrowable, item.borrower, item.borrowDate),
  }));

  const search = searchQuery.trim().toLowerCase();

  const filteredLibraryItems = libraryItemsWithStatus.filter((item) => {
    const matchesStatus =
      statusFilter === "All items" || item.status === statusFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      (item.author ?? "").toLowerCase().includes(search);

    return matchesStatus && matchesSearch;
  });

  const sortedLibraryItems = _.orderBy(
    filteredLibraryItems,
    sortColumn.path,
    sortColumn.order,
  );

  const statusFilterOptions = [
    "All items",
    "Available",
    "Loaned",
    "Not for loan",
  ];

  function getStatusCount(status: string) {
    if (status === "All items") {
      return libraryItemsWithStatus.length;
    }

    return libraryItemsWithStatus.filter((item) => item.status === status)
      .length;
  }

  function handleSort(path: string) {
    let newSortColumn: SortColumn;

    if (path === sortColumn.path) {
      newSortColumn = {
        path,
        order: sortColumn.order === "asc" ? "desc" : "asc",
      };
    } else {
      newSortColumn = { path, order: "asc" };
    }

    setSortColumn(newSortColumn);
    sessionStorage.setItem(SORT_STORAGE_KEY, JSON.stringify(newSortColumn));
  }

  function renderSortIcon(path: string) {
    if (path !== sortColumn.path) return null;

    if (sortColumn.order === "asc") return <span>↑</span>;

    return <span>↓</span>;
  }

  function getStatus(
    isBorrowable: boolean,
    borrower?: string,
    borrowDate?: string,
  ) {
    if (borrower || borrowDate) return "Loaned";

    if (!isBorrowable) return "Not for loan";

    return "Available";
  }

  function getStatusClass(status: string) {
    if (status === "Available") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "Loaned") {
      return "bg-violet-100 text-violet-700";
    }

    return "bg-slate-100 text-slate-600";
  }

  function showBorrowDate(date?: string) {
    if (!date) return "-";

    const dateObject = new Date(date);
    return dateObject.toLocaleDateString();
  }

  async function handleDelete(id: string) {
    try {
      await deleteLibraryItem.mutateAsync(id);
    } catch (error) {
      console.log("Could not delete the library item.", error);
    }
  }

  async function handleCheckin(id: string) {
    try {
      await checkinLibraryItem.mutateAsync(id);
    } catch (error) {
      console.log("Could not checkin the library item.", error);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b">
        <div className="flex max-w-full overflow-x-auto">
          {statusFilterOptions.map((status) => (
            <button
              key={status}
              type="button"
              aria-pressed={statusFilter === status}
              onClick={() => setStatusFilter(status)}
              className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium ${
                statusFilter === status
                  ? "border-violet-600 text-violet-700"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {status === "Loaned" ? "On loan" : status}

              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  statusFilter === status
                    ? "bg-violet-100 text-violet-700"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isLoading || isError ? "-" : getStatusCount(status)}
              </span>
            </button>
          ))}
        </div>

        <CreateArticleDialog />
      </div>

      <SearchBox value={searchQuery} onChange={setSearchQuery} />

      <div className="overflow-hidden rounded-xl border bg-card text-card-foreground">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4 text-xs text-muted-foreground">
                Title
              </TableHead>
              <TableHead
                className="px-4 text-xs text-muted-foreground"
                onClick={() => handleSort("libraryItemType.name")}
              >
                Type {renderSortIcon("libraryItemType.name")}
              </TableHead>
              <TableHead
                className="px-4 text-xs text-muted-foreground"
                onClick={() => handleSort("category.name")}
              >
                Category {renderSortIcon("category.name")}
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
            {isLoading && (
              <TableRow>
                <TableCell colSpan={7} className="px-4">
                  Loading library...
                </TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={7} className="px-4">
                  Could not load library items.
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && sortedLibraryItems.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="px-4">
                  No library items match this filter.
                </TableCell>
              </TableRow>
            )}
            {sortedLibraryItems.map((item) => (
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
                  <Badge
                    variant="secondary"
                    className={`gap-1.5 rounded-full px-2.5 py-1 ${getStatusClass(item.status)}`}
                  >
                    <span
                      aria-hidden="true"
                      className="size-1.5 rounded-full bg-current"
                    />
                    {item.status === "Loaned" ? "On loan" : item.status}
                  </Badge>
                </TableCell>
                <TableCell className="px-4">
                  {item.borrower ? (
                    <div>
                      <div>{item.borrower}</div>
                      <div className="text-sm text-muted-foreground">
                        Checked out: {showBorrowDate(item.borrowDate)}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Due: {showBorrowDate(item.dueDate)}
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
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
                        disabled={checkinLibraryItem.isPending}
                        onClick={() => handleCheckin(item.id)}
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
                      disabled={deleteLibraryItem.isPending}
                      onClick={() => handleDelete(item.id)}
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
    </section>
  );
}

export default DashboardPage;
