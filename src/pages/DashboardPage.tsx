import CheckoutArticleDialog from "@/components/books/CheckoutArticleDialog";
import CreateArticleDialog from "@/components/books/CreateArticleDialog";
import EditArticleDialog from "@/components/books/EditArticleDialog";
import useLibraryItems from "@/hooks/useLibraryItems";
import { Button } from "@/components/ui/button";
import type { SortColumn } from "@/types";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import _ from "lodash";
import {
  checkinLibraryItem,
  deleteLibraryItem,
} from "@/services/libraryService";
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
  const { libraryItems, loadLibraryItems } = useLibraryItems();
  const [sortColumn, setSortColumn] = useState(getSavedSortColumn);

  const libraryItemsWithStatus = libraryItems.map((item) => ({
    ...item,
    status: getStatus(item.isBorrowable, item.borrower, item.borrowDate),
  }));

  const sortedLibraryItems = _.orderBy(
    libraryItemsWithStatus,
    sortColumn.path,
    sortColumn.order,
  );

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

  function showBorrowDate(date?: string) {
    if (!date) return "-";

    const dateObject = new Date(date);
    return dateObject.toLocaleDateString();
  }

  async function handleDelete(id: string) {
    try {
      await deleteLibraryItem(id);
      loadLibraryItems();
    } catch (error) {
      console.log("Could not delete the library item.", error);
    }
  }

  async function handleCheckin(id: string) {
    try {
      await checkinLibraryItem(id);
      loadLibraryItems();
    } catch (error) {
      console.log("Could not checkin the library item.", error);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Dashboard</h1>
        </div>
      </div>

      <CreateArticleDialog onSaved={loadLibraryItems} />

      <div className="rounded-lg border bg-card text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead onClick={() => handleSort("libraryItemType.name")}>
                Type {renderSortIcon("libraryItemType.name")}
              </TableHead>
              <TableHead onClick={() => handleSort("category.name")}>
                Category {renderSortIcon("category.name")}
              </TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Borrower</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedLibraryItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.title}
                  {item.acronym && (
                    <span className="ml-2 text-muted-foreground">
                      ({item.acronym})
                    </span>
                  )}
                </TableCell>
                <TableCell>{item.libraryItemType.name}</TableCell>
                <TableCell>{item.category.name}</TableCell>
                <TableCell>{item.author}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {item.borrower ? (
                    <div>
                      <div>{item.borrower}</div>
                      <div className="text-sm text-muted-foreground">
                        {showBorrowDate(item.borrowDate)}
                      </div>
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    {item.status === "Available" && (
                      <CheckoutArticleDialog
                        libraryItemId={item.id}
                        onSaved={loadLibraryItems}
                      />
                    )}
                    {item.status === "Loaned" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCheckin(item.id)}
                      >
                        Checkin
                      </Button>
                    )}
                    <EditArticleDialog
                      libraryItem={item}
                      onSaved={loadLibraryItems}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <TrashIcon />
                      <span>Delete</span>
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
