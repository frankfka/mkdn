import { makeStyles } from '@material-ui/core';
import React, { MutableRefObject } from 'react';

import Editor, { Props as EditorProps } from 'rich-markdown-editor';

type Props = {
  initialContent?: string;
  getMarkdownRef: MutableRefObject<() => string>;
} & Partial<
  Pick<
    EditorProps,
    | 'uploadImage'
    | 'onImageUploadStart'
    | 'onImageUploadStop'
    | 'onSave'
    | 'onShowToast'
  >
>;

const useStyles = makeStyles((theme) => ({}));

const MarkdownEditor: React.FC<Props> = ({
  getMarkdownRef,
  initialContent,
  ...editorProps
}) => {
  const classes = useStyles();

  return (
    <Editor
      id="mkdn"
      onChange={(fn) => (getMarkdownRef.current = fn)}
      disableExtensions={['container_notice']}
      placeholder="The page looks a bit bare..."
      defaultValue={initialContent}
      {...editorProps}
    />
  );
};

export default MarkdownEditor;
