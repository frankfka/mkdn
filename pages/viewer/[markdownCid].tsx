import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import MarkdownViewerPage from '../../client/pages/MarkdownViewerPage/MarkdownViewerPage';
import isCid from '../../client/util/isCid';
import { decryptMarkdown } from '../../client/util/markdownEncryption';
import fetchMarkdownFromIpfs from '../../server/fetchMarkdownFromIpfs';

type Props = {
  markdown?: string;
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<Props>> => {
  let markdown = '';

  const { markdownCid, password } = query;

  // Fetch markdown
  if (markdownCid && typeof markdownCid === 'string' && isCid(markdownCid)) {
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

  // Decrypt if needed
  if (!!password && typeof password === 'string') {
    markdown = decryptMarkdown(markdown, password);
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
  const { markdownCid } = useRouter().query;
  const cid = typeof markdownCid === 'string' ? markdownCid : undefined;

  return (
    <div>
      <Head>
        <title>mkdn | Viewer</title>
      </Head>
      <MarkdownViewerPage markdown={markdown} cid={cid} />
    </div>
  );
}
