import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { resetItems } from '../features/cartSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Badge,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  styled,
  Button,
} from '@mui/material';

const Header = ({ handleLogin, handleRegister }) => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetItems());
  };

  const { itemCount } = useSelector((state) => state.cart);

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'white',
        height: '50px',
        justifyContent: 'center',
        boxShadow: '0px 1px 5px 0px rgba(36,36,36,0.2)',
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="span" sx={{ flexGrow: 1 }}>
          <Link to="/">China City</Link>
        </Typography>

        <Stack direction="row" spacing={3} alignItems="center">
          <Link to="/cart">
            <Badge badgeContent={itemCount} showZero>
              <ShoppingCartIcon />
            </Badge>
          </Link>

          <DeleteForeverIcon
            size="large"
            onClick={handleReset}
            sx={{
              '&:hover': { cursor: 'pointer' },
              color: 'black',
            }}
          />

          <Button
            variant="text"
            onClick={handleLogin}
            color="primary"
            disableRipple
            sx={{
              '&:hover': { backgroundColor: 'white' },
            }}
          >
            Login
          </Button>

          <Button
            variant="text"
            onClick={handleRegister}
            color="primary"
            disableRipple
            sx={{
              '&:hover': { backgroundColor: 'white' },
            }}
          >
            Create Account
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
