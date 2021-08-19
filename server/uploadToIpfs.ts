import { nanoid } from 'nanoid';
import { File, Web3Storage } from 'web3.storage';
import MarkdownFileData from '../types/MarkdownFileData';
import getValidMarkdownFilename from '../util/getValidMarkdownFilename';

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
  // Create a file name if none was given
  const validFileName = filename ? filename : nanoid(5);

  return uploadToIpfs(
    new File([Buffer.from(markdown)], getValidMarkdownFilename(validFileName))
  );
};

// Uploads an arbitrary file to IPFS
export const uploadToIpfs = async (file: File): Promise<string> => {
  const client = makeStorageClient();

  return client.put([file], {
    wrapWithDirectory: false,
  });
};
