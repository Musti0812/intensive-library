import { PencilIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const categories = [
  {
    id: 1,
    name: "Fiction",
    bookCount: 128,
  },
  {
    id: 2,
    name: "History",
    bookCount: 42,
  },
  {
    id: 3,
    name: "Science",
    bookCount: 89,
  },
  {
    id: 4,
    name: "Biography",
    bookCount: 31,
  },
];

function CategoriesPage() {
  return (
    <section className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Categories</h1>
          <p className="text-sm text-muted-foreground">
            Manage library categories and see how many books each one contains.
          </p>
        </div>
      </div>

      <Button>
        <PlusIcon />
        <span>Create Category</span>
      </Button>

      <div className="max-w-2xl rounded-lg border bg-card text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead className="text-center pl-[21px]">Books</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="text-center">
                  {category.bookCount}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <PencilIcon />
                      <span>Edit</span>
                    </Button>
                    <Button variant="destructive" size="sm">
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
