# Setup Guide: BuildPro Website Templates

**Complete setup instructions for the BuildPro marketing platform using Bun and Astro.**

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Development](#development)
4. [Build & Deployment](#build--deployment)
5. [Design System](#design-system)
6. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have the following installed:

### Required

- **Node.js** 18.x or higher
  - Check version: `node --version`
  - Download: [nodejs.org](https://nodejs.org)

- **Bun** 1.0 or higher
  - Install: `curl -fsSL https://bun.sh/install | bash`
  - Check version: `bun --version`
  - Documentation: [bun.sh](https://bun.sh)

### Optional

- **Git** for version control
- **VS Code** with Astro extension for development
- **Docker** for containerized deployment

---

## Installation

### Step 1: Clone or Download the Repository

```bash
# Clone from GitHub
git clone https://github.com/Rodriguez1718/webdev-final.git
cd webdev-final

# Or download and extract the ZIP file
unzip webdev-final.zip
cd webdev-final
```

### Step 2: Install Dependencies with Bun

```bash
# Install all project dependencies
bun install

# Verify installation
bun --version
```

**What this does:**
- Reads `package.json` and `bun.lock`
- Downloads all dependencies to `node_modules/`
- Installs Astro, Tailwind CSS, and other packages
- Creates/updates `bun.lock` for reproducible installs

**Expected output:**
```
✓ Installed 150+ packages in 2.3s
```

### Step 3: Verify Installation

```bash
# Check Astro installation
bun astro --version

# List available commands
bun run
```

**Expected output:**
```
astro v4.x.x
Available scripts:
  dev      Start development server
  build    Build for production
  preview  Preview production build
```

---

## Development

### Start Development Server

```bash
# Start the dev server with hot reload
bun dev
```

**Expected output:**
```
  🚀 Astro v4.x.x started in 0.5s

  ➜ Local:    http://localhost:3000/
  ➜ Network:  use --host to expose
```

**Features:**
- **Hot Module Replacement (HMR)** - Changes reflect instantly
- **Fast Refresh** - No full page reload needed
- **Error Overlay** - Displays build errors in browser
- **TypeScript Support** - Full type checking

### Development Workflow

1. **Edit components** in `src/components/`
2. **Create pages** in `src/pages/` (auto-routed)
3. **Update styles** in `src/styles/global.css`
4. **View changes** at `http://localhost:3000/`

### Common Development Commands

```bash
# Start dev server with verbose logging
bun dev --verbose

# Start on custom port
bun dev --port 4000

# Start with host exposed (for network access)
bun dev --host

# Stop dev server
# Press Ctrl+C in terminal
```

### File Structure During Development

```
src/
├── components/
│   ├── layout/          # Page sections (Hero, Navbar, Footer, etc.)
│   └── ui/              # Reusable components (Button, Card, Badge)
├── pages/               # Routes (auto-generated from filenames)
│   ├── index.astro      → /
│   ├── about.astro      → /about
│   └── contact.astro    → /contact
├── content/             # Markdown collections
│   └── templates/
│       ├── hvac/
│       └── plumbing/
├── layouts/             # Base page layouts
│   └── BaseLayout.astro
├── styles/
│   └── global.css       # Design system & brand variables
└── scripts/             # Client-side JavaScript (minimal)
```

---

## Build & Deployment

### Step 1: Build for Production

```bash
# Create optimized production build
bun run build
```

**Expected output:**
```
✓ Completed in 12.3s

  ✓ 45 pages built in 2.1s
  ✓ CSS optimized (32KB)
  ✓ Images optimized
  ✓ Ready to deploy
```

**What this does:**
- Generates static HTML files in `dist/`
- Optimizes CSS and removes unused styles
- Compresses images
- Minifies JavaScript
- Creates production-ready assets

### Step 2: Preview Production Build Locally

```bash
# Start preview server
bun run preview
```

**Expected output:**
```
  ➜ Local:    http://localhost:3000/
  ➜ Preview of production build
```

**Use this to:**
- Test production build locally
- Verify all pages render correctly
- Check performance metrics
- Validate build output

### Step 3: Deploy to Production

#### Option A: Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel

# Deploy with production flag
vercel --prod
```

#### Option B: Deploy to Netlify

```bash
# Install Netlify CLI
bun add -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Option C: Deploy to AWS S3 + CloudFront

```bash
# Build
bun run build

# Sync to S3
aws s3 sync dist/ s3://your-bucket-name/

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

#### Option D: Docker Deployment

```dockerfile
# Dockerfile
FROM oven/bun:latest

WORKDIR /app
COPY . .

RUN bun install
RUN bun run build

EXPOSE 3000
CMD ["bun", "run", "preview"]
```

```bash
# Build and run Docker image
docker build -t buildpro .
docker run -p 3000:3000 buildpro
```

---

## Design System

### Global Styles Management

All brand colors, typography, and component classes are managed in **`src/styles/global.css`**.

#### CSS Variables (Brand Colors)

```css
:root {
  /* Core Identity - Brand Colors */
  --midnight-navy: #0A1931;
  --helios-orange: #F48C06;
  --steel-pewter: #99B0BB;
  --steel-blue: #1B4D7E;

  /* UI Surfaces & Text */
  --parchment: #F5F5F5;
  --machinist: #7E7E7E;
  --muted: #9CA3AF;

  /* Font Variables */
  --font-primary: 'Poppins', ui-sans-serif, system-ui, sans-serif;
}
```

#### Using CSS Variables in Components

```astro
<!-- Example: Using CSS variables in Astro components -->
<div style="color: var(--helios-orange);">
  This text is Helios Orange
</div>

<!-- Or with Tailwind arbitrary values -->
<div class="text-[var(--midnight-navy)]">
  This text is Midnight Navy
</div>
```

#### Pre-defined Component Classes

```css
/* Heading Styles */
.heading-primary {
  @apply text-4xl md:text-5xl font-bold text-[#0A1931] leading-tight;
}

/* Button Styles */
.btn-outline {
  @apply border-2 border-[#F48C06] text-[#F48C06] hover:bg-[#F48C06] 
         hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200;
}

/* Card Styles */
.card-hover {
  @apply bg-white rounded-lg shadow-md hover:shadow-lg p-6 border border-[#99B0BB] 
         transition-shadow duration-200;
}

/* Background */
.bg-parchment {
  background-color: #F5F5F5;
}
```

### Updating Brand Colors

To change brand colors globally:

1. **Open** `src/styles/global.css`
2. **Find** the `:root` CSS variables section
3. **Update** the hex codes:
   ```css
   :root {
     --helios-orange: #FF6B35;  /* Changed from #F48C06 */
     --midnight-navy: #1A2A4A;  /* Changed from #0A1931 */
   }
   ```
4. **Save** the file
5. **Refresh** browser - changes apply instantly in dev mode

### Typography

**Font:** Poppins (Google Fonts)

```css
* {
  font-family: 'Poppins', ui-sans-serif, system-ui, sans-serif;
}
```

**Font Weights:**
- 400 (Regular) - Body text
- 600 (Semibold) - Subheadings
- 700 (Bold) - Headings

**Tailwind Text Sizes:**
- `text-sm` - 0.875rem (14px)
- `text-base` - 1rem (16px)
- `text-lg` - 1.125rem (18px)
- `text-xl` - 1.25rem (20px)
- `text-2xl` - 1.5rem (24px)
- `text-4xl` - 2.25rem (36px)
- `text-5xl` - 3rem (48px)
- `text-6xl` - 3.75rem (60px)

---

## Troubleshooting

### Issue: `bun: command not found`

**Solution:**
```bash
# Add Bun to PATH
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# Verify installation
bun --version
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use custom port
bun dev --port 4000

# Or kill process on port 3000
# macOS/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: Dependencies not installing

**Solution:**
```bash
# Clear Bun cache
bun cache clean

# Reinstall dependencies
rm -rf node_modules bun.lock
bun install
```

### Issue: Build fails with TypeScript errors

**Solution:**
```bash
# Check TypeScript configuration
bun run type-check

# Fix errors in src/ files
# Then rebuild
bun run build
```

### Issue: Hot reload not working

**Solution:**
```bash
# Restart dev server
# Press Ctrl+C to stop
# Run again
bun dev

# Or clear cache
bun cache clean
bun dev
```

### Issue: Images not loading in production

**Solution:**
```bash
# Ensure images are in public/ directory
# Use Astro Image component for optimization
import { Image } from 'astro:assets';

<Image src={imageImport} alt="Description" />
```

### Issue: Styles not applying

**Solution:**
```bash
# Verify Tailwind config
# Check src/styles/global.css is imported in layouts

# Rebuild CSS
bun run build

# Clear browser cache (Ctrl+Shift+Delete)
```

---

## Performance Optimization Tips

### 1. Image Optimization

```bash
# Use Astro's Image component
import { Image } from 'astro:assets';

<Image 
  src={imageImport} 
  alt="Description"
  width={800}
  height={600}
/>
```

### 2. Code Splitting

```bash
# Astro automatically code-splits pages
# No additional configuration needed
```

### 3. CSS Purging

```bash
# Tailwind automatically removes unused CSS
# Verify in production build output
```

### 4. Lazy Loading

```astro
<!-- Images load on demand -->
<img src="image.jpg" loading="lazy" alt="Description" />
```

---

## Environment Variables

Create `.env` file in project root:

```env
# API Configuration
PUBLIC_API_URL=https://api.example.com
PUBLIC_SITE_URL=https://buildpro.dev

# Analytics
PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
PUBLIC_ENABLE_BETA=false
```

**Usage in components:**
```astro
---
const apiUrl = import.meta.env.PUBLIC_API_URL;
---
```

---

## Next Steps

1. **Customize content** in `src/pages/` and `src/content/`
2. **Update brand colors** in `src/styles/global.css`
3. **Add your logo** to `public/images/`
4. **Configure analytics** in environment variables
5. **Deploy to production** using preferred platform

---

## Additional Resources

- **Astro Documentation:** [docs.astro.build](https://docs.astro.build)
- **Tailwind CSS:** [tailwindcss.com](https://tailwindcss.com)
- **Bun Documentation:** [bun.sh/docs](https://bun.sh/docs)
- **TypeScript:** [typescriptlang.org](https://www.typescriptlang.org)

---

## Support

For issues or questions:
- **GitHub Issues:** [Rodriguez1718/webdev-final/issues](https://github.com/Rodriguez1718/webdev-final/issues)
- **Email:** support@buildpro.dev
- **Documentation:** [docs.buildpro.dev](https://docs.buildpro.dev)

---

**Happy building! 🚀**
