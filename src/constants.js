import React from 'react';
import { createTheme, colors, Slide } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#000000d4',
    },
    secondary: {
      main: '#ba1818e8',
    },
  },
});

export const transition = React.forwardRef((props, ref) => {
  return (
    <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});
