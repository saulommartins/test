import { useState } from 'react';
import { Doc } from '../types/doc';
import { summarizeDoc } from '../lib/api';

interface Props {
  doc: Doc;
}

const EXCERPT_LENGTH = 140;

export default function DocCard({ doc }: Props) {
  const [summary, setSummary] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSummarize() {
    setBusy(true);
    setError(null);
    try {
      const res = await summarizeDoc(doc.id, doc.body);
      setSummary(res.summary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to summarize');
    } finally {
      setBusy(false);
    }
  }

  const excerpt =
    doc.body.length > EXCERPT_LENGTH
      ? `${doc.body.slice(0, EXCERPT_LENGTH)}…`
      : doc.body;

  return (
    <article className="card">
      <header className="card__header">
        <h2 className="card__title">{doc.title}</h2>
        <span className="card__badge" aria-label={`Language ${doc.language}`}>
          {doc.language.toUpperCase()}
        </span>
      </header>
      <p className="card__excerpt">{excerpt}</p>
      <button
        type="button"
        onClick={handleSummarize}
        disabled={busy}
        className="card__button"
        aria-busy={busy}
      >
        {busy ? 'Summarizing…' : summary ? 'Re-summarize' : 'Summarize'}
      </button>
      {error && (
        <p role="alert" className="card__error">
          {error}
        </p>
      )}
      {summary && (
        <div className="card__summary" aria-live="polite">
          <strong>Summary:</strong> {summary}
        </div>
      )}
    </article>
  );
}
