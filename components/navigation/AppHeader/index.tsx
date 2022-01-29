import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Brand } from '../../../utils/constants/app';
import SearchInput from './SearchInput';

interface Props {
  isCompact?: boolean;
  isMinimal?: boolean;
}

export default function AppHeader({ isCompact, isMinimal }: Props) {
  const { t } = useTranslation('common');

  return (
    <Wrapper>
      <Container>
        <NavigationBar>
          <Link href="/" passHref>
            <LogoLink>
              <Logo />
            </LogoLink>
          </Link>

          <NavigationActions>
            <ExternalLink href={Brand.website}>{t('header.backTo', { brand: Brand.name })}</ExternalLink>

            {!isMinimal && (
              <Link href="/contact-us" passHref>
                <ContactUsLink>{t('header.contactUs')}</ContactUsLink>
              </Link>
            )}
          </NavigationActions>
        </NavigationBar>

        {!isMinimal && (
          <SearchBar>
            {!isCompact && <Title>{t('header.title')}</Title>}
            <SearchInput />
          </SearchBar>
        )}
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.div.attrs({
  className: 'border-b py-4',
})``;

const Container = styled.div.attrs({
  className: 'flex flex-col container space-y-4',
})``;

const NavigationBar = styled.div.attrs({
  className: 'flex items-center justify-between',
})``;

const SearchBar = styled.div.attrs({ className: 'space-y-2' })``;

const LogoLink = styled.a``;

const Logo = styled.img.attrs({
  alt: Brand.name,
  src: '/logo.svg',
  className: 'h-7',
})``;

const NavigationActions = styled.div.attrs({
  className: 'flex items-center text-sm space-x-4',
})``;

const ExternalLink = styled.a.attrs({
  className: 'text-gray-500 hidden sm:inline-block hover:text-gray-600',
})``;

const ContactUsLink = styled.a.attrs({
  className: 'btn btn-default',
})``;

const Title = styled.h1.attrs({
  className: 'font-semibold text-3xl text-center pt-16 pb-2',
})``;
