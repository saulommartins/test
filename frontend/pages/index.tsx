import Link from 'next/link';

export default function Home() {
  return (
    <main className="page">
      <h1 className="page__title">Docs Challenge</h1>
      <p>
        Go to{' '}
        <Link href="/docs" className="link">
          /docs
        </Link>
        .
      </p>
    </main>
  );
}
