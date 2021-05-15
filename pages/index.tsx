import Head from 'next/head';
import React from 'react';

import Screen from '../components/containers/Screen';

export default function Home() {
  return (
    <Screen>
      <Head>
        <title>Guidde</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello, there! 👋</h1>
    </Screen>
  );
}
