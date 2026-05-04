import { useEffect, useMemo, useState } from 'react';
import type { Doc } from './api/docs';

type Language = 'all' | 'en' | 'es';

export default function DocsPage() {
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<Language>('all');
  const [summaries, setSummaries] = useState<Record<string, string>>({});
  const [summaryErrors, setSummaryErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    fetch('/api/docs')
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load docs (${r.status})`);
        return r.json();
      })
      .then((data: Doc[]) => { if (!cancelled) setDocs(data); })
      .catch((err) => { if (!cancelled) setLoadError(err.message); });
    return () => { cancelled = true; };
  }, []);

  const filtered = useMemo(() => {
    if (!docs) return [];
    const q = query.trim().toLowerCase();
    return docs.filter((d) => {
      if (language !== 'all' && d.language !== language) return false;
      if (!q) return true;
      return d.title.toLowerCase().includes(q) || d.body.toLowerCase().includes(q);
    });
  }, [docs, query, language]);

  async function summarize(doc: Doc) {
    setBusy((s) => ({ ...s, [doc.id]: true }));
    setSummaryErrors((e) => ({ ...e, [doc.id]: '' }));
    try {
      const res = await fetch('/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: doc.id, body: doc.body }),
      });
      if (!res.ok) throw new Error(`Server ${res.status}`);
      const json = (await res.json()) as { id: string; summary: string };
      setSummaries((s) => ({ ...s, [doc.id]: json.summary }));
    } catch (err: any) {
      setSummaryErrors((e) => ({ ...e, [doc.id]: err.message ?? 'Failed' }));
    } finally {
      setBusy((s) => ({ ...s, [doc.id]: false }));
    }
  }

  return (
    <main style={s.main}>
      <header style={s.header}>
        <h1 style={s.h1}>Documentation</h1>
        <p style={s.region} aria-live="polite">
          Region: <strong>{language.toUpperCase()}</strong>
        </p>
      </header>

      <div style={s.controls}>
        <label style={s.label}>
          <span style={s.labelText}>Search</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter by title or text…"
            style={s.input}
            aria-label="Search documents"
          />
        </label>
        <label style={s.label}>
          <span style={s.labelText}>Language</span>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            style={s.input}
            aria-label="Filter by language"
          >
            <option value="all">All</option>
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </label>
      </div>

      {loadError && <div role="alert" style={s.error}>{loadError}</div>}
      {!docs && !loadError && <div role="status" style={s.status}>Loading documents…</div>}
      {docs && filtered.length === 0 && <p style={s.empty}>No documents match your filters.</p>}

      <ul style={s.grid}>
        {filtered.map((doc) => {
          const summary = summaries[doc.id];
          const error = summaryErrors[doc.id];
          const isBusy = busy[doc.id];
          return (
            <li key={doc.id} style={s.card}>
              <article>
                <h2 style={s.cardTitle}>{doc.title}</h2>
                <span style={s.badge} aria-label={`Language ${doc.language}`}>{doc.language.toUpperCase()}</span>
                <p style={s.excerpt}>
                  {doc.body.slice(0, 140)}{doc.body.length > 140 ? '…' : ''}
                </p>
                <button
                  type="button"
                  onClick={() => summarize(doc)}
                  disabled={isBusy}
                  style={s.button}
                  aria-busy={isBusy}
                >
                  {isBusy ? 'Summarizing…' : summary ? 'Re-summarize' : 'Summarize'}
                </button>
                {error && <p role="alert" style={s.errorInline}>{error}</p>}
                {summary && (
                  <div style={s.summary} aria-live="polite">
                    <strong>Summary:</strong> {summary}
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

const s: Record<string, React.CSSProperties> = {
  main: { maxWidth: 960, margin: '0 auto', padding: '1.5rem', fontFamily: 'system-ui, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '0.5rem' },
  h1: { fontSize: '1.75rem', margin: 0 },
  region: { margin: 0, fontSize: '0.9rem', color: '#666' },
  controls: { display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '1rem 0' },
  label: { display: 'flex', flexDirection: 'column', flex: '1 1 200px', minWidth: 160 },
  labelText: { fontSize: '0.85rem', color: '#444', marginBottom: 4 },
  input: { padding: '0.5rem 0.75rem', fontSize: '1rem', border: '1px solid #ccc', borderRadius: 6 },
  error: { padding: '0.75rem', background: '#fee', color: '#c00', borderRadius: 6, marginBottom: '1rem' },
  status: { padding: '0.75rem', background: '#f4f4f4', borderRadius: 6 },
  empty: { color: '#666' },
  grid: { listStyle: 'none', padding: 0, display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' },
  card: { border: '1px solid #e2e2e2', borderRadius: 8, padding: '1rem', background: '#fff' },
  cardTitle: { fontSize: '1.1rem', margin: '0 0 0.25rem' },
  badge: { display: 'inline-block', fontSize: '0.7rem', padding: '0.1rem 0.5rem', background: '#eef', color: '#336', borderRadius: 99, marginBottom: '0.5rem' },
  excerpt: { fontSize: '0.9rem', color: '#444', lineHeight: 1.4 },
  button: { padding: '0.4rem 0.8rem', fontSize: '0.9rem', border: '1px solid #336', background: '#336', color: '#fff', borderRadius: 6, cursor: 'pointer' },
  summary: { marginTop: '0.75rem', padding: '0.75rem', background: '#f4f8ff', borderLeft: '3px solid #336', fontSize: '0.9rem' },
  errorInline: { color: '#c00', fontSize: '0.85rem', marginTop: '0.5rem' },
};
