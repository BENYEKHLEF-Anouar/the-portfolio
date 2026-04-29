# X-Portfolio: Developer Profile Edition

A high-fidelity, high-performance developer portfolio mimicking the iconic UI/UX of a Twitter (X) profile page. Built with the latest React ecosystem and a focus on clean code, responsive design, and data-driven content.

![Banner](/public/banner.png)

## 🚀 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) via `@tailwindcss/vite` plugin
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Utilities**: `clsx`, `tailwind-merge`

## ✨ Key Features

- **🎯 Exact UI Replication**: Pixel-perfect mimicry of the X profile layout, including sidebars, sticky headers, and feed structure.
- **📱 Responsive by Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **📄 Data-Driven**: Entirely powered by a single `profile.json` file for easy updates without touching the component logic.
- **🌑 Premium Dark Mode**: Implements X's "Lights Out" theme as the primary aesthetic.
- **🔄 Interactive Tabs**: Smooth state-based navigation between Projects, Experience, Skills, and About sections.
- **⚡ Performance First**: Zero-config optimization via Vite 8 and Tailwind v4's lightning-fast engine.

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components (Sidebar, ProfileHeader, etc.)
├── data/               # Project data source (profile.json)
├── lib/                # Utility functions (cn helper)
├── App.jsx             # Main application shell and state logic
├── index.css           # Global styles and Tailwind v4 theme configuration
└── main.jsx            # Application entry point
public/                 # Static assets (banner, profile picture)
```

## 🛠️ Getting Started

### Prerequisites

- Node.js (v24+ recommended)
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd personal-portfolio-profile
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

### Production Build

To create an optimized production bundle:
```bash
npm run build
```
The build artifacts will be located in the `dist/` directory.

## ⚙️ Customization

Adapting this portfolio to your own profile is simple. All content is abstracted into `src/data/profile.json`.

```json
{
  "name": "Your Full Name",
  "handle": "your_handle",
  "bio": "Your professional bio...",
  "location": "City, Country",
  "website": "https://yourwebsite.dev",
  "joinedDate": "Month Year",
  "projects": [...],
  "experience": [...],
  "skills": [...]
}
```

Simply replace the values in the JSON file and update the assets in the `public/` folder to reflect your personal brand.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for new features or improvements, feel free to open an issue or submit a pull request.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

Developed with ❤️ by [Mohamed Sadiq](https://mohamedsadiq.com)
