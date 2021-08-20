import { Box, Button, makeStyles, Typography } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';
import CenteredInfoContainer from '../../../components/CenteredInfoContainer/CenteredInfoContainer';
import SpacingContainer from '../../../components/SpacingContainer/SpacingContainer';

type Props = {};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '80vh',
  },
}));

const MarkdownViewerNoContentView: React.FC<Props> = () => {
  const classes = useStyles();
  return (
    <CenteredInfoContainer className={classes.root}>
      <SpacingContainer direction="column">
        <Typography variant="h3" align="center">
          No Content 😢
        </Typography>
        <Typography variant="subtitle1" align="center">
          If you were expecting content to be rendered, please double check the
          CID and try again.
        </Typography>
        <Box textAlign="center">
          <Link href="/viewer" passHref>
            <Button variant="contained" color="primary">
              Try Again
            </Button>
          </Link>
        </Box>
      </SpacingContainer>
    </CenteredInfoContainer>
  );
};

export default MarkdownViewerNoContentView;
