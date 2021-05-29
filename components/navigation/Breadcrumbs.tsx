import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

interface Item {
  label: string;
  href: string;
}

interface ItemProps extends Item {
  locale: string;
}

interface Props {
  items?: Item[];
  locale: string;
}

export default function Breadcrumbs({ items, locale }: Props) {
  const { t } = useTranslation('common');

  return (
    <Container>
      <BreadcrumbItem label={`← ${t('homePageTitle')}`} href="/" locale={locale} />

      {(items || []).map((item) => (
        <BreadcrumbItem key={item.href} locale={locale} {...item} />
      ))}
    </Container>
  );
}

function BreadcrumbItem({ label, locale, href }: ItemProps) {
  return (
    <Item>
      <ItemLink href={href} locale={locale}>
        <Label>{label}</Label>
      </ItemLink>
    </Item>
  );
}

const Container = styled.ul.attrs({
  className: 'flex text-sm',
})``;

const Item = styled.li`
  & + &::before {
    color: #9ca3af;
    content: '›';
    padding: 0 0.5rem;
  }
`;

const ItemLink = styled(Link).attrs({ passRef: true })``;

const Label = styled.a.attrs({
  className: 'text-primary-500 cursor-pointer hover:text-primary-600',
})``;
