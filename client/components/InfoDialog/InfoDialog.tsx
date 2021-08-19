import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

type Props = {
  isOpen: boolean;
  closeDialog(): void;
  title?: string;
  message?: string;
};

const InfoDialog: React.FC<Props> = ({
  isOpen,
  closeDialog,
  title,
  message,
}) => {
  return (
    <Dialog open={isOpen} onClose={closeDialog}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoDialog;
