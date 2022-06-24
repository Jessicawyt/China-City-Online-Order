import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Skeleton,
} from '@mui/material';

const Popup = (props) => {
  const { openPopup, handleClose, description, name } = props;

  console.log();

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
