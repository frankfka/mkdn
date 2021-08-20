import { Dialog, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PublishSuccessContent from './PublishSuccessContent';
import ConfirmPublishContent from './ConfirmPublishContent';
import PublishedMarkdownData from './PublishedMarkdownData';

type Props = {
  isOpen: boolean;
  setIsOpen(v: boolean): void;
};

const useStyles = makeStyles((theme) => ({
  contentGrid: {
    width: '100%',
  },
}));

const PublishDialog: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  const classes = useStyles();

  const [publishedData, setPublishedData] = useState<PublishedMarkdownData>();

  const closeDialog = () => {
    setIsOpen(false);
    setPublishedData(undefined);
  };

  // Show success if published
  const dialogContent =
    publishedData != null ? (
      <PublishSuccessContent
        publishedData={publishedData}
        closeDialog={closeDialog}
      />
    ) : (
      <ConfirmPublishContent
        setPublishedData={setPublishedData}
        closeDialog={closeDialog}
      />
    );

  return (
    <Dialog open={isOpen} onClose={closeDialog} fullWidth scroll="paper">
      {dialogContent}
    </Dialog>
  );
};

export default PublishDialog;
