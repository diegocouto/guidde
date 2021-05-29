import React from 'react';
import styled from 'styled-components';

import { Brand } from '../../utils/constants/app';

export default function AppFooter() {
  const links = Brand.social || [];

  return (
    <Container>
      <Logo />

      <SocialLinksList>
        {links.map((link) => (
          <SocialLink key={link.name} href={link.url}>
            {link.name}
          </SocialLink>
        ))}
      </SocialLinksList>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: 'container flex flex-col items-center space-y-4 py-8',
})``;

const Logo = styled.img.attrs({
  alt: Brand.name,
  src: '/logo.svg',
  className: 'filter grayscale opacity-25 h-6',
})``;

const SocialLinksList = styled.ul.attrs({ className: 'text-sm space-x-4' })``;

const SocialLink = styled.a.attrs({
  className: 'text-gray-500 hover:text-gray-600',
  target: '_blank',
  rel: 'noopener',
})``;
