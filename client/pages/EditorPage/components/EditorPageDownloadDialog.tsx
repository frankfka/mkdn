import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  TextField,
} from '@material-ui/core';
import React from 'react';
import { useEditorContext } from '../../../context/EditorContext';

type Props = {
  open: boolean;
  setOpen(val: boolean): void;
};

const useStyles = makeStyles((theme) => ({
  dialogContent: {
    overflowY: 'hidden',
  },
}));

const EditorPageDownloadDialog: React.FC<Props> = ({ open, setOpen }) => {
  const classes = useStyles();
  const editorContext = useEditorContext();

  const closeDialog = () => setOpen(false);
  const downloadClicked = () => editorContext.downloadMarkdown();

  return (
    <Dialog open={open} onClose={closeDialog} fullWidth>
      <DialogTitle>Download 💾</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Box pb={2}>
          <TextField
            label="File Name"
            fullWidth
            value={editorContext.fileName}
            onChange={(e) => editorContext.setFileName(e.currentTarget.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={downloadClicked} variant="contained" color="primary">
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditorPageDownloadDialog;
