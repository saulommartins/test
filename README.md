# Docs Challenge

Full-stack docs explorer with a Next.js frontend and an Express + TypeScript backend.

## Structure

```
docs-challenge/
├── backend/    Express + TypeScript API (port 4000)
└── frontend/   Next.js 14 UI (port 3000)
```

## Backend

REST API exposing two endpoints:

- `GET /api/docs` — returns 6 sample documents (mix of English and Spanish).
- `POST /api/summarize` — accepts `{ id, body }` and returns `{ id, summary }`. Uses a deterministic extractive algorithm that scores sentences by length, keyword presence and position, then returns the top two sentences in original order.

Source layout:

```
backend/src/
├── index.ts             Express bootstrap, middleware, error handling
├── routes/              Route handlers
├── services/            Summarization algorithm
├── data/                Sample docs
└── types.ts             Shared interfaces
```

### Run

```bash
cd backend
npm install
npm run dev
```

Backend listens on `http://localhost:4000`. Health check at `/health`.

## Frontend

Next.js page at `/docs` that:

- Fetches documents from the backend.
- Filters by free-text search (title or body) and by language (`en` / `es` / all).
- Shows the active region code in the header.
- Lets the user request a server-side summary per document, with per-card loading and error states.

Source layout:

```
frontend/
├── pages/
│   ├── _app.tsx         Global styles
│   ├── index.tsx        Landing
│   └── docs.tsx         Main page
├── components/          DocCard, SearchBar, LanguageSelector
├── lib/api.ts           Backend client (fetch)
├── types/doc.ts         Shared types
└── styles/globals.css
```

### Run

```bash
cd frontend
cp .env.example .env.local   # optional: defaults to http://localhost:4000
npm install
npm run dev
```

Open `http://localhost:3000/docs`.

## Quick start (both servers)

In two terminals:

```bash
# terminal 1
cd backend && npm install && npm run dev

# terminal 2
cd frontend && npm install && npm run dev
```
