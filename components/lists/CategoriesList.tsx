import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styled from 'styled-components';

import { CategoryListItemType } from '../../utils/datasource';
import ListItem from './ListItem';

interface Props {
  categories: CategoryListItemType[];
  locale: string;
}

export default function CategoriesList({ categories, locale }: Props) {
  const { t } = useTranslation('categories');

  const sortedCategories = categories.sort((a, b) => {
    console.log(t(`${a.category}.title`));
    console.log(t(`${a.category}.order`));
    console.log(t(`${b.category}.order`));

    return Number(t(`${a.category}.order`)) - Number(t(`${b.category}.order`));
  });

  return (
    <Container>
      {sortedCategories.map(({ category }) => (
        <ListItem
          key={category}
          title={t(`${category}.title`)}
          description={t(`${category}.description`)}
          path={category}
          locale={locale}
        />
      ))}
    </Container>
  );
}

const Container = styled.ul.attrs({
  className: 'grid gap-4 md:grid-cols-2',
})``;
