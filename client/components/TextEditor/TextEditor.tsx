import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import { string } from 'prop-types';
import React, { MutableRefObject, useCallback, useRef, useState } from 'react';

import Editor, { Props as EditorProps } from 'rich-markdown-editor';

type Props = {
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
const TextEditor: React.FC<Props> = ({ getMarkdownRef, ...editorProps }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.editorContainer} xs>
        <Editor
          onChange={(fn) => (getMarkdownRef.current = fn)}
          disableExtensions={['container_notice']}
          {...editorProps}
        />
      </Grid>
    </Grid>
  );
};

export default TextEditor;
