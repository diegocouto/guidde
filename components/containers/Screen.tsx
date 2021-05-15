import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';

import { Brand } from '../../utils/constants/app';
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

      <AppHeader isCompact={props.isCompact} />
      <ScreenContent>{children}</ScreenContent>
    </>
  );
}

const ScreenContent = styled.div.attrs({
  className: 'container',
})``;
