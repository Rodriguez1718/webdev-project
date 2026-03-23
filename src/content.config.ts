import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const tradeOptions = [
  'General Construction',
  'Remodelling',
  'Electrician',
  'Plumbing',
  'HVAC',
  'Home Builders',
  'Roofing',
] as const;

const templates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/templates' }),
  schema: z.object({
    title: z.string(),
    trade: z.enum(tradeOptions),
    description: z.string(),
    thumbnail: z.string().optional(),
    liveDemoUrl: z.string().url().optional(),
    mainSiteUrl: z.string().url().optional(),
    category: z.string().optional(),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    lastUpdated: z.string().optional(),
    description: z.string().optional(),
  }),
});

const trades = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/trades' }),
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    tagline: z.string(),
    hoverTitle: z.string(),
    hoverDescription: z.string(),
    image: z.string(),
    hoverColor: z.string(),
    order: z.number(),
  }),
});

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/reviews' }),
  schema: z.object({
    clientName: z.string(),
    companyName: z.string(),
    location: z.string(),
    initials: z.string(),
    title: z.string(),
    testimonial: z.string(),
    metric1Value: z.string(),
    metric1Label: z.string(),
    metric2Value: z.string(),
    metric2Label: z.string(),
    trade: z.enum(['HVAC', 'Plumbing']),
    order: z.number(),
  }),
});

export const collections = {
  templates,
  legal,
  trades,
  reviews,
};