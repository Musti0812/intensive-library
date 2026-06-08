import { type SubmitHandler, useForm } from "react-hook-form";
import { getCategories } from "@/services/categoryService";
import { Field, FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { PlusIcon } from "lucide-react";
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
import {
  getLibraryItemTypes,
  saveLibraryItem,
} from "@/services/libraryService";
import type { Category, LibraryItemFormData, LibraryItemType } from "@/types";

const libraryItemSchema = z.object({
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
});

type FormData = z.infer<typeof libraryItemSchema>;

const DEFAULT_FORM_DATA: FormData = {
  title: "",
  acronym: undefined,
  libraryItemTypeId: "",
  categoryId: "",
  isBorrowable: true,
  author: undefined,
  nbrPages: 0,
  runTimeMinutes: 0,
};

function mapToLibraryItem(formData: FormData): LibraryItemFormData {
  return {
    title: formData.title,
    acronym: formData.acronym,
    libraryItemTypeId: formData.libraryItemTypeId,
    categoryId: formData.categoryId,
    isBorrowable: formData.isBorrowable,
    author: formData.author,
    nbrPages: formData.nbrPages,
    runTimeMinutes: formData.runTimeMinutes,
  };
}

interface Props {
  onSaved?: () => void;
}

function CreateArticleDialog({ onSaved }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [libraryItemTypes, setLibraryItemTypes] = useState<LibraryItemType[]>(
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(libraryItemSchema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM_DATA,
  });

  useEffect(() => {
    async function formOptions() {
      try {
        const categoriesResponse = await getCategories();
        const typesResponse = await getLibraryItemTypes();

        setCategories(categoriesResponse.data);
        setLibraryItemTypes(typesResponse.data);
      } catch (error) {
        console.log("Could not load categories or item types.", error);
      }
    }

    formOptions();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await saveLibraryItem(mapToLibraryItem(formData));
      reset(DEFAULT_FORM_DATA);
      onSaved?.();
    } catch (error) {
      console.log("Could not create the library item.", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button />}>
        <PlusIcon />
        Create Item
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Create library item</DialogTitle>
            <DialogDescription>
              Add a book, article, or media item to the collection.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <FieldGroup>
              <Field>
                <label htmlFor="libraryItemTypeId">Type</label>
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
                <Input
                  id="title"
                  placeholder="Title"
                  {...register("title")}
                />
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
                  min="0"
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
                <label htmlFor="runTimeMinutes">Runtime in Minutes</label>
                <Input
                  id="runTimeMinutes"
                  type="number"
                  min="0"
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
            </FieldGroup>
          </div>

          <DialogFooter showCloseButton={true} className="mt-5">
            <Button type="submit" disabled={!isValid}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateArticleDialog;
