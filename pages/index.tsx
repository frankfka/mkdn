import Head from 'next/head';
import React from 'react';
import Footer from '../client/components/Footer/Footer';
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
      <Footer />
    </div>
  );
}
