import { AppBar, Button, makeStyles, Toolbar } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Image from 'next/image';
import React from 'react';

import AppLogo from '../../../public/mkdn-logo.svg';
import SpacingContainer from '../SpacingContainer/SpacingContainer';

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
  },
  toolbar: {
    backgroundColor: theme.palette.common.white,
  },
  contentContainer: {
    minHeight: '80vh',
    // Padding
    padding: theme.spacing(4, 4),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(4, 8),
    },
  },
}));

const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" color="transparent">
        <Toolbar className={classes.toolbar}>
          <SpacingContainer justifyContent="space-between">
            {/*Logo*/}
            <Image src={AppLogo} height={36} width={96} alt="mkdn Logo" />

            {/*Right buttons*/}
            <div>
              <Button
                variant="outlined"
                color="primary"
                target="_blank"
                href="/"
                startIcon={<AddIcon />}
              >
                New
              </Button>
            </div>
          </SpacingContainer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
