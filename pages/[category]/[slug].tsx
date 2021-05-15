import { GetStaticPropsContext } from 'next';
import React from 'react';

import Screen from '../../components/containers/Screen';
import { ArticlesListItemType, ArticleType, getArticle, getArticlesList } from '../../utils/datasource';

interface ContextParams extends GetStaticPropsContext {
  params: ArticlesListItemType;
}

interface Props {
  article: ArticleType;
  category: string;
}

export default function ArticlePage({ article }: Props) {
  return (
    <Screen title={article.meta.title} isCompact>
      <h1>{article.meta.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: article.content }} />
    </Screen>
  );
}

export async function getStaticProps({ params, locale }: ContextParams) {
  const article = await getArticle(locale, params.category, params.slug);

  return {
    props: { category: params.category, article },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getArticlesList().map((article) => ({ params: article })),
  };
}
