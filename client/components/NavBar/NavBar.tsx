import {
  AppBar,
  Box,
  Button,
  createStyles,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

import AppLogo from '../../../public/packet_logo.svg';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    logoContainer: {
      cursor: 'pointer',
      flexGrow: 1,
    },
  })
);

const NavBar = () => {
  const classes = useStyles();
  const router = useRouter();

  const isRegistryPage = router.pathname.startsWith('/registry');
  const isIntakePage = router.pathname.startsWith('/intake');

  return (
    <>
      <AppBar color="default">
        <Toolbar>
          <Link href="/">
            <Box
              className={classes.logoContainer}
              display="flex"
              alignItems="center"
            >
              <Image src={AppLogo} height={36} width={36} alt="Packet Logo" />
              <Box ml={1}>
                <Typography variant="h6">Packet</Typography>
              </Box>
            </Box>
          </Link>

          <Link href="/registry" passHref>
            <Button
              variant="text"
              color={isRegistryPage ? 'secondary' : 'primary'}
            >
              <Box fontWeight={isRegistryPage ? 'bold' : undefined}>
                Registry
              </Box>
            </Button>
          </Link>

          <Link href="/intake" passHref>
            <Button
              variant="text"
              color={isIntakePage ? 'secondary' : 'primary'}
            >
              <Box fontWeight={isIntakePage ? 'bold' : undefined}>Intake</Box>
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
