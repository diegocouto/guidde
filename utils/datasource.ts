import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

import { CATEGORIES } from './constants/categories';
import { markdownToHtml } from './markdown';

export type ArticleType = {
  content: string;
  meta: {
    title: string;
    description: string;
    updatedAt: string;
  };
  slug: string;
  url: string;
};

export type ArticlesListItemType = {
  lang: string;
  category: string;
  slug: string;
};

export type CategoryType = {
  name: string;
  description: string;
};

export type CategoryArticleType = Omit<ArticleType, 'content'>;

export type CategoryListItemType = {
  lang: string;
  category: string;
};

const articlesDirectory = path.join(process.cwd(), 'articles');

export async function getArticle(lang: string, category: string, slug: string, parseContent = true) {
  const articlePath = getFullArticlePath(lang, category, slug);
  const fileContents = fs.readFileSync(articlePath, 'utf8');

  const article = matter(fileContents);
  const content = parseContent ? await markdownToHtml(article.content) : null;

  return {
    slug,
    url: path.join('/', lang, category, slug),
    meta: article.data,
    ...(content ? { content } : {}),
  };
}

export function getArticlesList() {
  const categories = getCategoriesList();
  const articles = [];

  categories.forEach(({ lang, category }) => {
    fs.readdirSync(path.join(articlesDirectory, lang, category)).forEach((article) => {
      articles.push({
        lang,
        category,
        slug: parseArticleFilename(article),
      });
    });
  });

  return articles;
}

export async function getCategoryArticles(lang: string, category: string) {
  const categoryPath = path.join(articlesDirectory, lang, category);
  const articleFilenames = fs.readdirSync(categoryPath);

  const articles = await Promise.all(
    articleFilenames.map(async (filename) => {
      const slug = parseArticleFilename(filename);
      const article = await getArticle(lang, category, slug, false);

      return article;
    })
  );

  return articles;
}

export function getCategoryDetails(lang: string, category: string) {
  return CATEGORIES[lang][category];
}

export function getCategoriesList() {
  const categories = [];

  fs.readdirSync(articlesDirectory).forEach((lang) => {
    fs.readdirSync(path.join(articlesDirectory, lang)).forEach((category) => {
      categories.push({ lang, category });
    });
  });

  return categories;
}

function getFullArticlePath(lang: string, category: string, slug: string) {
  return path.join(articlesDirectory, lang, category, `${slug}.md`);
}

function parseArticleFilename(filename: string) {
  return path.parse(filename).name;
}
