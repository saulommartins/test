interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <label className="control">
      <span className="control__label">Search</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Filter by title or text…"
        className="control__input"
        aria-label="Search documents"
      />
    </label>
  );
}
