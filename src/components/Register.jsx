import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Grid,
  Button,
  DialogActions,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@mui/material';
import { transition } from '../constants';
import { useRegisterUserMutation } from '../features/userApi';
import Login from './Login';

const Register = ({ openRegister, handleClose }) => {
  const [user, setUser] = useState({});
  const [errMessage, setErrMessage] = useState({});
  const [goToLogin, setGoToLogin] = useState(false);
  const [backFromRegister, setBackFromRegister] = useState(false);

  const [registerUser, { isLoading, isSuccess }] = useRegisterUserMutation();

  const handleChange = (e) => {
    setUser((prev) => ({
      ...user,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    setErrMessage({});
    let userData = { ...user };
    userData.userType = userData.userType ? userData.userType : 'isCustomer';
    if (
      Object.keys(userData).length === 6 &&
      user.password === user.password2
    ) {
      delete userData.password2;
      userData.isAdmin = userData.userType === 'isAdmin' ? true : false;
      userData.isCustomer = userData.userType === 'isCustomer' ? true : false;
      delete userData.userType;
      // post new user
      await registerUser(userData)
        .unwrap()
        .then((data) => {
          setGoToLogin(true);
          setBackFromRegister(true);
          if (!goToLogin && backFromRegister) handleClose();
        })
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
    <>
      {!goToLogin && !backFromRegister && (
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

            <FormControl>
              <FormLabel htmlFor="userType">I am ... </FormLabel>
              <RadioGroup
                defaultValue="isCustomer"
                name="userType"
                row
                onChange={handleChange}
              >
                <FormControlLabel
                  value="isAdmin"
                  control={<Radio />}
                  label="Admin"
                />
                <FormControlLabel
                  value="isCustomer"
                  control={<Radio />}
                  label="Customer"
                />
              </RadioGroup>
            </FormControl>

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
      )}
      {goToLogin && (
        <Login openLogin={goToLogin} handleClose={() => setGoToLogin(false)} />
      )}
    </>
  );
};

export default Register;
