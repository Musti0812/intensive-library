import { type SubmitHandler, useForm } from "react-hook-form";
import { Field, FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useLibraryItemTypes,
  useSaveLibraryItem,
} from "@/hooks/useLibraryItems";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useCategories from "@/hooks/useCategories";
import { PencilIcon } from "lucide-react";
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
import type { LibraryItem } from "@/types";

const libraryItemSchema = z.object({
  id: z.string(),
  title: z.string().min(1, { message: "Title is required." }),
  acronym: z.string().optional(),
  libraryItemTypeId: z.string().min(1, {
    message: "You must select a library item type.",
  }),
  categoryId: z.string().min(1, {
    message: "You must select a category.",
  }),
  isBorrowable: z.boolean(),
  author: z.string().optional(),
  nbrPages: z
    .number({ error: "Pages must be a number." })
    .min(0, { message: "Use 0 if pages do not apply." })
    .optional(),
  runTimeMinutes: z
    .number({ error: "Runtime must be a number." })
    .min(0, { message: "Use 0 if runtime does not apply." })
    .optional(),
  images: z
    .instanceof(FileList)
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        return ["image/png", "image/jpeg"].includes(fileList[0].type);
      },
      {
        message: "Only PNG and JPG images are allowed",
      },
    )
    .refine(
      (fileList) => {
        if (!fileList || fileList.length === 0) return true;
        return fileList[0].size <= 5_000_000;
      },
      {
        message: "Maximum file size allowed is 5 MB",
      },
    )
    .optional(),
});

type FormData = z.infer<typeof libraryItemSchema>;

interface Props {
  libraryItem: LibraryItem;
}

function mapToFormData(libraryItem: LibraryItem): FormData {
  return {
    id: libraryItem.id,
    title: libraryItem.title,
    acronym: libraryItem.acronym,
    libraryItemTypeId: libraryItem.libraryItemType.id,
    categoryId: libraryItem.category.id,
    isBorrowable: libraryItem.isBorrowable,
    author: libraryItem.author,
    nbrPages: libraryItem.nbrPages,
    runTimeMinutes: libraryItem.runTimeMinutes,
  };
}

function EditArticleDialog({ libraryItem }: Props) {
  const { categories } = useCategories();
  const { libraryItemTypes } = useLibraryItemTypes();
  const saveLibraryItem = useSaveLibraryItem();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(libraryItemSchema),
    mode: "onChange",
    defaultValues: mapToFormData(libraryItem),
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await saveLibraryItem.mutateAsync(formData);
      reset(formData);
    } catch (error) {
      console.log("Could not edit the library item.", error);
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
            aria-label="Edit item"
          />
        }
      >
        <PencilIcon />
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit library item</DialogTitle>
            <DialogDescription>
              Update this item in the library collection.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <FieldGroup>
              <input type="hidden" {...register("id")} />

              <Field>
                <label>Type</label>
                <select
                  id="libraryItemTypeId"
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  {...register("libraryItemTypeId")}
                >
                  <option value="">Select type</option>
                  {libraryItemTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
                {errors.libraryItemTypeId && (
                  <p className="text-sm text-destructive">
                    {errors.libraryItemTypeId.message}
                  </p>
                )}
              </Field>

              <Field>
                <label>Title</label>
                <Input id="title" placeholder="Title" {...register("title")} />
                {errors.title && (
                  <p className="text-sm text-destructive">
                    {errors.title.message}
                  </p>
                )}
              </Field>

              <Field>
                <label>Acronym</label>
                <Input
                  id="acronym"
                  placeholder="Optional acronym"
                  {...register("acronym")}
                />
              </Field>

              <Field>
                <label>Category</label>
                <select
                  id="categoryId"
                  className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  {...register("categoryId")}
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-sm text-destructive">
                    {errors.categoryId.message}
                  </p>
                )}
              </Field>

              <Field>
                <label>Author</label>
                <Input
                  id="author"
                  placeholder="Optional author"
                  {...register("author")}
                />
              </Field>

              <Field>
                <label>Pages</label>
                <Input
                  id="nbrPages"
                  type="number"
                  placeholder="Use 0 if not a book or article"
                  {...register("nbrPages", {
                    valueAsNumber: true,
                  })}
                />
                {errors.nbrPages && (
                  <p className="text-sm text-destructive">
                    {errors.nbrPages.message}
                  </p>
                )}
              </Field>

              <Field>
                <label>Runtime</label>
                <Input
                  id="runTimeMinutes"
                  type="number"
                  placeholder="Use 0 if not audio or video"
                  {...register("runTimeMinutes", {
                    valueAsNumber: true,
                  })}
                />
                {errors.runTimeMinutes && (
                  <p className="text-sm text-destructive">
                    {errors.runTimeMinutes.message}
                  </p>
                )}
              </Field>

              <Field orientation="horizontal">
                <Input
                  id="isBorrowable"
                  type="checkbox"
                  className="size-4"
                  {...register("isBorrowable")}
                />
                <label>Borrowable</label>
              </Field>

              <Field>
                <label>{libraryItem.imageUrl ? "Change Image" : "Image"}</label>
                <Input
                  type="file"
                  accept="image/png,image/jpeg"
                  {...register("images")}
                />
                {errors.images && (
                  <p className="text-sm text-destructive">
                    {errors.images.message}
                  </p>
                )}
              </Field>
            </FieldGroup>
          </div>

          <DialogFooter showCloseButton={true} className="mt-5">
            <Button
              type="submit"
              disabled={!isValid || saveLibraryItem.isPending}
            >
              Edit
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditArticleDialog;
