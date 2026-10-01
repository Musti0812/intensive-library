import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SearchBox({ value, onChange }: Props) {
  return (
    <div className="relative w-full max-w-md">
      <SearchIcon
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
      />

      <Input
        type="search"
        aria-label="Search titles or authors"
        placeholder="Search titles or authors..."
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-10 bg-card pl-10"
      />
    </div>
  );
}

export default SearchBox;
