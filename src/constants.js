import React from 'react';
import { createTheme, colors, Slide } from '@mui/material';

export const theme = createTheme({
  palette: {
    secondary: {
      main: colors.brown[50],
    },
  },
});

export const transition = React.forwardRef((props, ref) => {
  return (
    <Slide direction="up" mountOnEnter unmountOnExit ref={ref} {...props} />
  );
});

// 3 => 3.00
export const formatNumber = (n) => {
  n = n.toString();
  if (n.includes('.') && !n.endsWith('0')) {
    n += '0';
  } else {
    n += '.00';
  }
  return n;
};
