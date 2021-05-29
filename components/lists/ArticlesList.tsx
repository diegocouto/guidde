import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { CategoryArticleType } from '../../utils/datasource';

interface Props {
  articles: CategoryArticleType[];
  locale: string;
}

export default function ArticlesList({ articles, locale }: Props) {
  return (
    <Container>
      {articles.map((article) => (
        <Item key={article.slug}>
          <Link href={article.url} locale={locale}>
            <ItemLink>
              <ItemLabel>{article.meta.title}</ItemLabel>
              <ItemDescription>{article.meta.description}</ItemDescription>
            </ItemLink>
          </Link>
        </Item>
      ))}
    </Container>
  );
}

const Container = styled.ul.attrs({
  className: 'space-y-4',
})``;

const Item = styled.li``;

const ItemLink = styled.a.attrs({
  className:
    'flex flex-col cursor-pointer border border-gray-50 bg-gray-50 rounded-xl p-6 space-y-1 hover:bg-white hover:border-gray-200',
})``;

const ItemLabel = styled.p.attrs({
  className: 'font-semibold text-lg text-primary-500',
})``;

const ItemDescription = styled.p.attrs({
  className: 'text-gray-500',
})``;
