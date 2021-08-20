import Head from 'next/head';
import React from 'react';
import { EditorContextProvider } from '../client/context/EditorContext';
import EditorPage from '../client/pages/EditorPage/EditorPage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>mkdn | Editor</title>
      </Head>
      <EditorContextProvider>
        <EditorPage />
      </EditorContextProvider>
    </div>
  );
}
