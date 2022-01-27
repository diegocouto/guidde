import { yupResolver } from '@hookform/resolvers/yup';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { RiArrowLeftLine } from 'react-icons/ri';
import styled from 'styled-components';
import * as yup from 'yup';

export interface FormData {
  email: string;
  subject?: string;
  message: string;
}

interface Props {
  isLoading?: boolean;
  onSubmit?: (data: FormData) => void;
}

export default function ContactForm(props: Props) {
  const { register, handleSubmit, formState } = useForm({ mode: 'onChange', resolver: yupResolver(schema) });
  const { t } = useTranslation('common');
  const { back } = useRouter();

  function onSubmit(data: FormData) {
    props.onSubmit?.(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <EmailInput placeholder={t('inputs.email')} {...register('email')} />

      <MessageInputContainer>
        <MessageSubjectInput placeholder={`${t('inputs.subject')} ${t('inputs.optional')}`} {...register('subject')} />

        <MessageContentInput placeholder={t('inputs.message')} {...register('message')}></MessageContentInput>
      </MessageInputContainer>

      <FormActionsContainer>
        <SubmitButton value={t('actions.sendMessage')} disabled={!formState.isValid || props.isLoading} />

        <BackButton onClick={back}>
          <BackIcon /> {t('actions.back')}
        </BackButton>
      </FormActionsContainer>
    </Form>
  );
}

const Form = styled.form.attrs({
  className: 'space-y-4',
})``;

const EmailInput = styled.input.attrs({
  className: 'form-input focusable',
  type: 'text',
})``;

const MessageInputContainer = styled.div.attrs({
  className: 'flex flex-col border rounded-lg focusable-within overflow-hidden',
})``;

const MessageSubjectInput = styled.input.attrs({
  className: 'border-b border-dashed py-3 px-4 focus:outline-none',
})``;

const MessageContentInput = styled.textarea.attrs({
  className: 'py-3 px-4 focus:outline-none ',
  rows: 6,
})``;

const FormActionsContainer = styled.div.attrs({
  className: 'flex flex-row-reverse items-center justify-between',
})``;

const BackButton = styled.button.attrs({
  className:
    'flex items-center btn text-gray-400 ring-inset ring-gray-200 hover:text-gray-500 focus:ring-2 focus:outline-none',
  type: 'button',
})``;

const BackIcon = styled(RiArrowLeftLine).attrs({
  className: 'mr-1',
})``;

const SubmitButton = styled.input.attrs({
  className: 'btn btn-primary',
  type: 'submit',
})``;

const schema = yup.object().shape({
  email: yup.string().email().required(),
  message: yup.string().min(5).required(),
});
