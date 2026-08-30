# DevKit

> Simple, fast and useful developer tools — all in one place.

DevKit is an open-source collection of browser-based developer utilities. Format JSON, decode JWTs, generate UUIDs, test regex, convert timestamps and more — without unnecessary setup or signup.

## 📸 Preview

![DevKit Preview](public/screenshots/devkit-home.png)

## 🌐 Live Demo

<https://devkit.pars-paris1.workers.dev/>

## ✨ Features

- ⚡ Fast and lightweight
- 🔒 Privacy-focused, client-side tools
- 🧰 Multiple developer utilities in one app
- 🔎 Search and filter across tools
- 👤 Account system (sign up / sign in) to save preferences
- 📱 Fully responsive design
- 🌐 No signup required to use the tools
- 🧑‍💻 100% open source

## 🛠️ Available Tools

| Tool                  | Description                       |
| ---------------------- | ---------------------------------- |
| JSON Formatter         | Format and validate JSON data      |
| JWT Decoder            | Decode and inspect JWT tokens      |
| UUID Generator         | Generate random UUIDs              |
| Regex Tester           | Test regular expressions           |
| Base64 Encoder         | Encode and decode Base64           |
| Timestamp Converter    | Convert Unix timestamps            |
| Hash Generator         | Generate secure hashes             |
| URL Encoder / Decoder  | Encode and decode URL components   |
| Color Converter        | Convert HEX, RGB and HSL colors    |
| Password Generator     | Generate strong random passwords   |

## 🧱 Built With

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) — animations
- [NextAuth.js (Auth.js) v5](https://authjs.dev/) — authentication
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) — password hashing
- [Lucide React](https://lucide.dev/) — icons
- [react-markdown](https://github.com/remarkjs/react-markdown)
- [Cloudflare Workers](https://workers.cloudflare.com/) + [OpenNext](https://opennext.js.org/cloudflare) — deployment
- [Cloudflare D1](https://developers.cloudflare.com/d1/) — database (used for user accounts)

## 🚀 Getting Started

### Requirements

- Node.js (LTS recommended)
- npm
- A [Cloudflare](https://dash.cloudflare.com/) account if you want to run authentication locally against D1, or deploy the project

### Installation

Clone the repository:

```bash
git clone https://github.com/parsarvs1/devkit.git
```

Enter the project:

```bash
cd devkit
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Authentication is powered by NextAuth with a Credentials provider backed by Cloudflare D1. Create a `.env.local` file with at least:

```bash
AUTH_SECRET=your-random-secret
```

You can generate a secret with:

```bash
npx auth secret
```

### Database (Cloudflare D1)

User accounts are stored in a D1 database (binding `DB`, table `users` with `id`, `name`, `email`, `password` columns — passwords hashed with bcrypt). The binding is configured in `wrangler.jsonc`. To work with the database locally or set up your own instance, use the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/):

```bash
npx wrangler d1 create devkit-db
```

Update `wrangler.jsonc` with your own `database_id`, then create the `users` table and run migrations as needed.

## 📦 Available Scripts

| Script          | Description                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the local development server    |
| `npm run build` | Build the app for production          |
| `npm run start` | Start the production server           |
| `npm run lint`  | Run ESLint                            |

## ☁️ Deployment

This project is built for deployment on **Cloudflare Workers** using OpenNext:

```bash
npm run build
npx wrangler deploy
```

Make sure `AUTH_SECRET` and your D1 binding are configured in your Cloudflare project settings before deploying.

## 📁 Project Structure

```
devkit/
├── app/                  # Next.js App Router pages
│   ├── about/
│   ├── tools/
│   └── page.tsx
│
├── components/           # Reusable UI components
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ToolCard.tsx
│
├── data/
│   └── tools.ts          # Tool definitions/metadata
│
├── lib/                  # Shared utilities/helpers
│
├── public/
│   └── screenshots/
│       └── devkit-home.png
│
├── auth.ts               # NextAuth configuration (Credentials + D1)
├── wrangler.jsonc         # Cloudflare Workers config (D1 binding, assets)
├── open-next.config.ts    # OpenNext config for Cloudflare deployment
├── package.json
└── README.md
```

## 🤝 Contributing

Contributions are welcome!

If you have an idea for a useful developer tool:

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Test the project locally
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⭐ Support

If you find DevKit useful, consider giving the repository a star on GitHub — it helps the project grow and reach more developers.

---

Built for developers.