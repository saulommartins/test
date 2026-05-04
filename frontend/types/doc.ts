export type Language = 'en' | 'es';

export interface Doc {
  id: string;
  title: string;
  language: Language;
  body: string;
}

export interface SummarizeResponse {
  id: string;
  summary: string;
}
