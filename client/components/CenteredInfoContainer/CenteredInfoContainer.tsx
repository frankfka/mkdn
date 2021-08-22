import {
  Box,
  BoxProps,
  makeStyles,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
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
  const theme = useTheme();
  const useLargePadding = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      className={classes.root}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={useLargePadding ? 5 : 2}
      py={useLargePadding ? 15 : 5}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default CenteredInfoContainer;
