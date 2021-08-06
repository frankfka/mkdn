import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

type Props = {
  markdown: string;
};

// TODO: Syntax highlighting: https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
const MarkdownRenderer: React.FC<Props> = ({ markdown }) => {
  // Escape backslash newline with newline
  const markdownToRender = markdown.replace(/\\\n/gi, '\n \n');

  return (
    <div>
      <ReactMarkdown remarkPlugins={[gfm]}>{markdownToRender}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
