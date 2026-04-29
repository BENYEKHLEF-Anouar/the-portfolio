# Anouar Benyekhlef — Editorial Portfolio
A high-fidelity, motion-driven editorial portfolio showcasing full-stack craft and design discipline. Built with **Editorial Engineering** principles using React 19, Vite, and Tailwind CSS v4.

---

## 🏛️ Editorial Engineering
This isn't just a portfolio; it's a digital exhibition. Inspired by premium editorial design and high-end technical documentation, every layout decision—from the 80px gutter padding to the "Liquid" transitions—is designed to prioritize **craft and intentionality** over generic templates.

### 🎥 Interaction Highlights
- **Editorial Glide**: A custom "Liquid" page transition system (0.8s) that uses scale and perspective travel to create a cinematic navigation experience.
- **The "Photo Stack"**: An interactive, physical-simulation stack on the About page. Drag and "toss" photos to tuck them smoothly behind the others with realistic mass and spring physics.
- **Infrastructure Sidebar**: A technical spec-sheet approach to project details, featuring sticky side-meta with branded `Cpu` iconography and magnetic action buttons.
- **Dual-Ring Intro**: A custom-branded loading experience featuring a high-contrast rotating spinner designed with precision CSS animations.
- **Smart Checkpoints**: Intelligent scroll restoration that remembers exactly where you were on the homepage when you return from a deep-dive case study.

---

## 🛠️ The Stack
Built on the bleeding edge of web performance and styling:

- **Framework**: [React 19](https://react.dev/) — Utilizing the latest concurrent rendering features.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) — Next-generation CSS utility engine via `@tailwindcss/vite`.
- **Motion**: [Framer Motion](https://www.framer.com/motion/) — Powering the physical simulations and liquid transitions.
- **Build**: [Vite 6](https://vitejs.dev/) — Lightning-fast development and optimized production bundling.
- **Typography**: **Plus Jakarta Sans** & **Inter** — For a modern, authoritative editorial feel.

---

## ✨ Key Design Decisions
- **Negative Space**: Generous whitespace to allow high-fidelity imagery and technical copy to breathe.
- **Magnetic UI**: All primary buttons use magnetic hover physics and glassmorphism to feel tactile and premium.
- **Data-Driven**: The entire site is powered by `profile.json`, making it trivial to update work and experience while maintaining the design system.
- **Performance**: Zero-config optimizations ensuring a sub-1s load time and perfect Lighthouse scores.

---

## 📂 Project Structure
```text
src/
├── components/
│   ├── Navbar.jsx           # Low-profile navigation with glassmorphism
│   ├── Footer.jsx           # Minimalist contact and links
│   ├── ContactCTA.jsx       # High-contrast conversion section
│   └── ProjectCard.jsx      # Depth-mapped work previews
├── pages/
│   ├── HomePage.jsx         # Staggered grid of selected works
│   ├── AboutPage.jsx        # Bio with interactive Photo Stack
│   └── ProjectDetailPage.jsx # Editorial case studies & Infrastructure sidebar
├── data/
│   └── profile.json         # Single source of truth for the entire site
├── index.css                # Global Design System (v4)
└── App.jsx                  # Navigation shell & Editorial Glide logic
```

---

## 🚀 Getting Started

1. **Clone & Install**:
   ```bash
   git clone https://github.com/BENYEKHLEF-Anouar/the-portfolio.git
   npm install
   ```

2. **Development**:
   ```bash
   npm run dev
   ```

3. **Build & Deploy**:
   ```bash
   npm run build
   # Build artifacts will be in /dist
   ```


---

**Crafted with attention to every pixel by [Anouar Benyekhlef](https://github.com/BENYEKHLEF-Anouar)**
