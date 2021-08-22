import {
  Button,
  CircularProgress,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import getViewerUrl from '../../../../util/getViewerUrl';
import CenteredInfoContainer from '../../../components/CenteredInfoContainer/CenteredInfoContainer';
import SpacingContainer from '../../../components/SpacingContainer/SpacingContainer';
import isCid from '../../../util/isCid';

const useStyles = makeStyles((theme) => ({
  textField: {
    width: '80%',
    [theme.breakpoints.up('md')]: {
      width: '50%',
    },
  },
}));

const MarkdownViewerCidEntryForm = () => {
  const classes = useStyles();

  const router = useRouter();

  // As we use getServerSideProps for viewer, retrieval takes a bit, so show a loading indicator
  const [loadingCid, setLoadingCid] = useState(false);
  const [cid, setCid] = useState('');
  const [password, setPassword] = useState('');

  const onViewClicked = () => {
    setLoadingCid(true);
    router.push(getViewerUrl(cid, password));
  };
  return (
    <CenteredInfoContainer>
      <SpacingContainer direction="column">
        <Typography variant="h3" align="center">
          View Markdown
        </Typography>
        <Typography variant="subtitle1" align="center">
          Enter a CID and an optional password to view a Markdown document on
          IPFS.
        </Typography>
        <TextField
          disabled={loadingCid}
          value={cid}
          onChange={(e) => setCid(e.currentTarget.value)}
          className={classes.textField}
          label="Markdown CID"
          variant="outlined"
        />
        <TextField
          disabled={loadingCid}
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value.trim())}
          className={classes.textField}
          label="Password (optional)"
          variant="outlined"
        />
        <Button
          disabled={!cid || !isCid(cid) || loadingCid}
          variant="contained"
          color="primary"
          onClick={onViewClicked}
          startIcon={
            loadingCid && <CircularProgress color="primary" size={16} />
          }
        >
          View
        </Button>
      </SpacingContainer>
    </CenteredInfoContainer>
  );
};

export default MarkdownViewerCidEntryForm;
