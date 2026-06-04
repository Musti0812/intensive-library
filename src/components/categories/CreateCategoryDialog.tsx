import { PlusIcon } from "lucide-react";
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

function CreateCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <PlusIcon />
        Create Category
      </DialogTrigger>

      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Create category</DialogTitle>
            <DialogDescription>
              Add a category name so books can be organized by section.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Field>
              <label className="mt-3">Name</label>
              <Input id="categoryName" placeholder="Category name" />
            </Field>
          </div>
          <DialogFooter showCloseButton={true} className="mt-4">
            <Button>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
