import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { EmbeddingStateProvider } from '../hooks/useEmbeddingState';

const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  return (
    <EmbeddingStateProvider>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </EmbeddingStateProvider>
  );
}

export default App;
