import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styled from 'styled-components';

import { SearchResultType } from '../../../utils/datasource';

export interface SelectableItem {
  onSelect?: (param: SearchResultType) => void;
}

interface Props extends SelectableItem {
  cursor: number;
  results: SearchResultType[];
}

interface ItemProps extends SelectableItem {
  item: SearchResultType['item'];
  isActive?: boolean;
}

export default function SearchResults({ cursor, results, onSelect }: Props) {
  return (
    <>
      {results?.length > 0 && (
        <ItemsList>
          {results.map(({ item }, index) => (
            <SearchResultsItem key={item.slug} item={item} onSelect={onSelect} isActive={cursor === index + 1} />
          ))}
        </ItemsList>
      )}
    </>
  );
}

function SearchResultsItem({ item, isActive, onSelect }: ItemProps) {
  const { t } = useTranslation('categories');

  function handleSelect() {
    onSelect?.({ item });
  }

  return (
    <Item className={isActive ? 'search-result-item active' : 'search-result-item'}>
      <ItemButton onClick={handleSelect}>
        <ItemCategory>{t(`${item.category}.title`)}</ItemCategory>
        <ItemLabel>{item.title}</ItemLabel>
      </ItemButton>
    </Item>
  );
}

const ItemsList = styled.ul.attrs({ className: 'search-result-list' })``;

const Item = styled.li``;
const ItemButton = styled.button.attrs({ className: 'group' })``;

const ItemCategory = styled.span.attrs({ className: 'search-result-description' })``;
const ItemLabel = styled.span.attrs({ className: 'search-result-title' })``;
