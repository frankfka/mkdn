import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  makeStyles,
  Typography,
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import React from 'react';
import { getCidGatewayUrl } from '../../../../../util/cidUtils';
import getViewerUrl from '../../../../../util/getViewerUrl';
import SpacingContainer from '../../../../components/SpacingContainer/SpacingContainer';
import TextFieldWithCopy from '../../../../components/TextFieldWithCopy/TextFieldWithCopy';
import PublishedMarkdownData from './PublishedMarkdownData';

type Props = {
  publishedData: PublishedMarkdownData;
  closeDialog(): void;
};

const useStyles = makeStyles((theme) => ({}));

const PublishSuccessContent: React.FC<Props> = ({
  publishedData,
  closeDialog,
}) => {
  const classes = useStyles();

  const { cid, password } = publishedData;
  const viewerUrl = getViewerUrl(cid, password);

  return (
    <>
      <DialogTitle>Published! 🎉</DialogTitle>
      <DialogContent>
        <SpacingContainer direction="column">
          <Typography variant="body1">
            Your Markdown file was published to the Interplanetary File System
            (IPFS). It will be persisted for at least 30 days.{' '}
            <Typography variant="caption">
              <Link
                href="https://docs.ipfs.io/concepts/what-is-ipfs/#what-is-ipfs"
                target="_blank"
                underline="always"
              >
                Learn more about IPFS
              </Link>
            </Typography>
          </Typography>
          <TextFieldWithCopy
            value={cid}
            readonly
            fullWidth
            label="CID"
            variant="outlined"
          />
          <TextFieldWithCopy
            value={getCidGatewayUrl(cid)}
            readonly
            fullWidth
            label="Link to File"
            variant="outlined"
          />
          {!!password && (
            <TextFieldWithCopy
              value={password}
              readonly
              fullWidth
              label="Password"
              variant="outlined"
            />
          )}
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              href={viewerUrl}
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
    </>
  );
};

export default PublishSuccessContent;
