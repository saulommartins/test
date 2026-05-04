import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1>Docs Challenge</h1>
      <p>
        Go to <Link href="/docs" style={{ color: '#336' }}>/docs</Link>.
      </p>
    </main>
  );
}
