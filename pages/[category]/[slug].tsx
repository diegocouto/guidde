import { GetStaticPropsContext } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styled from 'styled-components';

import Screen from '../../components/containers/Screen';
import ScreenContent from '../../components/containers/ScreenContent';
import ScreenContentHeader from '../../components/containers/ScreenContentHeader';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import ScreenTitle from '../../components/typography/ScreenTitle';
import { ArticlesListItemType, ArticleType, getArticle, getArticlesList } from '../../utils/datasource';

interface ContextParams extends GetStaticPropsContext {
  params: ArticlesListItemType;
}

interface Props {
  article: ArticleType;
  category: string;
  locale: string;
}

export default function ArticlePage({ article, category, locale }: Props) {
  const { t: categories } = useTranslation('categories');

  const categoryTitle = categories(`${category}.title`);
  const categoryPath = `/${category}`;

  return (
    <Screen title={article.meta.title} isCompact>
      <ScreenContent>
        <ScreenContentHeader>
          <Breadcrumbs items={[{ label: categoryTitle, href: categoryPath }]} locale={locale} />
          <ScreenTitle>{article.meta.title}</ScreenTitle>
        </ScreenContentHeader>

        <ArticleContent dangerouslySetInnerHTML={{ __html: article.content }} />
      </ScreenContent>
    </Screen>
  );
}

const ArticleContent = styled.article.attrs({ className: 'article-content' })``;

export async function getStaticProps({ params, locale }: ContextParams) {
  const article = await getArticle(locale, params.category, params.slug);

  return {
    props: { article, category: params.category, locale },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getArticlesList().map((article) => ({ params: article, locale: article.locale })),
  };
}
