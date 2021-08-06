export const getCid = (cidOrPrefixedUrl: string): string => {
  return cidOrPrefixedUrl.replace('ipfs://', '');
};

export const addIpfsPrefix = (cid: string): string => {
  return 'ipfs://' + cid;
};

export const getCidGatewayUrl = (cid: string): string => {
  return `https://ipfs.io/ipfs/${getCid(cid)}`;
};
