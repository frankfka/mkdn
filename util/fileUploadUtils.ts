export const MAX_UPLOAD_SIZE = 10 ** 6 * 5; // 5mb upload limit

// Returns whether the size is small enough
export const checkUploadSize = (
  sizeInBytes?: number | string | null
): boolean => {
  if (!sizeInBytes) {
    return false;
  }

  return Number(sizeInBytes) < MAX_UPLOAD_SIZE;
};

// Returns whether the mime type is an image
export const isImageMimeType = (mimeType?: string | null): boolean => {
  return mimeType?.startsWith('image/') ?? false;
};
