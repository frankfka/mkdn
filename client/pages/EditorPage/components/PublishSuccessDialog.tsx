import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  IconButton,
  TextField,
  Typography,
  Grid,
  makeStyles,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import React from 'react';
import { getCidGatewayUrl } from '../../../../util/cidUtils';
import getViewerUrlFromCid from '../../../../util/getViewerUrlFromCid';
import SpacingContainer from '../../../components/SpacingContainer/SpacingContainer';
import TextFieldWithCopy from '../../../components/TextFieldWithCopy/TextFieldWithCopy';

type Props = {
  cid: string;
  isOpen: boolean;
  closeDialog(): void;
};

const useStyles = makeStyles((theme) => ({
  contentGrid: {
    width: '100%',
  },
  fullWidthItem: {
    width: '100%',
  },
}));

const PublishSuccessDialog: React.FC<Props> = ({
  cid,
  isOpen,
  closeDialog,
}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={closeDialog} fullWidth scroll="paper">
      <DialogTitle>Published! 🎉</DialogTitle>
      <DialogContent>
        <SpacingContainer direction="column" className={classes.contentGrid}>
          <Typography variant="body1">
            Your Markdown file was published to the Interplanetary File System
            (IPFS). It will be persisted for at least 30 days.{' '}
            <Typography variant="caption">
              <Link
                color="secondary"
                href="https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs"
                target="_blank"
              >
                Learn more about IPFS.
              </Link>
            </Typography>
          </Typography>
          <TextFieldWithCopy value={cid} readonly fullWidth label="CID" />
          <TextFieldWithCopy
            value={getCidGatewayUrl(cid)}
            readonly
            fullWidth
            label="Link to File"
          />
          <Box textAlign="center">
            <Button
              variant="outlined"
              color="primary"
              href={getViewerUrlFromCid(cid)}
              target="_blank"
              startIcon={<OpenInNewIcon />}
            >
              View Formatted Markdown
            </Button>
          </Box>
        </SpacingContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PublishSuccessDialog;
