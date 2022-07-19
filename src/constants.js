import React from 'react';
import { createTheme, colors, Slide } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000d4',
      light: '#706d6dfc',
    },
    secondary: {
      main: '#ba1818e8',
    },
  },
  typography: {
    fontFamily: ['Inconsolata', 'monospace'].join(','),
    fontSize: 13,
  },
});

export const transition = React.forwardRef((props, ref) => {
  return (
    <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});
