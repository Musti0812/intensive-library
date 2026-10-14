import { Badge } from "@/components/ui/badge";
import { getStatusClass, getStatusLabel } from "@/utils/libraryItemStatus";

type Props = {
  status: string;
};

function StatusBadge({ status }: Props) {
  return (
    <Badge
      variant="secondary"
      className={`gap-1.5 rounded-full px-2.5 py-1 ${getStatusClass(status)}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {getStatusLabel(status)}
    </Badge>
  );
}

export default StatusBadge;
