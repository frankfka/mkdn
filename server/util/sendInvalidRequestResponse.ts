import type { NextApiResponse } from 'next';

const sendInvalidRequestResponse = (res: NextApiResponse): void => {
  res.status(400).json({
    error: 'Invalid request',
  });
};

export default sendInvalidRequestResponse;
