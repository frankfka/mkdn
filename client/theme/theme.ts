import { createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'Inter, Arial',
    button: {
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 0,
  },
});

export default theme;
