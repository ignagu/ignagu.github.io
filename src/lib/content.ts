import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';

/** Published projects, newest first. */
export async function getProjects(lang: Lang) {
  return (await getCollection('projects', (e) => e.data.lang === lang && (import.meta.env.DEV || !e.data.draft)))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.id.localeCompare(b.id));
}
