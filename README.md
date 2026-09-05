# Portfolio Website with Full Admin Dashboard

A premium, advanced developer portfolio website with a complete admin dashboard to manage **every single section** of the site — content, visibility, ordering, headings, and branding.

## Tech Stack

- **Frontend:** React, Tailwind CSS, Vite, React Router, Axios, React Icons
- **Backend:** Node.js, Express, PostgreSQL (pg), JWT auth, bcryptjs
- **Database:** PostgreSQL

## Features

### Premium Public Portfolio
A modern, dark, animated single-page portfolio with every section driven by the database:

- **Hero** — animated intro, code-window card, social links, CTA buttons
- **About** — bio, contact cards, quick facts panel
- **Stats** — animated counters (years, projects, clients, etc.)
- **Skills** — grouped by category with animated proficiency bars
- **Services** — what you offer, with icon + feature list
- **Projects** — featured (large cards) + regular grid, tags, demo/github links
- **Tools & Technologies** — grouped tool set
- **Experience** — timeline with current badges
- **Education** — academic cards
- **Certifications** — credential cards with links
- **Achievements** — award/milestone cards
- **Testimonials** — auto-rotating carousel with star ratings
- **Blog** — post cards with cover images, tags, read time
- **Contact** — form + contact info cards
- Fully responsive, scroll animations, back-to-top button

### Admin Dashboard (`/dashboard`)
JWT-secured panel to manage **everything**:

| Tab | What it manages |
|-----|-----------------|
| **Profile** | Name, title, bio, contact, social links, resume/avatar |
| **Sections & Settings** | ⭐ **Show/hide any section, set section order, edit every heading & subtitle**, plus site title, SEO description, tagline, and hero text |
| **Skills** | Add/edit/delete skills with category & proficiency |
| **Services** | Manage service offerings with icons & feature lists |
| **Projects** | Full CRUD, featured toggle, tags |
| **Experience** | Work history CRUD |
| **Education** | Academic CRUD |
| **Certifications** | Credential CRUD with dates & links |
| **Achievements** | Awards/milestones CRUD |
| **Stats** | Counter widgets CRUD |
| **Tools** | Tools & technologies CRUD |
| **Testimonials** | Testimonials CRUD with ratings |
| **Blog** | Posts CRUD with publish/draft toggle |
| **Messages** | Contact inbox, read/unread, delete |
| **Security** | Change admin password |

The **"Sections & Settings"** page is the most powerful — it lets you:
- Show or hide **any** section without touching code (e.g. hide the blog, hide certifications)
- Reorder sections by number (1, 2, 3...) to control the layout
- Edit the heading and subtitle of every section
- Change the site title, SEO description, tagline, and hero text

## Setup

### Prerequisites
- Node.js (v16+)
- PostgreSQL (running locally)

### 1. Create the database
```sql
CREATE DATABASE portfolio_db;
```

### 2. Backend
```bash
cd backend
npm install
copy .env.example .env   # then edit with your DB credentials
```

Recreate/update schema + seed settings & admin user:
```bash
npm run db:init
```

Load realistic sample content (projects, skills, services, certifications, testimonials, blog, stats, tools, achievements, experience, education):
```bash
npm run db:seed
```

Start the dev server:
```bash
npm run dev        # http://localhost:5000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:3000
```

## Default Login
- **Username:** `admin`
- **Password:** `admin123`

**Change it immediately** via Dashboard → Security.

## Production Build
```bash
cd frontend && npm run build
```
The backend serves the built `frontend/dist`, so `npm start` in `backend` serves the whole app on port 5000.

## Project Structure
```
├── backend/src/
│   ├── config/db.js          # PostgreSQL pool
│   ├── db/schema.sql         # Full DB schema (14 tables)
│   ├── db/init.js            # Schema + settings seed
│   ├── db/seed.js            # Sample content
│   ├── middleware/auth.js    # JWT auth
│   └── routes/               # auth, profile, skills, projects,
│                             #   experience, education, certificates,
│                             #   services, testimonials, stats, tools,
│                             #   achievements, blog, messages, settings
└── frontend/src/
    ├── api/client.js         # Axios instance
    ├── context/              # Auth + Settings contexts
    ├── components/           # Shared (Modal, Icon, SectionHeader, ...)
    ├── hooks/useFetch.js
    └── pages/
        ├── public/           # Portfolio site (all sections)
        └── dashboard/        # Admin panel (all managers)
```

## Deploying to Vercel + Supabase

The project is configured for **multi-service deployment** on Vercel
(frontend web service + backend web service) with **Supabase** as the managed
PostgreSQL database.

### 1. Create the Supabase database

1. Create a project at [supabase.com](https://supabase.com) and note:
   - **Database connection string** (Supabase Dashboard → Project Settings → Database → Connection string → URI): `postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:6543/postgres`
   - **JWT_SECRET**: any long random string.
2. Run the schema in the **SQL Editor**:
   ```sql
   -- paste the contents of backend/src/db/schema.sql into the SQL Editor and Run
   ```
3. Create the admin user + default settings. Run this in the SQL Editor
   (replace `admin123` with a strong password):
   ```sql
   INSERT INTO users (username, password)
   VALUES ('admin', '$2b$10$7EqJtq98hPqEX7fNZaFWoO5Ztz2y8g6M0NSw1X6XN0X1d0y2qyD9y'); -- bcrypt hash of 'admin123'
   ```
   > Note: `db:seed.js` seeds sample content and `db:init.js` creates the admin
   > user. To seed sample data, run `npm run db:seed` locally with
   > `DATABASE_URL` set to your Supabase connection string.

### 2. Deploy on Vercel

`vercel.json` at the repo root defines the multi-service layout and routes
`/api/*` to the backend and everything else to the frontend.

Set these **environment variables** in Vercel → Project → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | your Supabase connection URI |
| `JWT_SECRET` | a long random secret string |
| `CORS_ORIGIN` | your frontend URL, e.g. `https://mohit-portfolio.vercel.app` |

Then **Deploy** — Vercel builds the frontend (Vite) and backend (Express) as
separate web services automatically.

### 3. Log in
- URL: `https://<your-project>.vercel.app/dashboard`
- Username `admin`, password `admin123` (or whatever you hashed above).
  **Change it immediately** via Dashboard → Security.

## Security Notes
- Admin password hashing with bcrypt.
- JWT auth on all write routes; public read routes are open.
- Update `JWT_SECRET` in `backend/.env` (or Vercel env) before going live.
- Change the default password immediately.
