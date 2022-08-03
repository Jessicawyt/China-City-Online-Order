import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
// Local Imports
import { transition } from '../constants';
import { useLoginUserMutation } from '../features/userApi';
import { login } from '../features/userSlice';

const Login = ({ openLogin, handleClose }) => {
  const dispatch = useDispatch();

  const [loginUser] = useLoginUserMutation();
  const [user, setUser] = useState({});
  const [remember, setRemember] = useState(false);
  const [errMessage, setErrMessage] = useState({});

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRemember = (e) => {
    setRemember(e.target.checked);
  };

  const handleSubmit = async () => {
    setErrMessage({});
    if (!user.password) {
      setErrMessage((prev) => ({
        ...prev,
        password: "Password can't be empty",
      }));
    }
    if (!user.email) {
      setErrMessage((prev) => ({ ...prev, email: "Email can't be empty" }));
    }
    if (user.password && user.email) {
      await loginUser(user)
        .unwrap()
        .then((data) => {
          const { user, token } = data;
          dispatch(
            login({
              token,
              isAuthenticated: true,
              user,
              remember,
            })
          );
          handleClose();
        })
        .catch((err) => {
          if (err.data.error === 'Wrong password')
            setErrMessage({ password: err.data.error });
          if (err.data.error === "Email doesn't exist")
            setErrMessage({ email: err.data.error });
        });
    }
  };

  return (
    <Dialog
      open={openLogin}
      onClose={handleClose}
      TransitionComponent={transition}
      PaperProps={{ sx: { width: '350px', height: 'auto' } }}
    >
      <DialogTitle mt={2} textAlign="center">
        Sign In
      </DialogTitle>
      <DialogContent
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={handleChange}
          helperText={errMessage.email}
        />
        <TextField
          variant="standard"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
          helperText={errMessage.password}
        />
        <FormControlLabel
          control={
            <Checkbox
              color="secondary"
              onChange={handleRemember}
              name="remember"
            />
          }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          onClick={handleSubmit}
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Link href="#" variant="body2">
              Sign Up
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
