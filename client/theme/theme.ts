import { createTheme } from '@material-ui/core';
import deepOrange from '@material-ui/core/colors/deepOrange';
import { white } from 'colorette';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000',
    },
    secondary: {
      main: deepOrange['A400'],
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
