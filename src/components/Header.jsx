import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { resetItems } from '../features/cartSlice';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';

const Header = () => {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetItems());
  };

  const { itemCount } = useSelector((state) => state.cart);

  return (
    <>
      <div className="header">
        <h1 className="home">
          <Link to="/">China City</Link>
        </h1>
        <ul className="nav-bar-right">
          <li className="menu">
            <Link to="/rq-dishes">Menu</Link>
          </li>
          <li className="cart">
            <Link to="/cart">
              <Badge badgeContent={itemCount} showZero>
                <ShoppingCartIcon />
              </Badge>
            </Link>
          </li>
          <li>
            <DeleteForeverIcon
              size="large"
              onClick={handleReset}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
