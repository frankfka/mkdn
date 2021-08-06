export const getCid = (cidOrPrefixedUrl: string): string => {
  return cidOrPrefixedUrl.replace('ipfs://', '');
};

export const addIpfsPrefix = (cid: string): string => {
  return 'ipfs://' + cid;
};

export const getCidGatewayUrl = (cid: string): string => {
  return `https://ipfs.io/ipfs/${getCid(cid)}`;
};

export const isIpfsCid = (possibleCid: string): boolean => {
  const isV0Cid = possibleCid.startsWith('Qm');
  const isV1Cid = possibleCid.startsWith('b');

  return isV0Cid || isV1Cid;
};
