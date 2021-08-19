import formidable from 'formidable';

import type { NextApiRequest, NextApiResponse } from 'next';
import { getFilesFromPath } from 'web3.storage';
import { uploadToIpfs } from '../../server/uploadToIpfs';
import sendInvalidRequestResponse from '../../server/util/sendInvalidRequestResponse';
import EndpointResult from '../../types/EndpointResult';
import executeAsyncForResult from '../../util/executeAsyncForResult';
import {
  checkUploadSize,
  isImageMimeType,
  MAX_UPLOAD_SIZE,
} from '../../util/fileUploadUtils';
import resultToEndpointResult from '../../util/resultToEndpointResult';

export type ApiUploadResponse = EndpointResult<{
  cid: string;
}>;

type UploadRequest = {
  file: File;
};

// Parses the file sent in the multipart form data under form.file
const parseRequest = async (
  req: NextApiRequest
): Promise<UploadRequest | undefined> => {
  const form = formidable({
    maxFileSize: MAX_UPLOAD_SIZE,
  });

  return new Promise<UploadRequest | undefined>((resolve) => {
    // Parse files from form
    form.parse(req, (err, fields, files) => {
      if (files && files.file && 'path' in files.file) {
        const file = files.file;

        // Check the file keyed by "file"
        if (!checkUploadSize(file.size) || !isImageMimeType(file.type)) {
          console.log('Invalid file sent', file);
          resolve(undefined);
          return;
        }

        const sentFilepath = file.path as string;

        // Retrieve the file from the filepath
        getFilesFromPath([sentFilepath]).then((files) => {
          if (files.length > 0) {
            resolve({
              file: files[0] as unknown as File,
            });
          } else {
            resolve(undefined);
          }
        });
      } else {
        resolve(undefined);
      }
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiUploadResponse>
) {
  if (req.method !== 'POST') {
    sendInvalidRequestResponse(res);
    return;
  }

  const uploadRequest = await parseRequest(req);

  if (!uploadRequest) {
    res.status(400).json({
      error: 'Invalid file',
    });
    return;
  }

  const uploadResult = await executeAsyncForResult(async () => {
    return {
      cid: await uploadToIpfs(uploadRequest.file),
    };
  });

  res.status(200).json(resultToEndpointResult(uploadResult));
}

export const config = {
  api: {
    bodyParser: false,
  },
};
