import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useCheckoutLibraryItem } from "@/hooks/useLibraryItems";
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
}

function CheckoutArticleDialog({ libraryItemId }: Props) {
  const [open, setOpen] = useState(false);
  const checkoutLibraryItem = useCheckoutLibraryItem();

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
      await checkoutLibraryItem.mutateAsync({
        id: libraryItemId,
        checkout: formData,
      });
      reset(DEFAULT_FORM_DATA);
      setOpen(false);
    } catch (error) {
      console.log("Could not checkout the library item.", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" size="sm" />}>
        Checkout
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Checkout item</DialogTitle>
            <DialogDescription>
              Enter the customer name. The loan period is 14 days.
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4">
            <Field>
              <label htmlFor="borrower">Borrower</label>
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
            <Button
              type="submit"
              disabled={!isValid || checkoutLibraryItem.isPending}
            >
              Checkout
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CheckoutArticleDialog;
