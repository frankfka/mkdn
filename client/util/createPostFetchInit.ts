type PostFetchParams = {
  body: any;
  headers?: any;
};

const createPostFetchInit = (params: PostFetchParams) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...params.headers,
    },
    body: JSON.stringify(params.body),
  };
};

export default createPostFetchInit;
