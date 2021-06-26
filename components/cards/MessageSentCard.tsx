import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import { RiMailSendLine } from 'react-icons/ri';
import styled from 'styled-components';

export default function MessageSentCard() {
  const { t } = useTranslation('common');

  return (
    <Container>
      <DescriptionContainer>
        <SentIcon />
        <Title>{t('cards.messageSent.title')}</Title>
        <Description>{t('cards.messageSent.description')}</Description>
      </DescriptionContainer>

      <Link href="/" passHref={true}>
        <HomepageLink>{t('actions.backToHome')}</HomepageLink>
      </Link>
    </Container>
  );
}

const Container = styled.div.attrs({
  className: 'flex flex-col items-center text-center border rounded-lg shadow-md p-8',
})``;

const DescriptionContainer = styled.div.attrs({
  className: 'flex flex-col items-center space-y-4 mb-10',
})``;

const SentIcon = styled(RiMailSendLine).attrs({
  className: 'text-gray-300',
  size: 36,
})``;

const Title = styled.h3.attrs({
  className: 'font-semibold text-xl mb-2',
})``;

const Description = styled.p.attrs({
  className: 'text-gray-500',
})``;

const HomepageLink = styled.a.attrs({
  className: 'btn btn-primary',
})``;
