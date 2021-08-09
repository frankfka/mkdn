import { saveAs } from 'file-saver';
import MarkdownFileData from '../../types/MarkdownFileData';
import getValidMarkdownFilename from '../../util/getValidMarkdownFilename';

const downloadMarkdownFile = (fileData: MarkdownFileData) => {
  const blob = new Blob([fileData.markdown], {
    type: 'text/markdown;charset=utf-8',
  });
  saveAs(blob, getValidMarkdownFilename(fileData.filename));
};

export default downloadMarkdownFile;
