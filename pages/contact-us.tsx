import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { useState } from 'react';
import { useMutation } from 'react-query';
import styled from 'styled-components';

import MessageSentCard from '../components/cards/MessageSentCard';
import Screen from '../components/containers/Screen';
import ScreenContent from '../components/containers/ScreenContent';
import ContactForm, { FormData } from '../components/forms/ContactForm';
import ScreenDescription from '../components/typography/ScreenDescription';
import ScreenTitle from '../components/typography/ScreenTitle';
import { sendMessage } from '../utils/libs/api';

export default function ContactUs() {
  const [isSent, setIsSent] = useState(false);
  const { isLoading, mutate } = useMutation(sendMessage, { onSuccess: () => setIsSent(true) });

  const { t } = useTranslation('common');

  function handleSubmit(data: FormData) {
    mutate(data);
  }

  return (
    <Screen isMinimal>
      <ScreenContent>
        <Container>
          <FormDescriptionContainer>
            <ScreenTitle>{t('sections.contactUs.title')}</ScreenTitle>
            <ScreenDescription>{t('sections.contactUs.description')}</ScreenDescription>
          </FormDescriptionContainer>

          {isSent ? <MessageSentCard /> : <ContactForm isLoading={isLoading} onSubmit={handleSubmit} />}
        </Container>
      </ScreenContent>
    </Screen>
  );
}

const Container = styled.div.attrs({
  className: 'mx-auto w-full max-w-lg',
})``;

const FormDescriptionContainer = styled.div.attrs({
  className: 'space-y-1 mb-8',
})``;
