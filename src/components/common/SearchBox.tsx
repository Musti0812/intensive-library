interface Props {
  value: string;
  onChange: (value: string) => void;
}

function SearchBox({ value, onChange }: Props) {
  return (
    <input
      type="search"
      aria-label="Search titles or authors"
      placeholder="Search titles or authors..."
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="h-10 w-full max-w-md rounded-lg border border-input bg-background px-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
    />
  );
}

export default SearchBox;
