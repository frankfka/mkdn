import Head from 'next/head';
import React from 'react';
import Footer from '../../client/components/Footer/Footer';
import MarkdownViewerPage from '../../client/pages/MarkdownViewerPage/MarkdownViewerPage';

import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from 'next';
import fetchMarkdownFromIpfs from '../../server/fetchMarkdownFromIpfs';

type Props = {
  markdown?: string;
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  let markdown = '';

  const { markdownCid } = query;
  if (markdownCid && typeof markdownCid === 'string') {
    try {
      markdown = await fetchMarkdownFromIpfs(markdownCid);
    } catch (e) {
      console.error(
        'Error getting markdown from IPFS',
        markdownCid,
        'Error: ',
        e
      );
    }
  }

  return {
    props: {
      markdown,
    },
  };
};

export default function MarkdownViewer({
  markdown,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>mkdn | Viewer</title>
      </Head>
      <MarkdownViewerPage markdown={markdown} />
      <Footer />
    </div>
  );
}
