import {
  Backdrop,
  CircularProgress,
  createStyles,
  makeStyles,
} from '@material-ui/core';
import React from 'react';

type Props = {
  isOpen: boolean;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.appBar + 1,
      color: theme.palette.common.white,
    },
  })
);

const BackdropLoadingScreen: React.FC<Props> = ({ isOpen }) => {
  const classes = useStyles();

  return (
    <Backdrop className={classes.backdrop} open={isOpen}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropLoadingScreen;
