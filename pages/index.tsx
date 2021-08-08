import Head from 'next/head';
import React from 'react';
import EditorPage from '../client/pages/EditorPage/EditorPage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>mkdn | Editor</title>
      </Head>
      <EditorPage />
    </div>
  );
}
