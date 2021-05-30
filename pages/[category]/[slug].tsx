import { GetStaticPropsContext } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styled from 'styled-components';

import Screen from '../../components/containers/Screen';
import ScreenContent from '../../components/containers/ScreenContent';
import ScreenContentHeader from '../../components/containers/ScreenContentHeader';
import ArticlesList from '../../components/lists/ArticlesList';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import ScreenTitle from '../../components/typography/ScreenTitle';
import {
  ArticlesListItemType,
  ArticleType,
  CategoryArticleType,
  getArticle,
  getArticlesList,
  getRelatedArticlesList,
} from '../../utils/datasource';

interface ContextParams extends GetStaticPropsContext {
  params: ArticlesListItemType;
}

interface Props {
  article: ArticleType;
  relatedArticles: CategoryArticleType[];
  category: string;
  locale: string;
}

export default function ArticlePage({ article, relatedArticles, category, locale }: Props) {
  const { t } = useTranslation('common');
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

        <ArticleContainer>
          <ArticleContent dangerouslySetInnerHTML={{ __html: article.content }} />

          {!!relatedArticles.length && (
            <RelatedArticlesSection>
              <RelatedArticlesTitle>{t('sections.relatedArticles')}</RelatedArticlesTitle>
              <ArticlesList articles={relatedArticles} locale={locale} />
            </RelatedArticlesSection>
          )}
        </ArticleContainer>
      </ScreenContent>
    </Screen>
  );
}

const ArticleContainer = styled.div.attrs({ className: 'space-y-20 max-w-2xl' })``;
const ArticleContent = styled.article.attrs({ className: 'article-content' })``;

const RelatedArticlesSection = styled.div.attrs({ className: 'space-y-4' })``;
const RelatedArticlesTitle = styled.h4.attrs({ className: 'font-semibold text-lg' })``;

export async function getStaticProps({ params, locale }: ContextParams) {
  const article = await getArticle(locale, params.category, params.slug);
  const relatedArticles = await getRelatedArticlesList(locale, params.category, params.slug);

  return {
    props: { article, relatedArticles, category: params.category, locale },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getArticlesList().map((article) => ({ params: article, locale: article.locale })),
  };
}
