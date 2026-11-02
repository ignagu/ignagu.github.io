import { getCollection } from 'astro:content';
import type { Lang } from '../i18n';
import { sheetNo } from './format';

/** Published projects, oldest first gets B-01, so sheet numbers never change. */
export async function getProjects(lang: Lang) {
  const all = (await getCollection('projects', (e) => e.data.lang === lang && (import.meta.env.DEV || !e.data.draft)))
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf() || a.id.localeCompare(b.id));
  return all.map((entry, i) => ({ entry, sheet: sheetNo('B', i + 1) })).reverse();
}

export async function getPosts(lang: Lang) {
  const all = (await getCollection('journal', (e) => e.data.lang === lang && (import.meta.env.DEV || !e.data.draft)))
    .sort((a, b) => a.data.date.valueOf() - b.data.date.valueOf() || a.id.localeCompare(b.id));
  return all.map((entry, i) => ({ entry, sheet: sheetNo('C', i + 1), slug: entry.id.replace(/^\d{4}-\d{2}-\d{2}-/, '') })).reverse();
}
