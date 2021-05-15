import React from 'react';
import styled from 'styled-components';

import AppHeader from '../navigation/AppHeader';

interface Props {
  isCompact?: boolean;
}

export default function Screen({ children, ...props }: React.PropsWithChildren<Props>) {
  return (
    <>
      <AppHeader isCompact={props.isCompact} />
      <ScreenContent>{children}</ScreenContent>
    </>
  );
}

const ScreenContent = styled.div.attrs({
  className: 'container',
})``;
