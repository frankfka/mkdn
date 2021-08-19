import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import AppPage from '../../components/AppPage/AppPage';
import CenteredInfoContainer from '../../components/CenteredInfoContainer/CenteredInfoContainer';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';

type Props = {
  markdown?: string;
};

const useStyles = makeStyles((theme) => ({}));

const NoContentView: React.FC = () => {
  return (
    <CenteredInfoContainer>
      <Typography variant="h3" align="center" paragraph>
        No Content 😢
      </Typography>
      <Typography variant="subtitle1" align="center">
        If you were expecting content to be rendered, double check the IPFS hash
        in the URL.
      </Typography>
    </CenteredInfoContainer>
  );
};

const MarkdownViewerPage: React.FC<Props> = ({ markdown }) => {
  const classes = useStyles();
  return (
    <AppPage>
      {markdown ? <MarkdownRenderer markdown={markdown} /> : <NoContentView />}
    </AppPage>
  );
};

export default MarkdownViewerPage;
