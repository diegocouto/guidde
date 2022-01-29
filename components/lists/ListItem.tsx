import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Props {
  title: string;
  description: string;
  path: string;
  locale: string;
}

export default function ListItem({ title, description, path, locale }: Props) {
  return (
    <Item key={path}>
      <Link href={path} locale={locale} passHref={true}>
        <ItemLink>
          <ItemLabel>{title}</ItemLabel>
          <ItemDescription>{description}</ItemDescription>
        </ItemLink>
      </Link>
    </Item>
  );
}

const Item = styled.li``;
const ItemLink = styled.a.attrs({ className: 'list-item focusable' })``;
const ItemLabel = styled.p.attrs({ className: 'font-semibold text-lg text-primary-500' })``;
const ItemDescription = styled.p.attrs({ className: 'text-gray-500' })``;
