import { useState } from "react";
import _ from "lodash";
import ArticlesTable from "@/components/articles/ArticlesTable";
import CreateArticleDialog from "@/components/articles/CreateArticleDialog";
import StatusFilterTabs from "@/components/articles/StatusFilterTabs";
import ListPagination from "@/components/common/ListPagination";
import SearchBox from "@/components/common/SearchBox";
import useLibraryItems, {
  useCheckinLibraryItem,
  useDeleteLibraryItem,
} from "@/hooks/useLibraryItems";
import type { SortColumn } from "@/types";
import { getStatus } from "@/utils/libraryItemStatus";
import { paginate } from "@/utils/pagination";

const SORT_STORAGE_KEY = "dashboardSortColumn";
const ITEMS_PER_PAGE = 9;

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
  const [page, setPage] = useState(1);

  const libraryItemsWithStatus = libraryItems.map((item) => ({
    ...item,
    status: getStatus(item),
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

  const totalPages = Math.max(
    1,
    Math.ceil(sortedLibraryItems.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedLibraryItems = paginate(
    sortedLibraryItems,
    ITEMS_PER_PAGE,
    currentPage,
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
    setPage(1);
    sessionStorage.setItem(SORT_STORAGE_KEY, JSON.stringify(newSortColumn));
  }

  function handleStatusSelect(status: string) {
    setStatusFilter(status);
    setPage(1);
  }

  function handleSearch(value: string) {
    setSearchQuery(value);
    setPage(1);
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
      <StatusFilterTabs
        libraryItems={libraryItemsWithStatus}
        selectedStatus={statusFilter}
        showCounts={!isLoading && !isError}
        onStatusSelect={handleStatusSelect}
      />

      <div className="flex flex-wrap items-center justify-between gap-4">
        <SearchBox value={searchQuery} onChange={handleSearch} />
        <CreateArticleDialog />
      </div>

      <ArticlesTable
        libraryItems={paginatedLibraryItems}
        isLoading={isLoading}
        isError={isError}
        sortColumn={sortColumn}
        onSort={handleSort}
        onCheckin={handleCheckin}
        onDelete={handleDelete}
        isCheckinPending={checkinLibraryItem.isPending}
        isDeletePending={deleteLibraryItem.isPending}
      />

      {!isLoading && !isError && sortedLibraryItems.length > 0 && (
        <ListPagination
          currentPage={currentPage}
          pageSize={ITEMS_PER_PAGE}
          totalCount={sortedLibraryItems.length}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}

export default DashboardPage;
