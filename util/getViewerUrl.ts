const getViewerUrl = (cid: string, password?: string): string => {
  const passwordQuery = !!password
    ? `?password=${encodeURIComponent(password)}`
    : '';
  return '/viewer/' + encodeURIComponent(cid) + passwordQuery;
};

export default getViewerUrl;
