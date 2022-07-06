import {
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  Skeleton,
  Stack,
  Checkbox,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Typography,
  Box,
  DialogActions,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
// Local Imports
import { addItem, removeItem } from '../features/cartSlice';

const Popup = (props) => {
  const {
    openPopup,
    handleClose,
    name,
    price,
    image,
    description,
    isVegan,
    ContainsAllergy,
    glutenFree,
    spicyLevel,
    sidesData,
  } = props;

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const [qty, setQty] = useState(0);

  // sides only stores 1 side id
  const [sides, setSides] = useState([]);

  const handleChange = (e) => {
    //if the side is chosen, remove it from array
    if (sides.includes(e.target.value)) {
      setSides([]);
    }
    // if the side is not chosen, add it
    else {
      setSides([e.target.value]);
      // find the dish name & price AND update cart state in the store

      let addedItem = sidesData?.find((s) => s.id === Number(sides[0]));
      console.log(sides[0]);
      const name = addedItem.name;
      const price = addedItem.price;
      const qty = 1;
      dispatch(addItem({ name, price, qty }));
    }
  };

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

  const addToOrder = () => {};

  // 3 => 3.00
  const formatNumber = (n) => {
    n = n.toString();
    if (n.includes('.') && !n.endsWith('0')) {
      n += '0';
    } else {
      n += '.00';
    }
    return n;
  };

  return (
    <Dialog open={openPopup} onClose={handleClose}>
      <DialogTitle>{name}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}

        <Stack direction="column">
          <FormControl>
            <Stack direction="row" sx={{ alignItems: 'center' }}>
              <FormLabel
                sx={{ flexGrow: 1, fontWeight: 'bolder', color: 'black' }}
              >
                Choose Your Side
              </FormLabel>
              <Typography variant="subtitle1" component="span">
                Required
              </Typography>
            </Stack>
            <FormGroup>
              {sidesData?.map((s) => (
                <Stack direction="row" key={s.id}>
                  <FormControlLabel
                    sx={{ flexGrow: 1 }}
                    label={s.name}
                    value={s.id.toString()}
                    control={
                      <Checkbox
                        checked={sides.includes(s.id.toString())}
                        onChange={handleChange}
                        disabled={
                          sides.length === 1 && !sides.includes(s.id.toString())
                        }
                      />
                    }
                  />
                  <Typography variant="subtitle1" component="span">
                    {s.isFree ? '-' : '$' + formatNumber(s.price)}
                  </Typography>
                </Stack>
              ))}
            </FormGroup>
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            flexGrow: 1,
          }}
        >
          {qty === 0 ? (
            <RemoveCircleIcon sx={{ opacity: '0.2' }} />
          ) : (
            <RemoveCircleIcon
              onClick={handleRemoveItem}
              sx={{ '&:hover': { cursor: 'pointer' } }}
            />
          )}

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

        <Button variant="contained" color="secondary" onClick={addToOrder}>
          Add To Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
