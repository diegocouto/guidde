import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { markdownToHtml } from './markdown';

export type ArticleType = {
  slug: string;
  content: string;
  meta: {
    title: string;
    description: string;
    updatedAt: string;
  };
};

export type ArticlesListItemType = {
  lang: string;
  category: string;
  slug: string;
};

const articlesDirectory = path.join(process.cwd(), 'articles');

export async function getArticle(lang: string, category: string, slug: string) {
  const fullPath = path.join(articlesDirectory, lang, category, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const article = matter(fileContents);
  const content = await markdownToHtml(article.content);

  return { slug, meta: article.data, content };
}

export function getArticlesList() {
  const articlesList = [];

  fs.readdirSync(articlesDirectory).forEach((lang) => {
    fs.readdirSync(path.join(articlesDirectory, lang)).forEach((category) => {
      fs.readdirSync(path.join(articlesDirectory, lang, category)).forEach((article) => {
        articlesList.push({
          lang,
          category,
          slug: parseArticleFilename(article),
        });
      });
    });
  });

  return articlesList;
}

function parseArticleFilename(filename: string) {
  return path.parse(filename).name;
}
