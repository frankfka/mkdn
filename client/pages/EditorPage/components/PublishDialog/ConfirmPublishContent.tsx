import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import SpacingContainer from '../../../../components/SpacingContainer/SpacingContainer';
import PublishedMarkdownData from './PublishedMarkdownData';
import { useEditorContext } from '../../../../context/EditorContext';
import { Alert } from '@material-ui/lab';

type Props = {
  setPublishedData(data: PublishedMarkdownData): void;
  closeDialog(): void;
};

const useStyles = makeStyles((theme) => ({}));

const ConfirmPublishContent: React.FC<Props> = ({
  setPublishedData,
  closeDialog,
}) => {
  const classes = useStyles();

  const editorContext = useEditorContext();
  const { publishMarkdown, password, setPassword } = editorContext;

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState(false);

  const onPublishClicked = async () => {
    setIsPublishing(true);
    setPublishError(false);

    try {
      const cid = await publishMarkdown();
      setPublishedData({
        cid,
        password,
      });
    } catch (err) {
      console.error('Error publishing document', err);
      setPublishError(true);
    }

    setIsPublishing(false);
  };

  return (
    <>
      <DialogTitle>Publish 📤</DialogTitle>
      <DialogContent>
        <SpacingContainer direction="column">
          {publishError && (
            <Alert onClose={() => setPublishError(false)} severity="error">
              Something went wrong. Please try again.
            </Alert>
          )}
          <Typography variant="body1">
            Your Markdown file will be published on IPFS publicly. If you want
            to encrypt your content, you can specify an optional password.
          </Typography>
          {/*TODO: Autogen*/}
          <TextField
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            fullWidth
            label="Password"
            variant="outlined"
            disabled={isPublishing}
          />
        </SpacingContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary" disabled={isPublishing}>
          Cancel
        </Button>
        <Button
          onClick={onPublishClicked}
          variant="contained"
          color="primary"
          disabled={isPublishing}
          startIcon={
            isPublishing && <CircularProgress color="primary" size={16} />
          }
        >
          Publish
        </Button>
      </DialogActions>
    </>
  );
};

export default ConfirmPublishContent;
