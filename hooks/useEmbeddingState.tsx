import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState } from 'react';

const embeddingContext = createContext({ isEmbedded: false });

export function EmbeddingStateProvider({ children }: React.PropsWithChildren<unknown>) {
  const state = useProvideEmbeddingState();

  return <embeddingContext.Provider value={state}>{children}</embeddingContext.Provider>;
}

export const useEmbeddingState = () => {
  return useContext(embeddingContext);
};

function useProvideEmbeddingState() {
  const [isEmbedded, setIsEmbedded] = useState(false);
  const { query } = useRouter();

  const currentEmbeddingState = query.embedded;

  useEffect(() => {
    if (currentEmbeddingState) {
      setIsEmbedded(currentEmbeddingState == 'true');
    }
  }, [currentEmbeddingState]);

  return {
    isEmbedded,
  };
}
