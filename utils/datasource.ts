import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';

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
  locale: string;
  category: string;
  slug: string;
};

export type CategoryArticleType = Omit<ArticleType, 'content'>;

export type CategoryListItemType = {
  locale: string;
  category: string;
};

const articlesDirectory = path.join(process.cwd(), 'articles');

export async function getArticle(locale: string, category: string, slug: string, parseContent = true) {
  const articlePath = getFullArticlePath(locale, category, slug);
  const fileContents = fs.readFileSync(articlePath, 'utf8');

  const article = matter(fileContents);
  const content = parseContent ? await markdownToHtml(article.content) : null;

  return {
    slug,
    url: path.join('/', category, slug),
    meta: article.data,
    ...(content ? { content } : {}),
  };
}

export function getArticlesList() {
  const categories = getCategoriesList();
  const articles = [];

  categories.forEach(({ locale, category }) => {
    fs.readdirSync(path.join(articlesDirectory, locale, category)).forEach((article) => {
      articles.push({
        locale,
        category,
        slug: parseArticleFilename(article),
      });
    });
  });

  return articles;
}

export async function getCategoryArticles(locale: string, category: string) {
  const categoryPath = path.join(articlesDirectory, locale, category);
  const articleFilenames = fs.readdirSync(categoryPath);

  const articles = await Promise.all(
    articleFilenames.map(async (filename) => {
      const slug = parseArticleFilename(filename);
      const article = await getArticle(locale, category, slug, false);

      return article;
    })
  );

  return articles.sort((a, b) => a.meta.order - b.meta.order);
}

export function getCategoriesList(locale?: string) {
  const categories = [];

  fs.readdirSync(articlesDirectory).forEach((locale) => {
    fs.readdirSync(path.join(articlesDirectory, locale)).forEach((category) => {
      categories.push({ locale, category });
    });
  });

  if (locale) {
    return categories.filter((category) => category.locale === locale);
  }

  return categories;
}

function getFullArticlePath(locale: string, category: string, slug: string) {
  return path.join(articlesDirectory, locale, category, `${slug}.md`);
}

function parseArticleFilename(filename: string) {
  return path.parse(filename).name;
}
