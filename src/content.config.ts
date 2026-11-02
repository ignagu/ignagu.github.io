import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  // One folder per project: src/content/projects/<slug>/index.md
  loader: glob({ pattern: '*/index.md', base: './src/content/projects', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      lang: z.enum(['en']).default('en'),
      status: z.enum(['placeholder', 'live']).default('live'),
      cover: image().optional(),
      screenshots: z.array(z.object({ src: image(), alt: z.string(), caption: z.string().optional() })).default([]),
      steps: z.array(z.string()).min(1).max(3),
      tallyId: z.string().default(''),
      draft: z.boolean().default(false),
    }),
});

const journal = defineCollection({
  // One Markdown file per post: src/content/journal/YYYY-MM-DD-slug.md
  loader: glob({ pattern: '*.md', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    lang: z.enum(['en']).default('en'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, journal };
