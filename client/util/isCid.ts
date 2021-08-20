const isCid = (val: string): boolean => {
  const isV0Cid = val.startsWith('Qm');
  const isV1Cid = val.startsWith('b');

  return isV0Cid || isV1Cid;
};
export default isCid;
