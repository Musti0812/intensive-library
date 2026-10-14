import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "@/components/ui/table";

const skeletonRows = [1, 2, 3, 4, 5];

function ArticlesTableSkeleton() {
  return skeletonRows.map((rowNumber) => (
    <TableRow key={rowNumber}>
      <TableCell className="px-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-12 w-9 shrink-0" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
      </TableCell>

      <TableCell className="px-4">
        <Skeleton className="h-4 w-20" />
      </TableCell>

      <TableCell className="px-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>

      <TableCell className="px-4">
        <Skeleton className="h-4 w-24" />
      </TableCell>

      <TableCell className="px-4">
        <Skeleton className="h-6 w-20 rounded-full" />
      </TableCell>

      <TableCell className="px-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-32" />
        </div>
      </TableCell>

      <TableCell className="px-4">
        <div className="flex justify-end gap-2">
          <Skeleton className="h-7 w-16" />
          <Skeleton className="size-7" />
          <Skeleton className="size-7" />
        </div>
      </TableCell>
    </TableRow>
  ));
}

export default ArticlesTableSkeleton;
