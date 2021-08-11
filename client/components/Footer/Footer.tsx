import { Box, Button, Paper } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <Paper square variant="outlined">
        <Box px={2} py={1}>
          <Button
            size="small"
            startIcon={<GitHubIcon />}
            target="_blank"
            href="https://github.com/frankfka/mkdn"
          >
            Source
          </Button>
        </Box>
      </Paper>
    </footer>
  );
};

export default Footer;
