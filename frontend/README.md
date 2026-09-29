# Bloom Tracker

A simple personal expense tracker built for home use.

## Live App

https://mum-expense-tracker.vercel.app/

## Stack

- React + TypeScript + Vite
- Tailwind CSS
- React Router
- TanStack Query
- Supabase PostgreSQL
- Vercel

## Architecture

The application is now frontend-only. The React app talks directly to the existing Supabase `expense` table through the Supabase REST Data API.

```text
React / Vercel
      ↓
Supabase REST API
      ↓
public.expense
```

The previous FastAPI/Render backend is no longer required.

## Existing Data

The application continues using the existing `public.expense` table. No data migration or table recreation is required.

Current columns:

- `id`
- `item`
- `category`
- `amount`
- `note`
- `dateField`
- `created_at`

## Features

- Add expenses
- Edit expenses
- Delete expenses
- Filter by category and date range
- Monthly spending summary
- Category breakdown
- Export expenses as CSV compatible with Excel/LibreOffice
- Installable PWA

## Local Setup

```bash
npm install
cp .env.example .env
npm run dev
```

Set these values in `.env`:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

The frontend uses the Supabase anon/public key only. Never put a Supabase service-role key in frontend environment variables.

## Build

```bash
npm run build
```

## Deployment

The frontend is deployed on Vercel. Render/FastAPI is not required for the application.

## Project Structure

```text
src/
├── components/
├── hooks/
├── pages/
├── services/
│   ├── expenses.ts
│   ├── summaries.ts
│   ├── supabase.ts
│   └── export.ts
├── types/
└── utils/
```

## Status

Completed and deployed for personal/home use.
