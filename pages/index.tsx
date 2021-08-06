import Head from 'next/head';
import EditorPage from '../client/pages/EditorPage/EditorPage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Markdown IPFS</title>
        <meta name="description" content="Markdown IPFS" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <EditorPage />
    </div>
  );
}
