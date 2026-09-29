# Bloom Tracker

A simple personal expense tracker for home use.

**Live App:** https://mum-expense-tracker.vercel.app/

## Tech Stack

- React + TypeScript + Vite
- Tailwind CSS
- TanStack Query
- Supabase PostgreSQL
- Vercel

## Features

- Add, edit, and delete expenses
- Category and date filtering
- Monthly and category summaries
- CSV export compatible with Excel
- Installable PWA

## Architecture

```text
React / Vercel
      ↓
Supabase REST API
      ↓
Existing `public.expense` table
```

The project no longer requires the previous FastAPI/Render backend.

## Local Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Set your Supabase project URL and anon/public key in `.env`.

## Data

The app uses the existing Supabase `public.expense` table. Existing records are kept as-is.

## Status

Completed and deployed for personal/home use.
