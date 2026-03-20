# Image Optimization: Logo Resizing

## Problem
PageSpeed Insights flagged the BuildPro logo for having a resource size mismatch:
- **Actual size**: 339 × 366 px
- **Displayed size**: 84 × 84 px (w-12 h-12 in Tailwind)
- **Wasted bandwidth**: ~10 KiB

The browser was downloading a 339×366px image but only displaying it at 84×84px, wasting bandwidth and slowing down page load.

---

## Solution: Astro Image Component

Converted the logo from a standard `<img>` tag to Astro's `<Image />` component, which provides automatic build-time optimization.

### Before (Navbar.astro):
```astro
<img
    src="/images/logo.avif"
    alt="BuildPro Logo"
    class="w-12 h-12 rounded"
/>
```

### After (Navbar.astro):
```astro
---
import { Image } from "astro:assets";
import logoImage from "../../images/logo.avif";
---

<Image
    src={logoImage}
    alt="BuildPro Logo"
    width={84}
    height={84}
    class="w-12 h-12 rounded"
/>
```

---

## What Astro Image Component Does

1. **Build-time Optimization**: Automatically resizes the image to the specified dimensions (84×84px)
2. **Format Conversion**: Can convert to modern formats (WebP, AVIF) for better compression
3. **Responsive Images**: Generates multiple sizes for different screen densities
4. **Lazy Loading**: Automatically adds `loading="lazy"` for below-the-fold images
5. **Aspect Ratio**: Prevents layout shift by maintaining aspect ratio

---

## Performance Impact

### Before:
- Logo file size: ~339×366px AVIF (~10 KiB)
- Browser downloads full resolution
- Displays at 84×84px (wasted pixels)

### After:
- Logo file size: ~84×84px AVIF (~1-2 KiB)
- Astro optimizes at build time
- Displays at 84×84px (no waste)
- **Savings**: ~8-9 KiB per page load

### Cumulative Impact:
- If logo appears on 10 pages: **80-90 KiB saved**
- If 1,000 users visit: **80-90 MB saved in total bandwidth**

---

## How It Works

### 1. Import the Image Component
```astro
import { Image } from "astro:assets";
```

### 2. Import the Image as an Asset
```astro
import logoImage from "../../images/logo.avif";
```

This tells Astro to:
- Treat the image as a build-time asset
- Optimize it during the build process
- Generate the optimized version in the output

### 3. Use the Image Component
```astro
<Image
    src={logoImage}
    alt="BuildPro Logo"
    width={84}
    height={84}
    class="w-12 h-12 rounded"
/>
```

The `width` and `height` attributes tell Astro:
- What size to optimize the image to
- Prevents layout shift (browser knows dimensions before image loads)
- Must match the displayed size (84px = w-12 in Tailwind)

---

## Build Output

When you run `npm run build`, Astro will:

1. **Detect** the logo import in Navbar.astro
2. **Optimize** the image to 84×84px
3. **Generate** an optimized AVIF file (~1-2 KiB)
4. **Output** to `dist/_astro/logo.HASH.avif`
5. **Update** the HTML to reference the optimized version

### Example Output:
```html
<img
    src="/_astro/logo.a1b2c3d4.avif"
    alt="BuildPro Logo"
    width="84"
    height="84"
    class="w-12 h-12 rounded"
    loading="lazy"
/>
```

---

## Verification

### 1. Local Build
```bash
npm run build
```

Check the output:
```bash
ls -lh dist/_astro/logo.*
```

Should show a much smaller file size than the original.

### 2. PageSpeed Insights
After deploying to Vercel:
1. Run PageSpeed Insights audit
2. Look for "Properly size images" section
3. Logo should no longer be flagged
4. Performance score should improve

### 3. Chrome DevTools
1. Open DevTools → Network tab
2. Reload page
3. Check logo file size
4. Should be ~1-2 KiB instead of ~10 KiB

---

## Why This Matters

1. **Bandwidth Savings**: Reduces data transfer by 80-90%
2. **Faster Load**: Smaller file = faster download
3. **Better Performance**: Improves Core Web Vitals
4. **Mobile Friendly**: Especially important for mobile users on slow connections
5. **SEO**: PageSpeed Insights improvement helps search rankings

---

## Other Images to Optimize

The same approach can be applied to other images:

### Hero Background Images
```astro
import img1 from "../../images/img1.avif";

<Image src={img1} alt="..." width={1920} height={1080} />
```

### Review Images
```astro
import reviewImg from "../../images/img2.avif";

<Image src={reviewImg} alt="..." width={400} height={300} />
```

### Product/Service Images
```astro
import serviceImg from "../../images/hvac1.avif";

<Image src={serviceImg} alt="..." width={600} height={400} />
```

---

## Summary

By converting the logo to use Astro's `<Image />` component:
- ✅ Automatically resizes from 339×366px to 84×84px
- ✅ Saves ~8-9 KiB per page load
- ✅ Eliminates PageSpeed Insights warning
- ✅ Improves performance score
- ✅ Better mobile experience

The optimization happens at build time, so there's no runtime performance cost.
