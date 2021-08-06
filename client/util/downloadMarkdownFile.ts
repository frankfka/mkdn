import { saveAs } from 'file-saver';
import MarkdownFileData from '../../types/MarkdownFileData';

const downloadMarkdownFile = (fileData: MarkdownFileData) => {
  const blob = new Blob([fileData.markdown], {
    type: 'text/markdown;charset=utf-8',
  });
  saveAs(blob, fileData.filename);
};

export default downloadMarkdownFile;
