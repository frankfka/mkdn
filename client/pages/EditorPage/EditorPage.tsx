import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import TextEditor from '../../components/TextEditor/TextEditor';
import createPostFetchInit from '../../util/createPostFetchInit';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
}));

const EditorPage = () => {
  const classes = useStyles();

  const [markdown, setMarkdown] = useState('');

  // TODO: modal with filename - then animations n stuff
  const onSaveClicked = async (val: string) => {
    setMarkdown(val);

    const publishResult = await fetch(
      '/api/publish',
      createPostFetchInit({
        body: {
          filename: 'TestMarkdownFile', // TODO need to standardize
          markdown: val,
        },
      })
    );

    const publishResultJson = await publishResult.json();

    console.log('Published');
    console.log(publishResultJson);
  };

  return (
    <div className={classes.root}>
      <TextEditor onSaveClicked={onSaveClicked} />
    </div>
  );
};

export default EditorPage;
