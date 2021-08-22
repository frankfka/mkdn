import {
  AppBar,
  Link,
  makeStyles,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import Image from 'next/image';
import React from 'react';

import AppLogo from '../../../public/mkdn-logo.svg';
import SpacingContainer from '../SpacingContainer/SpacingContainer';
import FullNavMenu from './FullNavMenu';
import MobileNavMenu from './MobileNavMenu';

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
  const theme = useTheme();
  const renderFullMenu = useMediaQuery(theme.breakpoints.up('sm'));

  const menu = renderFullMenu ? <FullNavMenu /> : <MobileNavMenu />;

  return (
    <>
      <AppBar position="fixed" color="transparent">
        <Toolbar className={classes.toolbar}>
          <SpacingContainer justifyContent="space-between" alignItems="center">
            {/*Logo*/}
            <Link href="/">
              <Image src={AppLogo} height={36} width={96} alt="mkdn Logo" />
            </Link>

            {/*Menu buttons*/}
            {menu}
          </SpacingContainer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
