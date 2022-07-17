import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

// Local Imports
import { theme } from '../constants';
import { transition } from '../constants';

const Login = ({ openLogin, handleClose }) => {
  const handleSubmit = () => {};

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
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="secondary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
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
