import { createTheme } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: grey['800'],
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
