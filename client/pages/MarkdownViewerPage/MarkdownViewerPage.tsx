import { makeStyles } from '@material-ui/core';
import React from 'react';
import AppPage from '../../components/AppPage/AppPage';
import MarkdownRenderer from '../../components/MarkdownRenderer/MarkdownRenderer';
import MarkdownViewerCidEntryForm from './components/MarkdownViewerCidEntryForm';
import MarkdownViewerNoContentView from './components/MarkdownViewerNoContentView';

type Props = {
  markdown?: string;
  cid?: string; // Defined if a CID has been given
};

const useStyles = makeStyles((theme) => ({}));

const MarkdownViewerPage: React.FC<Props> = ({ markdown, cid }) => {
  const classes = useStyles();

  let content: React.ReactElement;

  if (markdown) {
    content = <MarkdownRenderer markdown={markdown} />;
  } else if (cid) {
    // Render the no info container if CID has been given but no markdown exists
    content = <MarkdownViewerNoContentView />;
  } else {
    content = <MarkdownViewerCidEntryForm />;
  }

  return <AppPage>{content}</AppPage>;
};

export default MarkdownViewerPage;
