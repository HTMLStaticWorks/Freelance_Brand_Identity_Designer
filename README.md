# AURA Studio — Brand Identity Designer HTML Template

A premium, creative, minimal, and editorial HTML template built specifically for Freelance Brand Identity Designers, Logo Strategists, and Creative Branding Studios. Designed with ThemeForest commercial-grade quality, focusing on logo systems, visual strategy, color tokens, and accessible typography hierarchies.

---

## 💎 Key Features

- **Double Themes**: Working Light & Dark modes, toggled via header buttons and synced across all pages using `localStorage`.
- **Contrast Checkers**: Interactive color swatches that copy HSL/HEX values directly to the clipboard when clicked.
- **Systematic Typography**: Editorial size progression using a Major Third (1.250) scale, utilizing Sora (Headings) and Inter (Body).
- **Responsive Layouts**: Fluid structures tested across standard desktop sizes, tablets, mobile ports (320px, 375px, 425px), and ultra-wides.
- **GSAP Animations**: Fluid scrolling animations, image reveals, and staggered grid presentations (with pure CSS IntersectionObserver transitions fallback).
- **Interactive Calendar**: Mock calendar interface for booking discovery sessions.
- **Contact Forms**: Simulated contact planners and newsletter dispatchers with custom toast alerts.

---

## 🎨 Global Design System

### Typography
- **Headings**: Sora (Geometric, premium visual rhythm)
- **Body Text**: Inter (Sourced for legibility on small digital displays)

### Color Palette Tokens

| Token Name | Light Mode Value | Dark Mode Value | CSS Variable Name |
|---|---|---|---|
| **Designer Black** | `#111827` | `#F9FAFB` (Text) | `--color-primary` |
| **Warm Gray** | `#6B7280` | `#9CA3AF` | `--color-secondary` |
| **Creative Accent** | `#7C3AED` | `#8B5CF6` | `--color-accent` |
| **Gold Highlight** | `#F59E0B` | `#FBBF24` | `--color-highlight` |
| **Background** | `#FAFAFA` | `#030712` | `--bg-primary` |
| **Surface** | `#FFFFFF` | `#111827` | `--bg-surface` |

---

## 📂 Folder Structure

```
/brand-identity-designer-website/
│
├── index.html                  # Main editorial landing page
├── home-2.html                 # Minimal typography-driven split layout
├── services.html               # Service list, deliverables, and FAQ accordion
├── service-details.html        # Detailed services presentation & pricing tiers
├── case-studies.html           # Grid-based portfolio case studies list
├── case-study-details.html     # Rebrand study details with typography specimens
├── brand-guidelines.html       # Logo usage rules and interactive color copier
├── discovery-call.html         # Mock calendar consultation booking interface
├── blog.html                   # Branding strategy articles listing page
├── blog-details.html           # Single blog layout with code specs & blockquotes
├── contact.html                # Inquiry form with budget selectors & studio location
├── 404.html                    # Custom 404 page conforming to editorial grids
│
├── assets/
│   ├── css/
│   │   ├── bootstrap.min.css   # Minified Bootstrap 5 Grid System
│   │   ├── style.css           # Core styling layouts & light theme rules
│   │   ├── dark.css            # Dark mode overrides & contrast variables
│   │   └── animations.css      # Transition layers, reveals, and keyframes
│   │
│   ├── js/
│   │   ├── theme-toggle.js     # Light/Dark mode localStorage handlers
│   │   ├── main.js             # Sticky navs, mobile overlays, copy portals, FAQs
│   │   └── animations.js       # GSAP timelines & CSS scroll observer fallbacks
│   │
│   └── images/                 # Theme-curated design mockups and headshots
│       ├── hero/
│       ├── portfolio/
│       ├── case-studies/
│       ├── guidelines/
│       ├── workspace/
│       ├── testimonials/
│       └── blog/
│
└── README.md                   # Setup documentation (this file)
```

---

## 🚀 Running & Customizing Locally

### Prerequisites
The template runs entirely on static client-side resources. No compiler, Node engine, or bundle setup is required.

### Development Server
You can run a local development server to test pages and view transitions. If you have VS Code, use **Live Server**, or run a local Python server:

```bash
# Python 3
python -m http.server 8000

# Node.js (if installed)
npx http-server -p 8000
```
Open your browser and navigate to `http://localhost:8000`.

### Releasing Production Builds
All asset references, local Unsplash visual links, minified stylesheets, and custom JS operations are organized and ready to upload directly to Netlify, Vercel, GitHub Pages, or any standard Apache/Nginx hosting bucket.
