import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetItems } from '../features/cartSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  Badge,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Tab,
  Tabs,
} from '@mui/material';

import { theme } from '../constants';

const Header = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetItems());
  };

  const { itemCount } = useSelector((state) => state.cart);

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: theme.palette.secondary.main, marginBottom: '0px' }}
    >
      <Toolbar>
        <Typography variant="h5" component="span" sx={{ flexGrow: 1 }}>
          <Link to="/">China City</Link>
        </Typography>

        <Stack direction="row" spacing={3}>
          <Link to="/dishes">Menu</Link>

          <Link to="/cart">
            <Badge badgeContent={itemCount} showZero>
              <ShoppingCartIcon />
            </Badge>
          </Link>

          <DeleteForeverIcon
            size="large"
            onClick={handleReset}
            sx={{ '&:hover': { cursor: 'pointer' }, color: 'black' }}
          />
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
