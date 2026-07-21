import CreateCategoryDialog from "@/components/categories/CreateCategoryDialog";
import EditCategoryDialog from "@/components/categories/EditCategoryDialog";
import useCategories, { useDeleteCategory } from "@/hooks/useCategories";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
        </div>
      </div>

      <CreateCategoryDialog />

      <div className="max-w-2xl rounded-lg border bg-card text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-center">Items</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>Loading categories...</TableCell>
              </TableRow>
            )}
            {isError && (
              <TableRow>
                <TableCell colSpan={3}>Could not load categories.</TableCell>
              </TableRow>
            )}
            {!isLoading && !isError && categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>No categories yet.</TableCell>
              </TableRow>
            )}
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-center">
                  {category.itemsCount}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <EditCategoryDialog category={category} />
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={category.itemsCount > 0 || deleteCategory.isPending}
                      onClick={() => handleDelete(category.id)}
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

export default CategoriesPage;
