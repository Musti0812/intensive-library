import CreateCategoryDialog from "@/components/categories/CreateCategoryDialog";
import EditCategoryDialog from "@/components/categories/EditCategoryDialog";
import useCategories, { useDeleteCategory } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TrashIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const categorySkeletonRows = [1, 2, 3];

function CategoriesPage() {
  const { categories, isLoading, isError } = useCategories();
  const deleteCategory = useDeleteCategory();

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
        <h1 className="text-2xl font-semibold">Categories</h1>

        <CreateCategoryDialog />
      </div>

      <div className="max-w-2xl overflow-hidden rounded-xl border bg-card text-card-foreground">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent">
              <TableHead className="px-4 text-xs text-muted-foreground">
                Category
              </TableHead>
              <TableHead className="px-4 text-center text-xs text-muted-foreground">
                Items
              </TableHead>
              <TableHead className="px-4 text-right text-xs text-muted-foreground">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading &&
              categorySkeletonRows.map((rowNumber) => (
                <TableRow key={rowNumber}>
                  <TableCell className="px-4">
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell className="px-4">
                    <Skeleton className="mx-auto h-4 w-8" />
                  </TableCell>
                  <TableCell className="px-4">
                    <div className="flex justify-end gap-2">
                      <Skeleton className="size-7" />
                      <Skeleton className="size-7" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            {isError && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="px-4 py-12 text-center text-sm text-destructive"
                >
                  Could not load categories.
                </TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && categories.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="px-4 py-12 text-center text-sm text-muted-foreground"
                >
                  No categories yet.
                </TableCell>
              </TableRow>
            )}
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="px-4 font-medium">
                  {category.name}
                </TableCell>
                <TableCell className="px-4 text-center">
                  {category.itemsCount}
                </TableCell>
                <TableCell className="px-4">
                  <div className="flex justify-end gap-2">
                    <EditCategoryDialog category={category} />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="w-7 px-0"
                      aria-label={`Delete ${category.name}`}
                      disabled={category.itemsCount > 0 || deleteCategory.isPending}
                      onClick={() => handleDelete(category.id)}
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

export default CategoriesPage;
