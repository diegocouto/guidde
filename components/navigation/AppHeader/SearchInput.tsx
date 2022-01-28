import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { RiLoader5Line, RiSearchLine } from 'react-icons/ri';
import { useQuery } from 'react-query';
import styled from 'styled-components';

import { SearchResultType } from '../../../utils/datasource';
import { searchForArticles } from '../../../utils/libs/api';
import SearchResults from './SearchResults';

export default function SearchInput() {
  const [isSearching, setIsSearching] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [term, setTerm] = useState('');

  const { t } = useTranslation('common');

  const inputRef = useRef<HTMLInputElement>();
  const router = useRouter();

  const { isLoading, data } = useQuery<SearchResultType[]>(['searchResults', term], () =>
    searchForArticles(term, router.locale)
  );

  const results = data || [];

  useEffect(() => {
    if (!isSearching) {
      inputRef.current.blur();
    }
  }, [isSearching, inputRef]);

  useEffect(() => {
    if (cursor > results.length) {
      setCursor(0);
    }
  }, [results]);

  function handleKeyUp({ key }: React.KeyboardEvent<HTMLInputElement>) {
    if (key === 'Escape') {
      setIsSearching(false);
      return;
    }

    if (key === 'ArrowDown' && cursor < results.length) {
      setCursor(cursor + 1);
      return;
    }

    if (cursor > 0) {
      switch (key) {
        case 'ArrowUp':
          setCursor(cursor - 1);
          break;
        case 'Enter':
          handleSelect(results[cursor - 1]);
      }
    }
  }

  function handleSelect({ item }: SearchResultType) {
    const path = `/${item.category}/${item.slug}`;
    const locale = item.locale;

    setIsSearching(false);

    router.push(path, path, { locale });
  }

  return (
    <Container>
      <InputContainer>
        <Input
          ref={inputRef}
          placeholder={t('actions.search') + '...'}
          onChange={({ target }) => setTerm(target.value)}
          onFocus={() => setIsSearching(true)}
          onKeyUp={handleKeyUp}
        />

        <InputIconContainer>{isLoading ? <LoaderIcon /> : <SearchIcon />}</InputIconContainer>
      </InputContainer>

      {isSearching && <SearchResults cursor={cursor} results={results} onSelect={handleSelect} />}
    </Container>
  );
}

const Container = styled.div.attrs({ className: 'relative' })``;

const InputContainer = styled.div.attrs({
  className: 'transition relative text-gray-400 focus-within:text-primary-500',
})``;

const InputIconContainer = styled.div.attrs({
  className: 'flex absolute items-center inset-y-0 right-4',
})``;

const Input = styled.input.attrs({
  className: 'form-input focusable pr-10',
})``;

const LoaderIcon = styled(RiLoader5Line).attrs({ size: 24, className: 'animate-spin' })``;
const SearchIcon = styled(RiSearchLine).attrs({ size: 24, className: '' })``;
