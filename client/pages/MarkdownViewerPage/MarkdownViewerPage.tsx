import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Image from 'next/image';
import React from 'react';
import AppLogo from '../../../public/mkdn-logo.svg';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';

type Props = {
  markdown?: string;
};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  toolbar: {
    backgroundColor: theme.palette.common.white,
  },
  noContentContainer: {
    minHeight: '80vh',
    display: 'flex',
    alignContent: 'center',
  },
  noContentTextContainer: {
    margin: 'auto',
  },
}));

const MarkdownViewerTopBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" color="transparent">
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={3}>
            <Grid item>
              <Image src={AppLogo} height={36} width={96} alt="mkdn Logo" />
            </Grid>
            <Grid item xs />
            <Grid item>
              <Button
                variant="outlined"
                color="primary"
                target="_blank"
                href="/"
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

const NoContentView: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.noContentContainer}>
      <div className={classes.noContentTextContainer}>
        <Typography variant="h2" align="center">
          No Content 😢
        </Typography>
        <Typography variant="subtitle1" align="center">
          If you were expecting content to be rendered, double check the IPFS
          hash in the URL.
        </Typography>
      </div>
    </div>
  );
};

const MarkdownViewerPage: React.FC<Props> = ({ markdown }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <MarkdownViewerTopBar />
      {markdown ? <MarkdownRenderer markdown={markdown} /> : <NoContentView />}
    </div>
  );
};

export default MarkdownViewerPage;
