# Adding New Trades - Admin Guide

This guide explains how to add new trade categories to BuildPro.

## Step 1: Add Trade Icon Mapping

Edit `src/utils/tradeIcons.ts` and add your new trade with its SVG icon path:

```typescript
export const tradeIcons: Record<string, string> = {
  // ... existing trades
  'Your New Trade': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="YOUR_SVG_PATH_HERE"/>`,
};
```

## Step 2: Create Trade Markdown File

Create a new file at `src/content/trades/[trade-name].md`:

```markdown
---
title: "Your Trade Services"
trade: "Your New Trade"
shortTitle: "Short Description"
description: "Professional services description..."
hoverDescription: "Hover Text"
image: "/images/img1.avif"
overlayColor: "navy" or "orange"
slug: "your-trade-slug"
---
```

**Important:** The `trade` field must match exactly what you added in `tradeIcons.ts`.

## Step 3: Create Template Directory

Create a folder at `src/content/templates/[trade-name-lowercase]/`

## Step 4: Add Template Files

Create template markdown files in the directory:

```markdown
---
title: "Your Trade Website Template 1"
trade: "Your New Trade"
description: "Professional template description..."
thumbnail: "/images/img1.avif"
liveDemoUrl: "https://example.com"
mainSiteUrl: "https://example.com"
category: "Landing Page"
---
```

**Important:** The `trade` field must match exactly what you added in `tradeIcons.ts`.

## Automatic Features

Once you've completed these steps, the following will happen automatically:

✅ Trade appears in the navbar dropdown with its custom icon
✅ Trade appears in the "Trades We Serve" section
✅ Dynamic route created at `/trades-we-serve/[slug]`
✅ Templates automatically filtered and displayed for that trade
✅ All navigation and filtering works seamlessly

## Example: Adding "Roofing"

### 1. Add to `src/utils/tradeIcons.ts`:
```typescript
'Roofing': `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9"/>`,
```

### 2. Create `src/content/trades/roofing.md`:
```markdown
---
title: "Roofing Services"
trade: "Roofing"
shortTitle: "Roof Solutions"
description: "Professional roofing services..."
hoverDescription: "Roofing Excellence"
image: "/images/img2.avif"
overlayColor: "orange"
slug: "roofing"
---
```

### 3. Create `src/content/templates/roofing/roofing-template-1.md`:
```markdown
---
title: "Roofing Website Template 1"
trade: "Roofing"
description: "Professional roofing template..."
thumbnail: "/images/img1.avif"
liveDemoUrl: "https://example.com"
mainSiteUrl: "https://example.com"
category: "Landing Page"
---
```

That's it! The roofing trade will now appear everywhere automatically.

## Available SVG Icons

All icons use standard Heroicons format. You can find more at [heroicons.com](https://heroicons.com)

## Troubleshooting

**Error: "Content entry data does not match schema"**
- Make sure the `trade` field in your markdown files matches exactly what's in `tradeIcons.ts`
- Check for typos and capitalization

**Icon not showing in dropdown**
- Verify the trade name is added to `tradeIcons.ts`
- Clear your browser cache and rebuild the project

**Templates not appearing**
- Ensure the `trade` field in template files matches the trade name
- Check that templates are in the correct directory structure
