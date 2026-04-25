Reviewing the repository configuration and dependencies to summarize the tech stack.

Read [](file:///c%3A/Users/acer/OneDrive%20-%20cytroksys/Documents/Projects/cytroksys/package.json)

Read [](file:///c%3A/Users/acer/OneDrive%20-%20cytroksys/Documents/Projects/cytroksys/README.md)

Collecting a couple key config files to make the stack explanation precise.

Read [](file:///c%3A/Users/acer/OneDrive%20-%20cytroksys/Documents/Projects/cytroksys/vite.config.js)

Read [](file:///c%3A/Users/acer/OneDrive%20-%20cytroksys/Documents/Projects/cytroksys/server/index.js#1-1), lines 1 to 200

Read [](file:///c%3A/Users/acer/OneDrive%20-%20cytroksys/Documents/Projects/cytroksys/src/lib/firebase.js)

## Project Tech Stack

### Frontend
- **React 18** — UI library for building the SPA.
- **Vite** — dev server and build tool.
- **Tailwind CSS v4** + **PostCSS** — utility-first styling.
- **React Router DOM** — client-side routing.
- **Framer Motion** — animations and transitions.
- **React Hook Form** — form handling.
- **lucide-react** / **react-icons** — icon sets.

### Backend / API
- **Node.js** with **Express 5** — custom API server in index.js.
- **dotenv** — environment configuration.
- **Nodemailer** — SMTP email sending.
- Optional **Microsoft Graph** integration for mail send if configured.

### Firebase
- **Firebase JS SDK v12**
  - `firebase/auth`
  - `firebase/firestore`
  - `firebase/storage`
  - `firebase/analytics`
- Config is loaded from Vite env vars in firebase.js.

### Tooling
- **ESLint** with `@eslint/js`, React hooks plugin, and React refresh plugin.
- **Vite plugin React** for JSX support.
- **Docker Compose** support via docker-compose.yml and scripts.
- package.json scripts for `dev`, `build`, `preview`, `api:start`, and seed scripts.

### Architecture
- Frontend is a Vite-powered React app served on the browser.
- Backend is a separate Express API process listening on `8787`.
- Vite proxies `/api` requests to the backend.
- Email/OTP flow is handled server-side and the app also uses Firebase for auth/data/storage.

If you want, I can also map the stack to specific folders like which parts are frontend vs admin vs API.