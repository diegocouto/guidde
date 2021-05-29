import { GetStaticPropsContext } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styled from 'styled-components';

import Screen from '../../components/containers/Screen';
import ScreenContent from '../../components/containers/ScreenContent';
import ScreenContentHeader from '../../components/containers/ScreenContentHeader';
import ArticlesList from '../../components/lists/ArticlesList';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import {
  CategoryArticleType,
  CategoryListItemType,
  getCategoriesList,
  getCategoryArticles,
} from '../../utils/datasource';

interface ContextParams extends GetStaticPropsContext {
  params: CategoryListItemType;
}

interface Props {
  articles: CategoryArticleType[];
  category: string;
  locale: string;
}

export default function CategoryPage({ articles, category, locale }: Props) {
  const { t } = useTranslation('categories');

  const categoryTitle = t(`${category}.title`);
  const categoryDescripton = t(`${category}.description`);

  return (
    <Screen title={categoryTitle} isCompact>
      <ScreenContent>
        <ScreenContentHeader>
          <Breadcrumbs locale={locale} />

          <CategoryDescripionContainer>
            <CategoryTitle>{categoryTitle}</CategoryTitle>
            <CategoryDescription>{categoryDescripton}</CategoryDescription>
          </CategoryDescripionContainer>
        </ScreenContentHeader>

        <ArticlesList articles={articles} locale={locale} />
      </ScreenContent>
    </Screen>
  );
}

const CategoryDescripionContainer = styled.div.attrs({
  className: 'space-y-1',
})``;

const CategoryTitle = styled.h1.attrs({
  className: 'font-semibold text-3xl',
})``;

const CategoryDescription = styled.p.attrs({
  className: 'text-gray-500 text-lg',
})``;

export async function getStaticProps({ params, locale }: ContextParams) {
  const articles = await getCategoryArticles(locale, params.category);
  const category = params.category;

  return {
    props: { articles, category, locale },
  };
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: getCategoriesList().map((category) => ({ params: category })),
  };
}
