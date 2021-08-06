import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import { string } from 'prop-types';
import React, { MutableRefObject, useCallback, useRef, useState } from 'react';

import Editor from 'rich-markdown-editor';

type Props = {
  getMarkdownRef: MutableRefObject<() => string>;
};

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

// TODO:
// Styling, image upload, other events
// https://github.com/outline/rich-markdown-editor
const TextEditor: React.FC<Props> = ({ getMarkdownRef }) => {
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.editorContainer} xs>
        <Editor onChange={(fn) => (getMarkdownRef.current = fn)} />
      </Grid>
    </Grid>
  );
};

export default TextEditor;
