import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';

type Props = {
  markdown?: string;
};

const NoContentView: React.FC = () => {
  return (
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <Typography variant="h2">No Content 😢</Typography>
      </Grid>
      <Grid item>
        <Typography variant="subtitle1">
          If you were expecting content to be rendered, double check the IPFS
          hash in the URL.
        </Typography>
      </Grid>
    </Grid>
  );
};

const MarkdownViewerPage: React.FC<Props> = ({ markdown }) => {
  return (
    <div>
      {markdown ? <MarkdownRenderer markdown={markdown} /> : <NoContentView />}
    </div>
  );
};

export default MarkdownViewerPage;
