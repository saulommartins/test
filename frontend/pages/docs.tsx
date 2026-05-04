import { useEffect, useMemo, useState } from 'react';
import { Doc } from '../types/doc';
import { fetchDocs } from '../lib/api';
import DocCard from '../components/DocCard';
import SearchBar from '../components/SearchBar';
import LanguageSelector, { LanguageFilter } from '../components/LanguageSelector';

export default function DocsPage() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<LanguageFilter>('all');

  useEffect(() => {
    const controller = new AbortController();
    fetchDocs(controller.signal)
      .then(setDocs)
      .catch((err: Error) => {
        if (err.name !== 'AbortError') setLoadError(err.message);
      });
    return () => controller.abort();
  }, []);

  const filtered = useMemo(() => {
    if (!docs) return [];
    const q = query.trim().toLowerCase();
    return docs.filter((d) => {
      if (language !== 'all' && d.language !== language) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) || d.body.toLowerCase().includes(q)
      );
    });
  }, [docs, query, language]);

  return (
    <main className="page">
      <header className="page__header">
        <h1 className="page__title">Documentation</h1>
        <p className="page__region" aria-live="polite">
          Region: <strong>{language.toUpperCase()}</strong>
        </p>
      </header>

      <div className="controls">
        <SearchBar value={query} onChange={setQuery} />
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      {loadError && (
        <div role="alert" className="alert alert--error">
          {loadError}
        </div>
      )}
      {!docs && !loadError && (
        <div role="status" className="alert">
          Loading documents…
        </div>
      )}
      {docs && filtered.length === 0 && (
        <p className="empty">No documents match your filters.</p>
      )}

      <ul className="grid">
        {filtered.map((doc) => (
          <li key={doc.id} className="grid__item">
            <DocCard doc={doc} />
          </li>
        ))}
      </ul>
    </main>
  );
}
