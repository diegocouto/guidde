import fs from 'fs';
import path from 'path';

import { getArticle, getArticlesList } from '../datasource';

const CACHE_PATH = 'public';
const CACHE_FILE = 'data.json';

export interface CacheEntry {
  locale: string;
  category: string;
  slug: string;
  tags: string;
  title: string;
  description: string;
}

export function updateArticlesCache() {
  const articles = getArticlesList();

  Promise.all(
    articles.map(async (article) => {
      const { meta } = await getArticle(article.locale, article.category, article.slug);

      return {
        ...article,
        tags: meta.tags,
        title: meta.title,
        description: meta.description,
      };
    })
  ).then((data) => {
    fs.writeFileSync(path.join(CACHE_PATH, CACHE_FILE), JSON.stringify(data));
  });
}

export function getArticlesCache(): CacheEntry[] {
  const rawData = fs.readFileSync(path.join(__dirname, CACHE_PATH, CACHE_FILE), 'utf8');

  if (!rawData) {
    return [];
  }

  return JSON.parse(String(rawData));
}
