import { makeStyles } from '@material-ui/core';
import React from 'react';
import TextEditor from '../components/TextEditor/TextEditor';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));

const EditorPage = () => {
  const classes = useStyles();

  const onSaveClicked = (val: string) => {
    console.log(val);
  };

  return (
    <div className={classes.root}>
      <TextEditor onSaveClicked={onSaveClicked} />
    </div>
  );
};

export default EditorPage;
