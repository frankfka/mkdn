import { getCid, getCidGatewayUrl, isIpfsCid } from '../util/cidUtils';

const fetchMarkdownFromIpfs = async (possibleCid: string): Promise<string> => {
  const cleanedVal = getCid(possibleCid);

  if (!isIpfsCid(cleanedVal)) {
    throw Error('Not a CID: ' + possibleCid);
  }

  const fetchResp = await fetch(getCidGatewayUrl(possibleCid));

  if (fetchResp.status !== 200) {
    throw Error('Invalid status code');
  }

  return fetchResp.text();
};

export default fetchMarkdownFromIpfs;
