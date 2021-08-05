import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import { string } from 'prop-types';
import React, { useCallback, useRef, useState } from 'react';

import Editor from 'rich-markdown-editor';

type Props = {
  onSaveClicked(val: string): void;
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
const TextEditor: React.FC<Props> = ({ onSaveClicked }) => {
  const classes = useStyles();

  const getValueFn = useRef<() => string>();

  const saveButtonClicked = useCallback(() => {
    onSaveClicked(getValueFn.current?.() ?? '');
  }, [getValueFn, onSaveClicked]);

  return (
    <Grid container direction="column" className={classes.root}>
      {/*TODO this should scroll instead*/}
      <Grid item className={classes.topBar}>
        <Box display="flex">
          <Button
            variant="contained"
            color="primary"
            className={classes.saveButton}
            onClick={saveButtonClicked}
          >
            Save
          </Button>
        </Box>
      </Grid>
      <Grid item className={classes.editorContainer} xs>
        <Editor onChange={(fn) => (getValueFn.current = fn)} />
      </Grid>
    </Grid>
  );
};

export default TextEditor;
