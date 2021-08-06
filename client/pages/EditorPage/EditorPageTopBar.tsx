import {
  AppBar,
  Box,
  Chip,
  createStyles,
  makeStyles,
  TextField,
  Theme,
  Toolbar,
} from '@material-ui/core';
import React from 'react';

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
          <TextField
            value={fileName}
            onChange={(e) => onFileNameChanged(e.currentTarget.value)}
            placeholder="File Name"
            inputProps={{
              className: classes.fileNameInput,
            }}
          />
        </Toolbar>
      </AppBar>
      {/*Extra toolbar to give margin to page content*/}
      <Toolbar />
    </div>
  );
};

export default EditorPageTopBar;
