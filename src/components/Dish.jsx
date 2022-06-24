import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// Local Imports
import { addItem, removeItem } from '../features/cartSlice';
import Popup from './Popup';

const Dish = (props) => {
  const { name, price, image, description } = props;

  const [qty, setQty] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    // if user resets the cart, qty should be set to zero
    if (cartItems.length === 0) {
      setQty(0);
    }
    // If there are already dishes in the cart, qty should start with it's qty saved in the store
    for (var i = 0; i < cartItems.length; i++) {
      if (name === cartItems[i].name) {
        setQty(cartItems[i].qty);
      }
    }
    return () => {};
  }, [cartItems, name]);

  const handleAddItem = () => {
    setQty((prev) => prev + 1);
    dispatch(addItem({ name, price, qty: 1 }));
  };

  const handleRemoveItem = () => {
    if (qty >= 1) {
      setQty((prev) => prev - 1);
      dispatch(removeItem({ name, price, qty: 1 }));
    }
  };

  return (
    <>
      <Card>
        <CardMedia
          component="img"
          width="120"
          height="150"
          image={image}
          alt={name}
          sx={{ '&:hover': { cursor: 'pointer' } }}
          onClick={() => setPopupOpen(true)}
        />
        <Box>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              whiteSpace: 'nowrap',
              gap: '.4rem',
            }}
          >
            <Typography
              variant="subtitle2"
              component="span"
              sx={{ letterSpacing: '-0.5px' }}
            >
              {name}
            </Typography>
            <Typography variant="subtitle1" component="span">
              {price}
            </Typography>
          </CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1.5rem',
            }}
          >
            <RemoveCircleIcon
              onClick={handleRemoveItem}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
            {qty === 0 ? (
              <Typography variant="h6" component="h6">
                0
              </Typography>
            ) : (
              <Typography variant="h6" component="h6">
                {qty}
              </Typography>
            )}
            <AddCircleIcon
              onClick={handleAddItem}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          </Box>
        </Box>
      </Card>
      {popupOpen && (
        <Popup
          openPopup={popupOpen}
          handleClose={() => setPopupOpen(false)}
          description={description}
          name={name}
        />
      )}
    </>
  );
};

export default Dish;
