import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import { useEmbeddingState } from '../../hooks/useEmbeddingState';
import { Brand } from '../../utils/constants/app';
import AppFooter from '../navigation/AppFooter';
import AppHeader from '../navigation/AppHeader';

interface Props {
  title?: string;
  description?: string;
  isCompact?: boolean;
  isMinimal?: boolean;
}

export default function Screen({ children, description, ...props }: React.PropsWithChildren<Props>) {
  const { t } = useTranslation('common');
  const { asPath } = useRouter();
  const { isEmbedded } = useEmbeddingState();

  const basePath = process.env.NEXT_PUBLIC_URL || '';
  const basePageTitle = t('pageTitle', { brand: Brand.name });

  const pageTitle = props.title || basePageTitle;
  const coverImage = `${basePath}/social-cover.jpg`;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />

        <title>{pageTitle}</title>

        <meta property="og:title" content={pageTitle} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={coverImage} />
        <meta property="og:url" content={`${basePath}${asPath}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:image" content={coverImage} />

        {description && (
          <>
            <meta name="description" content={description}></meta>
            <meta property="og:description" content={description} />
            <meta name="twitter:description" content={description} />
          </>
        )}

        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Assistant:wght@400;600&display=optional"
          rel="stylesheet"
        />
      </Head>

      <AppWrapper>
        <AppHeader isCompact={props.isCompact} isMinimal={props.isMinimal} />
        <AppContentWrapper>{children}</AppContentWrapper>
        {!isEmbedded && <AppFooter />}
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
