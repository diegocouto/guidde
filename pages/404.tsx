import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import { RiCompass4Line } from 'react-icons/ri';
import styled from 'styled-components';

import Screen from '../components/containers/Screen';
import ScreenContent from '../components/containers/ScreenContent';

export default function HomePage() {
  const { t } = useTranslation('common');

  return (
    <Screen title={t('errors.notFound.title')} isCompact>
      <ScreenContent>
        <ErrorContainer>
          <ErrorDetailsContainer>
            <ErrorIcon />
            <ErrorTitle>{t('errors.notFound.title')}</ErrorTitle>
            <ErrorDescription>{t('errors.notFound.description')}</ErrorDescription>
          </ErrorDetailsContainer>

          <Link href="/" passHref={true}>
            <HomepageLink>{t('actions.backToHome')}</HomepageLink>
          </Link>
        </ErrorContainer>
      </ScreenContent>
    </Screen>
  );
}

const ErrorContainer = styled.div.attrs({
  className: 'text-center py-14 mx-auto max-w-md w-full',
})``;

const ErrorDetailsContainer = styled.div.attrs({
  className: 'flex flex-col items-center space-y-4 mb-14',
})``;

const ErrorIcon = styled(RiCompass4Line).attrs({
  className: 'text-gray-300',
  size: 36,
})``;

const ErrorTitle = styled.h2.attrs({
  className: 'font-semibold text-3xl',
})``;

const ErrorDescription = styled.p.attrs({
  className: 'text-lg text-gray-500',
})``;

const HomepageLink = styled.a.attrs({
  className: 'btn btn-primary',
})``;
