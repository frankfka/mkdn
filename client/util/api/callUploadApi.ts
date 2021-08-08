import { ApiUploadResponse } from '../../../pages/api/upload';

const callUploadApi = async (file: File): Promise<ApiUploadResponse> => {
  // Construct form data with a `file` property
  const formData = new FormData();
  formData.append('file', file);

  const uploadResult = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  return uploadResult.json();
};

export default callUploadApi;
