import { useState } from "react";
import CategoryCard from "@/components/categories/CategoryCard";
import CategoryCardSkeleton from "@/components/categories/CategoryCardSkeleton";
import CreateCategoryDialog from "@/components/categories/CreateCategoryDialog";
import ListPagination from "@/components/common/ListPagination";
import SearchBox from "@/components/common/SearchBox";
import useCategories, { useDeleteCategory } from "@/hooks/useCategories";
import { paginate } from "@/utils/pagination";

const ITEMS_PER_PAGE = 9;

function CategoriesPage() {
  const { categories, isLoading, isError } = useCategories();
  const deleteCategory = useDeleteCategory();
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  const search = searchQuery.trim().toLowerCase();

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / ITEMS_PER_PAGE),
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedCategories = paginate(
    filteredCategories,
    ITEMS_PER_PAGE,
    currentPage,
  );

  function handleSearch(value: string) {
    setSearchQuery(value);
    setPage(1);
  }

  async function handleDelete(id: string) {
    try {
      await deleteCategory.mutateAsync(id);
    } catch (error) {
      console.log("Could not delete the category.", error);
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SearchBox
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search categories..."
        />
        <CreateCategoryDialog />
      </div>

      {isError && (
        <div className="rounded-xl border bg-card px-4 py-12 text-center text-sm text-destructive">
          Could not load categories.
        </div>
      )}

      {!isLoading && !isError && filteredCategories.length === 0 && (
        <div className="rounded-xl border bg-card px-4 py-12 text-center text-sm text-muted-foreground">
          {categories.length === 0
            ? "No categories yet."
            : "No categories match this search."}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <CategoryCardSkeleton />}

        {paginatedCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onDelete={handleDelete}
            isDeletePending={deleteCategory.isPending}
          />
        ))}
      </div>

      {!isLoading && !isError && filteredCategories.length > 0 && (
        <ListPagination
          currentPage={currentPage}
          pageSize={ITEMS_PER_PAGE}
          totalCount={filteredCategories.length}
          onPageChange={setPage}
          itemName="categories"
        />
      )}
    </section>
  );
}

export default CategoriesPage;
