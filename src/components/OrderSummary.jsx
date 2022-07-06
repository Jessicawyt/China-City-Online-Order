import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Typography } from '@mui/material';
import { selectUnstyledClasses } from '@mui/base';
// Local Imports
import { removeItemFromOrder } from '../features/cartSlice';

const OrderSummary = () => {
  const dispatch = useDispatch();

  const { itemCount, cartItems } = useSelector((state) => state.cart);

  // Calculate the total price
  let total = cartItems.reduce((sum, dish) => {
    sum += dish.price * dish.qty;
    return sum;
  }, 0);

  // round it up to 2 decimal place(just being cautious)
  total = total.toFixed(2);

  const handleRemoveDish = (name, qty) => {
    // remove the object that contains this dish name from cartItems
    // update itemCount
    dispatch(removeItemFromOrder({ name, qty }));
  };

  return (
    <div className="cart-page">
      <section className="cart-header">
        <h3>Order Summary</h3>
      </section>
      <div className="cart-main">
        <section className="cart-list">
          {cartItems.length > 0 &&
            cartItems.map((i) => (
              <Stack key={i.name} direction="column">
                <Stack direction="row" spacing={3}>
                  {<Typography>{i.qty}</Typography>}
                  {<Typography>{i.name}</Typography>}
                </Stack>
                <Stack direction="row">
                  <Button>Edit</Button>
                  <Button onClick={() => handleRemoveDish(i.name, i.qty)}>
                    Remove
                  </Button>
                </Stack>
              </Stack>
            ))}
        </section>
        <section className="cart-bottom">
          <p className="cart-item-count">{itemCount} Items</p>
          <div className="cart-total">
            <p>Total</p>
            <p>{total}</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderSummary;
