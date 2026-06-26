# Aula AIP

Landing web para el Aula de Innovación Pedagógica de un colegio, creada con Next.js App Router, TypeScript y Tailwind CSS.

## Instalación

```bash
npm install
```

## Ejecutar en desarrollo

```bash
npm run dev
```

Abre `http://localhost:3000`.

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. Crea un proyecto en Vercel e importa el repositorio.
3. Usa los comandos por defecto de Next.js:
   - Build Command: `npm run build`
   - Output: automático
4. Configura variables de entorno si vas a conectar datos con Supabase.

## Supabase

La web no se rompe si Supabase no está configurado.

Para usar Supabase:

1. Crea un proyecto en Supabase.
2. Abre el SQL Editor.
3. Ejecuta el contenido de `supabase/schema.sql`.
4. Copia `NEXT_PUBLIC_SUPABASE_URL`.
5. Copia `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6. Crea un archivo `.env.local` basado en `.env.example`.
7. En Vercel, pega las mismas variables en Environment Variables.

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
```

## Estructura

```text
app/
  layout.tsx
  page.tsx
  globals.css
components/
  Header.tsx
  Hero.tsx
  FeatureCards.tsx
  NewsSection.tsx
  ProjectSection.tsx
  TeacherCard.tsx
  Footer.tsx
  DecorativeDoodles.tsx
lib/
  supabase.ts
supabase/
  schema.sql
```
