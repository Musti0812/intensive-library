import { checkoutLibraryItem } from "@/services/libraryService";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/field";
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

const checkoutSchema = z.object({
  borrower: z.string().min(1, { message: "Borrower is required." }),
});

type FormData = z.infer<typeof checkoutSchema>;

const DEFAULT_FORM_DATA: FormData = {
  borrower: "",
};

interface Props {
  libraryItemId: string;
  onSaved?: () => void;
}

function CheckoutArticleDialog({ libraryItemId, onSaved }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: DEFAULT_FORM_DATA,
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    try {
      await checkoutLibraryItem(libraryItemId, formData);
      reset(DEFAULT_FORM_DATA);
      onSaved?.();
    } catch (error) {
      console.log("Could not checkout the library item.", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Checkout
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Checkout item</DialogTitle>
            <DialogDescription>
              Enter the customer name for this loan.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Field>
              <label>Borrower</label>
              <Input
                id="borrower"
                placeholder="Customer name"
                {...register("borrower")}
              />
              {errors.borrower && (
                <p className="text-sm text-destructive">
                  {errors.borrower.message}
                </p>
              )}
            </Field>
          </div>

          <DialogFooter showCloseButton={true} className="mt-5">
            <Button type="submit" disabled={!isValid}>
              Checkout
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutArticleDialog;
