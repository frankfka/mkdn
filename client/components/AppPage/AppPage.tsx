import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import NavBar from '../NavBar/NavBar';

type Props = {};

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  content: {
    width: '100%',
    height: '100%',
    padding: theme.spacing(5, 10, 10, 10),
  },
}));

const AppPage: React.FC<Props> = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <NavBar />
      <Box className={classes.content}>{children}</Box>
    </Box>
  );
};

export default AppPage;
