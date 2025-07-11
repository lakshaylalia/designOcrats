# 🎨 DesignOcrafts

> A modern, visually-rich, and component-driven web experience built for the **Design-O-Crat** initiative — showcasing teams, events, projects, and more in a seamless, interactive way.

---

## 📸 Overview

DesignOcrafts is a modern, performant, and beautifully styled **React + Vite + Tailwind CSS** application. It's designed for student-led organizations or creative teams looking to highlight their events, members, and works in a compelling digital format.

It features a modular component architecture, responsive layout, smooth animations, and clean design principles tailored for fast development and ease of contribution.

---

## 🌐 Live Site

🔗 [Visit Live Website](https://your-deployed-site-link.com)

_Replace with your deployed URL (Vercel, Netlify, GitHub Pages, etc.)_

---

## 🧱 Tech Stack

| Tech                | Purpose                                    |
|---------------------|--------------------------------------------|
| ⚛️ React.js         | UI rendering using functional components   |
| ⚡ Vite             | Lightning-fast dev server & bundler        |
| 🎨 Tailwind CSS     | Utility-first modern styling framework     |
| 📦 Node.js + npm    | Package management & scripts               |
| 🗂️ Modular Folder Structure | Easy scalability and maintainability  |

---

## 📁 Folder Structure

```plaintext
designOcrafts/
├── public/                  # Static assets (images, favicons, etc.)
├── src/
│   ├── components/          # Core components for each section
│   │   ├── About/
│   │   ├── Background/
│   │   ├── Events/
│   │   ├── Footer/
│   │   ├── Gallery/
│   │   └── Team/
│   ├── ui/                  # Shared UI elements like Navbar
│   ├── data/                # Centralized data files (e.g., projects.ts)
│   ├── App.jsx              # Root React component
│   ├── main.jsx             # Entry point
│   ├── index.css            # Global Tailwind imports
├── postcss.config.cjs       # PostCSS configuration
├── tailwind.config.cjs      # Tailwind theme & plugin configuration
├── package.json             # Project metadata and scripts
└── README.md                # You’re reading it!
