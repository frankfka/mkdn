import { createTheme } from '@material-ui/core';
import deepPurple from '@material-ui/core/colors/deepPurple';
import { white } from 'colorette';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: deepPurple['500'],
    },
    background: {
      default: 'white',
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
