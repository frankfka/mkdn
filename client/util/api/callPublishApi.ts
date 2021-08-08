import { ApiPublishResponse } from '../../../pages/api/publish';
import { PublishRequest } from '../../../server/remoteIpfs';
import createPostFetchInit from '../createPostFetchInit';

const callPublishApi = async (
  data: PublishRequest
): Promise<ApiPublishResponse> => {
  const publishResult = await fetch(
    '/api/publish',
    createPostFetchInit({
      body: data,
    })
  );

  return publishResult.json();
};

export default callPublishApi;
