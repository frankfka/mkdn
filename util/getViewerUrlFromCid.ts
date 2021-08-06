const getViewerUrlFromCid = (cid: string): string => {
  return '/viewer/' + encodeURIComponent(cid);
};

export default getViewerUrlFromCid;
