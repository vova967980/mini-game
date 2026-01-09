# Mini Game — React + TypeScript + Vite

This project is a small interactive mini-game built with **React**, **TypeScript**, and **Vite**.
It uses a minimal setup focused on fast development, clean code, and modern tooling.

---

## 🚀 Getting Started

### Prerequisites
Make sure you have installed:
- **Node.js** ≥ 18
- **npm**, **pnpm**, or **yarn**

---

### 📦 Install dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```

---

### ▶️ Run the app in development mode
```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

After starting, open your browser at:
**http://localhost:5173**

Vite provides **Hot Module Replacement (HMR)**, so changes are applied instantly without a full reload.

---

### 🏗 Build for production
```bash
npm run build
# or
pnpm build
# or
yarn build
```

The production build will be generated in the `dist/` directory.

---

### 🔍 Preview production build
```bash
npm run preview
# or
pnpm preview
# or
yarn preview
```

This runs a local server to preview the production build.

---

### 🧹 Code Quality

**Run ESLint**
```bash
npm run lint
```

**Format code with Prettier**
```bash
npm run format
```

**Check formatting**
```bash
npm run format:check
```

---

## 🛠 Tech Stack
- React 19
- TypeScript
- Vite
- ESLint
- Prettier

---

## ℹ️ Notes

The React Compiler is not enabled by default due to its impact on development and build performance.
If needed, it can be added later following the official documentation:
https://react.dev/learn/react-compiler/installation

---

## 📁 Scripts Overview

- `dev` — start development server
- `build` — type-check and build for production
- `preview` — preview production build
- `lint` — run ESLint
- `format` — format code with Prettier
- `format:check` — check formatting without changes
