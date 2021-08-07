import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import type { AppProps } from 'next/app';

import theme from '../client/theme/theme';

// Markdown rendering stylesheet
import '../client/styles/GithubMarkdown.css';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </MuiThemeProvider>
    </>
  );
}
export default App;
