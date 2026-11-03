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
      // For projects meant to run on their own: when it arrives, e.g. "Every morning, at the time you choose".
      schedule: z.string().optional(),
      tallyId: z.string().default(''),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
