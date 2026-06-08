import CreateCategoryDialog from "@/components/categories/CreateCategoryDialog";
import EditCategoryDialog from "@/components/categories/EditCategoryDialog";
import { deleteCategory } from "@/services/categoryService";
import useCategories from "@/hooks/useCategories";
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
  const { categories, loadCategories } = useCategories();

  async function handleDelete(id: string) {
    await deleteCategory(id);
    loadCategories();
  }

  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
        </div>
      </div>

      <CreateCategoryDialog onSaved={loadCategories} />

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
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-center">
                  {category.itemsCount}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <EditCategoryDialog
                      category={category}
                      onSaved={loadCategories}
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={category.itemsCount > 0}
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
