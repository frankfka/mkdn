import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

type Props = {
  markdown: string;
};

// TODO: Deal with line breaks https://github.com/remarkjs/react-markdown/issues/561
// TODO: Syntax highlighting: https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight
const MarkdownRenderer: React.FC<Props> = ({ markdown }) => {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[gfm]}>{markdown}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
