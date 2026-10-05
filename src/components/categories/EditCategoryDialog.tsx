import { type SubmitHandler, useForm } from "react-hook-form";
import { useSaveCategory } from "@/hooks/useCategories";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon } from "lucide-react";
import type { Category } from "@/types";
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
  id: z.string(),
  name: z.string().min(1, { message: "Name is required." }),
});

type FormData = z.infer<typeof categorySchema>;

interface Props {
  category: Category;
}

function mapToFormData(category: Category): FormData {
  return {
    id: category.id,
    name: category.name,
  };
}

function EditCategoryDialog({ category }: Props) {
  const saveCategory = useSaveCategory();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(categorySchema),
    mode: "onChange",
    defaultValues: mapToFormData(category),
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await saveCategory.mutateAsync(formData);
      reset(formData);
    } catch (error) {
      console.log("Could not edit the category.", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="w-7 px-0"
            aria-label={`Edit ${category.name}`}
          />
        }
      >
        <PencilIcon />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>
              Update the section name for this book category.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Field>
              <label htmlFor="categoryName">Name</label>
              <input type="hidden" {...register("id")} />
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
          <DialogFooter showCloseButton={true} className="mt-5">
            <Button type="submit" disabled={!isValid || saveCategory.isPending}>
              Edit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryDialog;
