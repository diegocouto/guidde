import { GetStaticPropsContext } from 'next';
import React from 'react';

import Screen from '../components/containers/Screen';
import ScreenContent from '../components/containers/ScreenContent';
import CategoriesList from '../components/lists/CategoriesList';
import { CategoryListItemType, getCategoriesList } from '../utils/datasource';

interface Props {
  categories: CategoryListItemType[];
  locale: string;
}

export default function HomePage({ categories, locale }: Props) {
  return (
    <Screen>
      <ScreenContent>
        <CategoriesList categories={categories} locale={locale} />
      </ScreenContent>
    </Screen>
  );
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const categories = getCategoriesList(locale);

  return {
    props: { categories, locale },
  };
}
