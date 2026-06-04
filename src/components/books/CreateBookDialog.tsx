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
import { Field, FieldGroup } from "../ui/field";

function CreateBookDialog() {
  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <PlusIcon />
        Create Book
      </DialogTrigger>

      <DialogContent>
        <form>
          <DialogHeader>
            <DialogTitle>Create category</DialogTitle>
            <DialogDescription>
              Add a category name so books can be organized by section.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-3">
            <FieldGroup>
              <Field>
                <label>Type</label>
                <Input
                  id="typeName"
                  placeholder="This is gonna be a selection !!!"
                />
              </Field>
              <Field>
                <label>Title</label>
                <Input id="titleName" placeholder="Title name" />
              </Field>
              <Field>
                <label>Category</label>
                <Input
                  id="categoryName"
                  placeholder="This is gonna be a selection !!!"
                />
              </Field>
              <Field>
                <label>Author's name</label>
                <Input id="authorName" placeholder="Name" />
              </Field>
              <Field>
                <label>Amount of pages</label>
                <Input id="pagesNbr" placeholder="E.g 320" />
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter showCloseButton={true} className="mt-5">
            <Button>Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBookDialog;
