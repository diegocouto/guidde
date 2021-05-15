import { GetStaticPropsContext } from 'next';
import React from 'react';

import Screen from '../../components/containers/Screen';
import {
  CategoryArticleType,
  CategoryListItemType,
  CategoryType,
  getCategoriesList,
  getCategoryArticles,
  getCategoryDetails,
} from '../../utils/datasource';

interface ContextParams extends GetStaticPropsContext {
  params: CategoryListItemType;
}

interface Props {
  category: CategoryType;
  articles: CategoryArticleType[];
}

export default function CategoryPage({ category, articles }: Props) {
  return (
    <Screen title={category.name} isCompact>
      <h1>{category.name}</h1>
      <p>{category.description}</p>

      <ul>
        {articles.map((article) => (
          <li key={article.slug}>
            <p>
              <a href={article.url}>{article.meta.title}</a>
            </p>

            <p>{article.meta.description}</p>
          </li>
        ))}
      </ul>
    </Screen>
  );
}

export async function getStaticProps({ params, locale }: ContextParams) {
  const articles = await getCategoryArticles(locale, params.category);
  const category = getCategoryDetails(locale, params.category);

  return {
    props: { category, articles },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getCategoriesList().map((category) => ({ params: category })),
  };
}
