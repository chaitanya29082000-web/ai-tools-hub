# AI Tools Hub

A full-stack AI tools directory with a public dashboard and admin panel, built with React 19, TypeScript, and Tailwind CSS v4.

## Features

- **Public Dashboard** — Browse 33 AI tools across 12 categories with search and filtering
- **Category Navigation** — Click categories to filter tools instantly
- **Admin Panel** — CRUD operations for tools and categories with authentication
- **Responsive Layout** — Clean, spacious UI with consistent design system
- **Persistence** — Tools and categories saved to localStorage

## Tech Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- Lucide React (icons)
- React Router DOM v7

## Getting Started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Admin Access

- Navigate to `/admin/login`
- Credentials: `admin@aitoolshub.com` / `admin123`

> **Note:** Authentication is mocked. Do not use in production without a real backend.

## Project Structure

```
src/
  admin/          # Admin panel (auth, CRUD, layout)
  components/     # Public dashboard (sidebar, header, tools, categories)
  data/           # Mock data and icon mapping
  types/          # TypeScript interfaces
```

## Deployment

The `dist/` folder is the production build. Deploy to any static host (Vercel, Netlify, GitHub Pages).

For SPA routing on static hosts, add a redirect rule:
- **Netlify:** Create `_redirects` with `/* /index.html 200`
- **Vercel:** Add `{ "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }` to `vercel.json`
