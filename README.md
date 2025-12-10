# Maps For Mom 🗺️✈️

A modern, accessible travel itinerary curation platform built with Astro, designed to help busy travelers create personalized travel experiences without the stress of planning.

![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=flat&logo=astro&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-000000?style=flat&logo=vercel&logoColor=white)

## 🌟 About

Maps For Mom specializes in crafting personalized travel itineraries for those who are short on time but long on wanderlust. Inspired by moms who expertly plan family trips, this platform serves everyone seeking unforgettable travel experiences.

### What Makes Us Different

- **🎯 Handpick Experiences**: Curate destinations and experiences tailored to travelers' desires, from hidden gems to luxury spa weekends
- **🔗 Create Cohesive Journeys**: Design seamless adventures rather than disconnected activities  
- **💎 Attention to Details**: Focus on creating memories and stories, not just ticking off destinations

## 🚀 Tech Stack

- **Framework**: [Astro 5.16.2](https://astro.build) with SSR (Server-Side Rendering)
- **Styling**: [Tailwind CSS 4.1.17](https://tailwindcss.com) with custom theme
- **Icons**: [Lucide Astro](https://lucide.dev) for beautiful, consistent icons
- **Deployment**: [Vercel](https://vercel.com) with optimized image service
- **Package Manager**: pnpm 10.x

## ✨ Features

- �� **Modern Design**: Clean, responsive UI with custom color palette
- ♿ **Accessibility First**: WCAG compliant with proper ARIA labels and semantic HTML
- 🖼️ **Optimized Images**: Automatic image optimization with Astro Assets
- 📱 **Mobile Responsive**: Fluid layouts that work on any device
- 🎯 **SEO Optimized**: Built-in sitemap and meta tags
- 🔤 **Custom Typography**: Montserrat font family with optimized loading
- ⚡ **Performance**: Fast loading times with SSR and optimized assets
- 🌐 **Server-Side Rendering**: Dynamic content with Vercel edge functions

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 10.x (recommended) or npm

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/jhossuarodriguez/maps-for-mom.git

# Navigate to project directory
cd maps-for-mom

# Install dependencies
pnpm install

# Start development server
pnpm dev
\`\`\`

The site will be available at \`http://localhost:4321\`

## 🧞 Commands

All commands are run from the root of the project:

| Command | Action |
| :--- | :--- |
| \`pnpm install\` | Install dependencies |
| \`pnpm dev\` | Start local dev server at \`localhost:4321\` |
| \`pnpm build\` | Build production site to \`./dist/\` |
| \`pnpm preview\` | Preview production build locally |
| \`pnpm astro ...\` | Run Astro CLI commands |

## 📁 Project Structure

\`\`\`
maps-for-mom/
├── public/
│   ├── fonts/
│   │   ├── montserrat-normal.woff2
│   │   └── montserrat-800.woff2
│   └── favicon.webp
├── src/
│   ├── assets/
│   │   ├── Logo.webp
│   │   ├── background.webp
│   │   └── CTAImages/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── AboutBrief.astro
│   │   ├── ExperiencesSection.astro
│   │   ├── ProcessSection.astro
│   │   ├── CTASection.astro
│   │   ├── ContactSection.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about/
│   │   ├── gallery/
│   │   └── getIntinerary/
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tsconfig.json
└── package.json
\`\`\`

## 🎨 Design System

### Color Palette

\`\`\`css
--color-primary: #D19789     /* Warm terracotta */
--color-secondary: #95a799   /* Sage green */
--color-thirdary: #eee7df    /* Cream */
--color-foreground: oklch(0.145 0 0)  /* Dark text */
\`\`\`

### Typography

- **Font Family**: Montserrat
- **Weights**: 400 (Normal), 800 (Bold)
- **Format**: WOFF2 for optimal performance

## 🚢 Deployment

This project is configured for deployment on Vercel with SSR enabled.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jhossuarodriguez/maps-for-mom)

### Environment Variables

No environment variables required for basic deployment.

## 📝 Pages

- **Home** (\`/\`): Landing page with hero, services, and contact form
- **About** (\`/about/about\`): Team information and mission
- **Gallery** (\`/gallery/gallery\`): Travel inspiration gallery
- **Get Itinerary** (\`/getIntinerary/getIntinerary\`): Custom itinerary request form

## 🤝 Contributing

This is a private project. For inquiries, please contact the team.

## 📞 Contact

- **Website**: [mapsformom.com](https://mapsformom.com)
- **Email**: hello@mapsformom.com
- **Phone**: (208) 555-0112
- **Location**: Miami, FL, USA

### Social Media

- [Facebook](https://www.facebook.com/mapsformom/)
- [Instagram](https://www.instagram.com/mapsformom/)
- [YouTube](https://www.youtube.com/@mapsformom)

## 📄 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

- Built with [Astro](https://astro.build)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Icons by [Lucide](https://lucide.dev)
- Deployed on [Vercel](https://vercel.com)

---

**Made with ❤️ by travel enthusiasts for travelers worldwide**
