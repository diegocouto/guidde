import React from 'react';
import styled from 'styled-components';

import { CategoryArticleType } from '../../utils/datasource';
import ListItem from './ListItem';

interface Props {
  articles: CategoryArticleType[];
  locale: string;
}

export default function ArticlesList({ articles, locale }: Props) {
  return (
    <Container>
      {articles.map((article) => (
        <ListItem
          key={article.slug}
          title={article.meta.title}
          description={article.meta.title}
          path={article.url}
          locale={locale}
        />
      ))}
    </Container>
  );
}

const Container = styled.ul.attrs({
  className: 'space-y-4',
})``;
