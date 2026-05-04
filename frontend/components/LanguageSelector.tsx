import { Language } from '../types/doc';

export type LanguageFilter = Language | 'all';

interface Props {
  value: LanguageFilter;
  onChange: (value: LanguageFilter) => void;
}

export default function LanguageSelector({ value, onChange }: Props) {
  return (
    <label className="control">
      <span className="control__label">Language</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as LanguageFilter)}
        className="control__input"
        aria-label="Filter by language"
      >
        <option value="all">All</option>
        <option value="en">English</option>
        <option value="es">Español</option>
      </select>
    </label>
  );
}
