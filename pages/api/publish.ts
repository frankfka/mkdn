import type { NextApiRequest, NextApiResponse } from 'next';
import { pinMarkdownToIpfs } from '../../server/pinMarkdownToIpfs';
import type { PublishRequest } from '../../server/pinMarkdownToIpfs';
import sendInvalidRequestResponse from '../../server/util/sendInvalidRequestResponse';
import EndpointResult from '../../types/EndpointResult';
import executeAsyncForResult from '../../util/executeAsyncForResult';
import resultToEndpointResult from '../../util/resultToEndpointResult';

export type ApiPublishResponse = EndpointResult<{
  cid: string;
}>;

const parseRequest = (body: any): PublishRequest | undefined => {
  if (!body || !body.filename || !body.markdown) {
    return;
  }

  if (typeof body.filename !== 'string' || typeof body.markdown !== 'string') {
    return;
  }

  return {
    filename: body.filename,
    markdown: body.markdown,
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiPublishResponse>
) {
  if (req.method !== 'POST') {
    sendInvalidRequestResponse(res);
    return;
  }

  const publishRequest = parseRequest(req.body);

  if (publishRequest == null) {
    console.log('Invalid request to publish handler', req.body);
    sendInvalidRequestResponse(res);
    return;
  }

  const publishResult = await executeAsyncForResult(async () => {
    const publishedCid = await pinMarkdownToIpfs(publishRequest);
    return {
      cid: publishedCid,
    };
  });

  res.status(200).json(resultToEndpointResult(publishResult));
}
