import React from 'react';
import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Skeleton,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  DialogActions,
  Button,
  IconButton,
} from '@mui/material';

const EditPopup = (props) => {
  const { openEditPopup, handleClose } = props;

  return (
    <Dialog open={openEditPopup} onClose={handleClose}>
      <DialogTitle>Edit Dish</DialogTitle>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default EditPopup;
