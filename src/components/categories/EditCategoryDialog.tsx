import { PencilIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Field } from "../ui/field";

function EditCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <PencilIcon />
        Edit
      </DialogTrigger>

      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>
              Update the section name for this book category.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Field>
              <label className="mt-3">Edit Name</label>
              <Input id="categoryName" placeholder="Category name" />
            </Field>
          </div>
          <DialogFooter showCloseButton={true} className="mt-4">
            <Button>Edit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryDialog;
