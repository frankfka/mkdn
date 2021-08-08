import { File, Web3Storage } from 'web3.storage';
import MarkdownFileData from '../types/MarkdownFileData';

// Creates a web3.storage client
function makeStorageClient() {
  const storageToken = process.env.WEB3_STORAGE_KEY;

  if (storageToken == null) {
    throw Error('Web3 Storage token not defined');
  }

  return new Web3Storage({ token: storageToken });
}

// Uploads Markdown to IPFS
export type PublishRequest = MarkdownFileData;
export const publishMarkdownToIpfs = async ({
  filename,
  markdown,
}: PublishRequest): Promise<string> => {
  if (!filename || !markdown) {
    throw Error('Either filename or markdown is not defined');
  }

  return uploadToIpfs(new File([Buffer.from(markdown)], filename));
};

// Uploads an arbitrary file to IPFS
export const uploadToIpfs = async (file: File): Promise<string> => {
  const client = makeStorageClient();

  return client.put([file], {
    wrapWithDirectory: false,
  });
};
