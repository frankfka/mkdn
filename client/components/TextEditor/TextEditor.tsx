import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import React, { MutableRefObject, useEffect, useState } from 'react';

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

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
    height: '100%',
  },
  topBar: {
    margin: theme.spacing(2),
  },
  saveButton: {
    marginLeft: 'auto', // Right align
  },
  editorContainer: {
    padding: theme.spacing(4),
  },
}));

// TODO: Styling & copy
// TODO: Save to local storage
// TODO: Close warning (unsaved)
// https://github.com/outline/rich-markdown-editor
const TextEditor: React.FC<Props> = ({
  getMarkdownRef,
  initialContent,
  ...editorProps
}) => {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.editorContainer} xs>
        <Editor
          id="mkdn"
          onChange={(fn) => (getMarkdownRef.current = fn)}
          disableExtensions={['container_notice']}
          placeholder="The page looks a bit bare..."
          defaultValue={initialContent}
          {...editorProps}
        />
      </Grid>
    </Grid>
  );
};

export default TextEditor;
