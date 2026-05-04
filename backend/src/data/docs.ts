import { Doc } from '../types';

export const DOCS: Doc[] = [
  {
    id: '1',
    title: 'Getting Started with React Hooks',
    language: 'en',
    body: 'React hooks let you use state and lifecycle features in functional components. The useState hook manages local state, while useEffect handles side effects. Hooks follow strict rules: only call them at the top level, and only from React functions. They were introduced in React 16.8.',
  },
  {
    id: '2',
    title: 'Introducción a Next.js',
    language: 'es',
    body: 'Next.js es un framework de React para construir aplicaciones web modernas. Ofrece renderizado del lado del servidor y generación estática. Sus rutas API permiten crear endpoints sin servidor adicional. Es ideal para proyectos que requieren rendimiento y SEO.',
  },
  {
    id: '3',
    title: 'Understanding TypeScript Generics',
    language: 'en',
    body: 'Generics enable reusable, type-safe components and functions. They act as placeholders that get replaced with concrete types when used. The syntax uses angle brackets, like Array<T>. Generics reduce duplication while preserving type information.',
  },
  {
    id: '4',
    title: 'Patrones de diseño en JavaScript',
    language: 'es',
    body: 'Los patrones de diseño son soluciones probadas a problemas comunes. El patrón módulo encapsula el estado privado mediante closures. El patrón observador permite que los objetos se suscriban a eventos. Aplicar patrones mejora la mantenibilidad del código.',
  },
  {
    id: '5',
    title: 'REST API Best Practices',
    language: 'en',
    body: 'A good REST API uses meaningful HTTP verbs and predictable resource paths. GET should never modify state, POST creates resources, and DELETE removes them. Return appropriate status codes: 200 for success, 404 for not found, 500 for server errors. Version your API to allow evolution.',
  },
  {
    id: '6',
    title: 'Accesibilidad web esencial',
    language: 'es',
    body: 'La accesibilidad web garantiza que todos puedan usar tu sitio. Usa etiquetas semánticas como nav, main y article. Asegura un contraste suficiente entre texto y fondo. Soporta navegación por teclado y agrega texto alternativo a las imágenes.',
  },
];
