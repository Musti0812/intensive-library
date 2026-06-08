import { type SubmitHandler, useForm } from "react-hook-form";
import { saveCategory } from "@/services/categoryService";
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
  onSaved?: () => void;
}

function mapToFormData(category: Category): FormData {
  return {
    id: category.id,
    name: category.name,
  };
}

function EditCategoryDialog({ category, onSaved }: Props) {
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
      await saveCategory(formData);
      reset(formData);
      onSaved?.();
    } catch (error) {
      console.log("Could not edit the category.", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        <PencilIcon />
        Edit
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit category</DialogTitle>
            <DialogDescription>
              Update the section name for this book category.
            </DialogDescription>
          </DialogHeader>

          <div>
            <Field>
              <label className="mt-3">Edit Name</label>
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
          <DialogFooter showCloseButton={true} className="mt-4">
            <Button type="submit" disabled={!isValid}>
              Edit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditCategoryDialog;
