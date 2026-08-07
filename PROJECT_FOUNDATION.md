# Project Foundation Document

**Version:** 1.0
**Date:** 2026-07-25
**Status:** Locked for Alpha V1 → carries forward to true MVP
**Purpose:** Single source of truth for all design, technical, and process decisions before any development begins. This base is intentionally built for longevity.

---

## 1. Prerequisites

### 1.1 Design Assets (Figma)

- [ ] Complete Figma file containing:
  - Brand kit (logo variants, favicon, color tokens, typography scale, spacing)
  - High-fidelity designs for Alpha pages only:
    - Home (Hero, Vision & Mission, Our Work – 2 items, Team, Become a Member CTA)
    - Contact Us (Hero, Address + Map, Become a Member CTA)
    - Shared: Navbar, Footer, Loader states, 404, Maintenance
  - Mobile + Desktop variants
  - Exact final copy for all text content (this is the single source of truth for Alpha)
- [ ] Export assets: logo SVG/PNG, favicon set, any illustration/photo assets needed for Alpha
- **Owner:** Design
- **Location:** Shared Figma file (link to be added here once ready)

### 1.2 Flow Diagram (Excalidraw)

- [ ] Simple flow for the only interactive path in Alpha:
  ```
  Become a Member CTA → Razorpay Checkout (₹1,500 fixed membership fee) → Success page + transactional email via Resend
  ```
- Include error / cancel paths at a high level.
- **Owner:** Product / Tech lead
- **Location:** Excalidraw file (link to be added)

### 1.3 Decisions

1. create-payload-app
2. shadcn/ui
3. lucide-react
4. sans serif

---

## 2. Project Initialization (Longevity Base)

### 2.1 Bootstrap Command

```bash
npx create-payload-app@latest
```

**Recommended answers during prompts:**

- Project name: `newefoundation-website`
- Template: **blank**
- Database: **MongoDB**
- Package manager: **npm**

### 2.2 Immediate Post-Bootstrap Additions (Day 0)

```bash
# Core tooling already expected in original stack
npm install -D eslint prettier husky lint-staged @typescript-eslint/parser @typescript-eslint/eslint-plugin
npm install -D eslint-config-prettier eslint-plugin-prettier

# Tailwind + PostCSS (if approved)
npm install tailwindcss
# then set up according to current Tailwind v4 + Payload guidance

# React Compiler (experimental, as planned)
# Enable via next.config.ts experimental.reactCompiler

# Useful utilities that will survive into MVP
npm install clsx tailwind-merge class-variance-authority lucide-react
npm install zod                       # for future form validation
# install shadcn components as needed only
# Razorpay SDK will be added when payment route is built
```

Initialize Husky + lint-staged immediately so every commit is clean from day 1.

### 2.3 Canonical Folder Structure

```
.
├── app/
│   ├── (frontend)/                 # Public website (Alpha pages live here)
│   │   ├── layout.tsx
│   │   ├── page.tsx                # Home
│   │   ├── contact/
│   │   │   └── page.tsx
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── globals.css             # Tailwind + design tokens
│   ├── globals.css
│   ├── (payload)/                  # Admin panel (do not touch)
│   │   └── admin/
│   │       └── [[...segments]]/
│   └── api/
│       └── [...slug]/             # Payload REST/GraphQL
├── collections/                    # Payload collections (empty or minimal for Alpha)
│   ├── Users.ts
│   └── Media.ts
├── assets/
├── components/
│   ├── layout/                     # Navbar, Footer, Loader
│   ├── ui/                         # shadcn primitives (once added)
│   └── shared/
├── lib/
│   ├── utils.ts                    # cn() helper, etc.
│   └── constants.ts                # Hardcoded Alpha content can start here
├── features/feature-name
│   ├── layout/
│   ├── components/
│   ├── lib/
│   └── hooks/
├── services/
├── data/                         # sample data for alpha
├── public/
│   ├── favicon.ico
│   └── ...
├── payload.config.ts
├── next.config.ts
├── tailwind.config.ts              # or CSS-first Tailwind v4
├── tsconfig.json
├── .env.example
├── .prettierrc
├── eslint.config.mjs
└── package.json
```

**Key rules:**

- All public routes live under `app/(frontend)/`.
- Payload admin stays under `app/(payload)/`.
- Never put business logic or page components inside `(payload)`.
- Hardcoded Alpha content can live in `data` folder or directly in page files for maximum speed.

### 2.4 Global CSS & Design Tokens

`app/globals.css` (or equivalent) must contain:

```css
@import "tailwindcss";

/* Design tokens mapped from Figma */
:root {
  --color-primary: ...;
  --color-secondary: ...;
  --font-sans: ...;
  /* spacing, radius, etc. */
}
```

Use CSS variables so the same tokens can later power both frontend and any custom admin components.

### 2.5 Environment Variables (`.env.example`)

```env
# Database
DATABASE_URI=mongodb://...

# Payload
PAYLOAD_SECRET=long-random-string

# Site
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=

# Email
RESEND_API_KEY=
EMAIL_FROM=noreply@yourdomain.com

# Cloudinary (for later)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

```

Never commit real secrets. Use Vercel environment variables for all environments.

### 2.6 Core Config Files to Lock Early

- `payload.config.ts` — minimal (Users + Media only for Alpha). Add collections later.
- `next.config.ts` — enable React Compiler, image domains (Cloudinary + any CDNs), withPayload wrapper.
- ESLint + Prettier + Husky — enforce from first commit.
- `tsconfig.json` — strict mode.

---

## 4. Next Actions Checklist

- [ ] Finish Figma + export assets
- [ ] Finish Excalidraw membership flow
- [ ] Run `create-payload-app` with agreed options
- [ ] Apply folder structure + tooling from §2
- [ ] Implement Alpha pages + payment + email (maintain basic accessibility and semantic HTML)
- [ ] Deploy to final domain on Vercel

---

**Document maintained by:** Tech Lead
**Last updated:** 2026-07-25
