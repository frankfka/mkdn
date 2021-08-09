import { Container, makeStyles } from '@material-ui/core';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

type Props = {
  markdown: string;
};

const useStyles = makeStyles((theme) => ({
  markdownContainer: {
    padding: theme.spacing(8, 0),
  },
}));

// TODO: Syntax highlighting: https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
const MarkdownRenderer: React.FC<Props> = ({ markdown }) => {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.markdownContainer}>
        <ReactMarkdown remarkPlugins={[gfm]} className="markdown-body">
          {markdown}
        </ReactMarkdown>
      </Container>
    </div>
  );
};

export default MarkdownRenderer;
