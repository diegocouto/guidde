import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

import { Brand } from '../../../utils/constants/app';
import SearchInput from './SearchInput';

interface Props {
  isCompact?: boolean;
}

export default function AppHeader({ isCompact }: Props) {
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
            <ExternalLink href="#">{t('header.backTo', { brand: Brand.name })}</ExternalLink>
            <ContactButton>{t('header.contactUs')}</ContactButton>
          </NavigationActions>
        </NavigationBar>

        <SearchBar>
          {!isCompact && <Title>{t('header.title')}</Title>}
          <SearchInput />
        </SearchBar>
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
  className: 'h-8',
})``;

const NavigationActions = styled.div.attrs({
  className: 'flex items-center text-sm space-x-4',
})``;

const ExternalLink = styled.a.attrs({
  className: 'text-gray-500 hidden sm:inline-block hover:text-gray-600',
})``;

const ContactButton = styled.button.attrs({
  className: 'btn btn-default',
  type: 'button',
})``;

const Title = styled.h1.attrs({
  className: 'font-semibold text-3xl text-center pt-4 pb-2',
})``;
