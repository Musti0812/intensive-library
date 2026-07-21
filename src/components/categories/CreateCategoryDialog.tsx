import { type SubmitHandler, useForm } from "react-hook-form";
import { useSaveCategory } from "@/hooks/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { Field } from "../ui/field";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const categorySchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
});

type FormData = z.infer<typeof categorySchema>;

const DEFAULT_FORM_DATA: FormData = {
  name: "",
};

function CreateCategoryDialog() {
  const saveCategory = useSaveCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM_DATA,
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await saveCategory.mutateAsync(formData);
      reset(DEFAULT_FORM_DATA);
    } catch (error) {
      console.log("Could not create the category.", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <PlusIcon />
        Create Category
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create category</DialogTitle>
            <DialogDescription>
              Add a category name so books can be organized by section.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Field>
              <label className="mt-3">Name</label>
              <Input
                id="categoryName"
                placeholder="Category name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </Field>
          </div>
          <DialogFooter showCloseButton={true} className="mt-4">
            <Button type="submit" disabled={!isValid || saveCategory.isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategoryDialog;
