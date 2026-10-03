<div align="center">

# 🧰 DevKit

**Simple, fast and useful developer tools — all in one place.**

Format JSON, decode JWTs, generate UUIDs, test regex, convert timestamps and more —
right in your browser, with no signup.

[**Live Demo**](https://devkit.pars-paris1.workers.dev/) · [Report a Bug](https://github.com/parsarvs1/devkit/issues) · [Request a Tool](https://github.com/parsarvs1/devkit/issues)

![License](https://img.shields.io/github/license/parsarvs1/devkit)
![Stars](https://img.shields.io/github/stars/parsarvs1/devkit?style=flat)
![Next.js](https://img.shields.io/badge/Next.js-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)

</div>

---

## 📸 Preview

![DevKit Preview](public/screenshots/devkit-new-home.png)

## ✨ Features

- ⚡ **Fast and lightweight** — results appear instantly
- 🔒 **Privacy-focused** — many tools run entirely in your browser
- 🧰 **22 developer utilities** in one place
- 🔎 **Search and filter** tools quickly
- ⌨️ **Command Palette** — press `Ctrl + K` to jump to any tool
- 📱 **Responsive design** — works on desktop and mobile
- 🌐 **No signup required**
- 🧑‍💻 **Open source** (MIT)

## 🛠️ Available Tools

| Tool                  | Description                        |
| --------------------- | ---------------------------------- |
| JSON Formatter        | Format, beautify and validate JSON |
| JWT Decoder           | Decode and inspect JWT tokens      |
| UUID Generator        | Generate random UUIDs              |
| Regex Tester          | Test and debug regular expressions |
| Base64 Encoder        | Encode and decode Base64           |
| Timestamp Converter   | Convert Unix timestamps            |
| Hash Generator        | Generate hashes                    |
| URL Encoder / Decoder | Encode and decode URL components   |
| Color Converter       | Convert between HEX, RGB and HSL   |
| Color Palette         | Generate color palettes            |
| Password Generator    | Generate strong random passwords   |
| JSON → TypeScript     | Convert JSON to TypeScript types   |
| JSON → Zod            | Convert JSON to Zod schemas        |

…and more. Browse the full list on the [Tools page](https://devkit.pars-paris1.workers.dev/tools).

## 🚀 Getting Started

### Requirements

- [Node.js](https://nodejs.org/) (LTS recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/parsarvs1/devkit.git

# Enter the project
cd devkit

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## 🧱 Built With

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Cloudflare Workers](https://workers.cloudflare.com/) (via OpenNext)

## 📁 Project Structure

```
devkit/
├── app/
│   ├── about/
│   ├── tools/
│   └── page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── ToolCard.tsx
├── data/
│   └── tools.ts
├── lib/
├── public/
│   └── screenshots/
│       └── devkit-home.png
├── package.json
└── README.md
```

## ➕ Adding a New Tool

1. Create a new page under `app/tools/<tool-slug>/`.
2. Register the tool in `data/tools.ts` (name, description, category, slug).
3. Test it locally with `npm run dev`.
4. Open a Pull Request.

## 🤝 Contributing

Contributions are welcome! If you have an idea for a useful developer tool:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/my-tool`)
3. Make your changes
4. Test the project
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before contributing.

## 🗺️ Roadmap

- [ ] Custom domain
- [ ] More tools (diff checker, cron parser, SQL formatter…)
- [ ] Per-tool documentation and examples
- [ ] PWA / offline support

## 📄 License

Released under the [MIT License](LICENSE).

## ⭐ Support

If you find DevKit useful, please consider giving the repository a star — it helps the project reach more developers.

<div align="center">

**Built for developers.**

</div>
