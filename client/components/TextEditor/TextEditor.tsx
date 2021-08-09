import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import React, {MutableRefObject, useEffect, useState} from 'react';

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

export const EDITOR_LOCALSTORAGE_KEY = 'mkdn.saved-editor-state'

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

  const [savedEditorState, setSavedEditorState] = useState<string>()
  // On load, attempt to load previous data from localstorage (useEffect guarantees that this runs on client)
  useEffect(() => {
    const savedState = localStorage.getItem(EDITOR_LOCALSTORAGE_KEY)

    setSavedEditorState(savedState ?? '')
  }, [])

  // Auto-save the current state every 5 seconds
  const saveCurrentEditorState = () => {
    localStorage.setItem(EDITOR_LOCALSTORAGE_KEY, getMarkdownRef.current());
  }

  useEffect(() => {
    const autoSaveInterval = setInterval(saveCurrentEditorState, 5000);

    return () => clearInterval(autoSaveInterval);
  }, []);

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item className={classes.editorContainer} xs>
        {
          // Delay rendering the editor until we have retrieved the localStorage state
          savedEditorState != null && (
            <Editor
              id="mkdn"
              onChange={(fn) => (getMarkdownRef.current = fn)}
              disableExtensions={['container_notice']}
              placeholder="The page looks a bit bare..."
              defaultValue={savedEditorState}
              {...editorProps}
            />
          )
        }
      </Grid>
    </Grid>
  );
};

export default TextEditor;
