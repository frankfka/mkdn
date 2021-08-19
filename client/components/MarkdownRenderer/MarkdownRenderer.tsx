import { makeStyles } from '@material-ui/core';
import React from 'react';
import Editor from 'rich-markdown-editor';

type Props = {
  markdown: string;
};

const useStyles = makeStyles((theme) => ({}));

const MarkdownRenderer: React.FC<Props> = ({ markdown }) => {
  const classes = useStyles();

  return (
    <div>
      <Editor
        disableExtensions={['container_notice']}
        defaultValue={markdown}
        readOnly
      />
    </div>
  );
};

export default MarkdownRenderer;
