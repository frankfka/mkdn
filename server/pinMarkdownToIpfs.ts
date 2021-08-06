import { File, Web3Storage } from 'web3.storage';
import MarkdownFileData from '../types/MarkdownFileData';

export type PublishRequest = MarkdownFileData;

function makeStorageClient() {
  const storageToken = process.env.WEB3_STORAGE_KEY;

  if (storageToken == null) {
    throw Error('Web3 Storage token not defined');
  }

  return new Web3Storage({ token: storageToken });
}

// Uploads Markdown to IPFS using nft.storage
export const pinMarkdownToIpfs = async ({
  filename,
  markdown,
}: PublishRequest): Promise<string> => {
  if (!filename || !markdown) {
    throw Error('Either filename or markdown is not defined');
  }
  const client = makeStorageClient();

  const cid = await client.put([new File([Buffer.from(markdown)], filename)], {
    wrapWithDirectory: false,
  });

  return cid;
};
