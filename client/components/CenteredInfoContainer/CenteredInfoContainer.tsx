import { Box, BoxProps, makeStyles } from '@material-ui/core';
import React from 'react';

/*
Container for general help / error information. All items are centered
 */

type Props = {} & Partial<BoxProps>;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
}));

const CenteredInfoContainer: React.FC<Props> = ({ children, ...boxProps }) => {
  const classes = useStyles();

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={5}
      py={15}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default CenteredInfoContainer;
