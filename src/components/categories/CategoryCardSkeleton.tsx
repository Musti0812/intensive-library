import { Skeleton } from "@/components/ui/skeleton";

const skeletonCards = [1, 2, 3, 4, 5, 6];

function CategoryCardSkeleton() {
  return skeletonCards.map((cardNumber) => (
    <div
      key={cardNumber}
      className="flex items-center gap-3 rounded-xl border bg-card p-4"
    >
      <Skeleton className="size-10 shrink-0 rounded-lg" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-3 w-16" />
      </div>

      <div className="flex gap-2">
        <Skeleton className="size-7" />
        <Skeleton className="size-7" />
      </div>
    </div>
  ));
}

export default CategoryCardSkeleton;
