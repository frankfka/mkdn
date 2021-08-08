import Image from 'next/image';
import {
  AppBar,
  Box,
  Chip,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Toolbar,
} from '@material-ui/core';
import React from 'react';

import AppLogo from '../../../public/mkdn-logo.svg';

type Props = {
  fileName: string;
  onFileNameChanged(val: string): void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: {
      justifyContent: 'center',
      backgroundColor: theme.palette.common.white,
    },
    fileNameTextField: {
      width: '100%',
    },
    fileNameInput: {
      textAlign: 'center',
    },
  })
);

const EditorPageTopBar: React.FC<Props> = ({ fileName, onFileNameChanged }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/*App Bar*/}
      <AppBar position="fixed" color="transparent">
        <Toolbar className={classes.toolbar}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Image src={AppLogo} height={36} width={96} alt="mkdn Logo" />
            </Grid>
            <Grid item xs>
              <TextField
                value={fileName}
                onChange={(e) => onFileNameChanged(e.currentTarget.value)}
                placeholder="File Name"
                className={classes.fileNameTextField}
                inputProps={{
                  className: classes.fileNameInput,
                }}
              />
            </Grid>
            <Grid item md />
          </Grid>
        </Toolbar>
      </AppBar>
      {/*Extra toolbar to give margin to page content*/}
      <Toolbar />
    </div>
  );
};

export default EditorPageTopBar;
