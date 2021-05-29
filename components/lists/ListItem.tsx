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
      <Link href={path} locale={locale}>
        <ItemLink>
          <ItemLabel>{title}</ItemLabel>
          <ItemDescription>{description}</ItemDescription>
        </ItemLink>
      </Link>
    </Item>
  );
}

const Item = styled.li``;

const ItemLink = styled.a.attrs({
  className:
    'flex flex-col cursor-pointer border border-gray-50 bg-gray-50 rounded-xl p-6 space-y-1 hover:bg-white hover:border-gray-200',
})``;

const ItemLabel = styled.p.attrs({ className: 'font-semibold text-lg text-primary-500' })``;
const ItemDescription = styled.p.attrs({ className: 'text-gray-500' })``;
