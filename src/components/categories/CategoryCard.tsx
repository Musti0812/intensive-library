import { FolderIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Category } from "@/types";
import EditCategoryDialog from "./EditCategoryDialog";

type Props = {
  category: Category;
  onDelete: (id: string) => void;
  isDeletePending: boolean;
};

function getItemsText(itemsCount: number) {
  if (itemsCount === 0) return "No items yet";

  if (itemsCount === 1) return "1 item";

  return `${itemsCount} items`;
}

function CategoryCard({ category, onDelete, isDeletePending }: Props) {
  const hasItems = category.itemsCount > 0;

  const deleteButton = (
    <Button
      variant="destructive"
      size="sm"
      className="w-7 px-0"
      aria-label={`Delete ${category.name}`}
      disabled={hasItems || isDeletePending}
      onClick={() => onDelete(category.id)}
    >
      <TrashIcon />
    </Button>
  );

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-card p-4 text-card-foreground">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
        <FolderIcon className="size-5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{category.name}</div>
        <div className="text-sm text-muted-foreground">
          {getItemsText(category.itemsCount)}
        </div>
      </div>

      <div className="flex shrink-0 gap-2">
        <EditCategoryDialog category={category} />

        {hasItems ? (
          <Tooltip>
            <TooltipTrigger render={<span className="inline-flex" />}>
              {deleteButton}
            </TooltipTrigger>
            <TooltipContent>Remove its items first</TooltipContent>
          </Tooltip>
        ) : (
          deleteButton
        )}
      </div>
    </div>
  );
}

export default CategoryCard;
