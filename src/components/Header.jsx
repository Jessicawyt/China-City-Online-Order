import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const { itemCount } = useSelector((state) => state.cart);
  return (
    <>
      <div className="header">
        <h1 className="home">
          <Link to="/">Home</Link>
        </h1>
        <ul className="nav-bar-right">
          <li className="menu">
            <Link to="/rq-dishes">Menu</Link>
          </li>
          <li className="cart">
            <Link to="/cart">Cart</Link>
            <span>{itemCount}</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
