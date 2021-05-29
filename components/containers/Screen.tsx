import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { Brand } from '../../utils/constants/app';
import AppFooter from '../navigation/AppFooter';
import AppHeader from '../navigation/AppHeader';

interface Props {
  title?: string;
  isCompact?: boolean;
}

export default function Screen({ children, ...props }: React.PropsWithChildren<Props>) {
  const { t } = useTranslation('common');

  const basePageTitle = t('pageTitle', { brand: Brand.name });
  const pageTitle = props.title ? `${props.title} - ${basePageTitle}` : basePageTitle;

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppWrapper>
        <AppHeader isCompact={props.isCompact} />
        <AppContentWrapper>{children}</AppContentWrapper>
        <AppFooter />
      </AppWrapper>
    </>
  );
}

const AppWrapper = styled.div.attrs({
  className: 'flex flex-col h-full',
})``;

const AppContentWrapper = styled.div.attrs({
  className: 'container flex-1',
})``;
