# AZERX Padel - Frontend

This is the Angular frontend application for the AZERX Padel court booking system.

## 🎨 Design & Tech Stack
- **Angular 17+ (Standalone Components)**
- **Tailwind CSS & SCSS**
- **TypeScript**
- **Theme:** Premium Dark Mode (`#080b14`), Lime Accent (`#b8ff3c`), Glassmorphism.

## 📦 Setup & Installation

1. Ensure you have Node.js and NPM installed.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Update `src/environments/environment.ts` if your backend is not running on `http://localhost:8080/api`.
4. Run the development server:
   ```bash
   npm run start
   ```
5. Navigate to `http://localhost:4200/`.

## 🚀 Deployment
This app contains a `vercel.json` file designed to work seamlessly with Vercel deployment.
- **Build command:** `npx ng build`
- **Output directory:** `dist/padel-frontend/browser`
- The `vercel.json` handles the SPA fallback routing.

## 🔗 Route Structure
- **Auth:** `/login`, `/register`
- **Customer:** `/`, `/courts`, `/courts/:id`, `/my-bookings`, `/profile`
- **Admin:** `/admin/dashboard`, `/admin/courts`, `/admin/bookings`, `/admin/users`, `/admin/reviews`
