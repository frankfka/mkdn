import sanitize from 'sanitize-filename';

const getValidMarkdownFilename = (filename: string): string => {
  return sanitize(filename).replace('.md', '') + '.md';
};

export default getValidMarkdownFilename;
