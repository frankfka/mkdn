import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import type { AppProps } from 'next/app';

import theme from '../client/theme/theme';

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
