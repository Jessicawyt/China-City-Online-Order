import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Stack,
  Grid,
  Button,
  DialogActions,
} from '@mui/material';
import { transition } from '../constants';
import { useRegisterUserMutation } from '../features/userApi';

const Register = ({ openRegister, handleClose }) => {
  const [user, setUser] = useState({});
  const [errMessage, setErrMessage] = useState({});

  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    setErrMessage({});
    if (Object.keys(user).length === 5 && user.password === user.password2) {
      // post new user
      await registerUser(user)
        .unwrap()
        .then((data) => handleClose())
        .catch((err) => setErrMessage({ email: err.data.error }));
    }
    if (Object.keys(user).length === 5 && user.password !== user.password2) {
      setErrMessage({
        password: 'Your passwords do not match',
        password2: 'Your passwords do not match',
      });
    }
    if (!user.firstName) {
      setErrMessage((prev) => ({
        ...prev,
        firstName: 'First name is empty',
      }));
    }
    if (!user.lastName) {
      setErrMessage((prev) => ({
        ...prev,
        lastName: 'Last name is empty',
      }));
    }
    if (!user.email) {
      setErrMessage((prev) => ({
        ...prev,
        email: 'Please fill in your email',
      }));
    }
    if (!user.password) {
      setErrMessage((prev) => ({
        ...prev,
        password: 'Please fill in your passord',
      }));
    }
    if (!user.password2) {
      setErrMessage((prev) => ({
        ...prev,
        password2: 'Please fill in your password',
      }));
    }
  };

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
              onChange={handleChange}
              helperText={errMessage.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              variant="standard"
              name="lastName"
              id="lastName"
              label="Last Name"
              onChange={handleChange}
              helperText={errMessage.lastName}
            />
          </Grid>
        </Grid>

        <TextField
          variant="standard"
          name="email"
          id="email"
          label="Email"
          type="email"
          onChange={handleChange}
          helperText={errMessage.email}
        />

        <TextField
          variant="standard"
          name="password"
          id="password"
          label="Password"
          type="password"
          onChange={handleChange}
          helperText={errMessage.password}
        />

        <TextField
          variant="standard"
          name="password2"
          id="password2"
          label="Confirm Password"
          type="password"
          onChange={handleChange}
          helperText={errMessage.password2}
        />

        <DialogActions>
          <Button
            type="submit"
            fullWidth
            onClick={handleRegister}
            variant="contained"
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            Register
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default Register;
