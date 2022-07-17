import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Grid,
  Button,
} from '@mui/material';
import { transition } from '../constants';

const Register = ({ openRegister, handleClose }) => {
  return (
    <Dialog
      open={openRegister}
      onClose={handleClose}
      TransitionComponent={transition}
      PaperProps={{ sx: { width: '350px', height: 'auto' } }}
    >
      <DialogTitle mt={2} textAlign="center">
        Create An Account
      </DialogTitle>
      <DialogContent
        sx={{
          marginTop: 0,
          padding: '0 16%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: '.8rem',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              variant="standard"
              name="firstName"
              id="firstName"
              label="First Name"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              variant="standard"
              name="lastName"
              id="lastName"
              label="Last Name"
            />
          </Grid>
        </Grid>

        <TextField
          variant="standard"
          name="email"
          id="email"
          label="Email"
          type="email"
        />

        <TextField
          variant="standard"
          name="password"
          id="password"
          label="Password"
          type="password"
        />

        <TextField
          variant="standard"
          name="password2"
          id="password2"
          label="Confirm Password"
          type="password"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
