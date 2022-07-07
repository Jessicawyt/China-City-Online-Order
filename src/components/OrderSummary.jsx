import { useSelector, useDispatch } from 'react-redux';
import { Button, Stack, Typography } from '@mui/material';
import { selectUnstyledClasses } from '@mui/base';
import { useState } from 'react';
// Local Imports
import { removeItemFromOrder, removeItem } from '../features/cartSlice';
import { useGetDishQuery } from '../features/dishesApi';
import EditPopup from '../components/EditPopup';
import Popup from './Popup';
import { useGetDishesByCategoryQuery } from '../features/dishesApi';

const OrderSummary = (props) => {
  const { sideCategoryId } = props;

  const dispatch = useDispatch();

  const { data: sidesData } = useGetDishesByCategoryQuery(sideCategoryId);

  const { itemCount, cartItems } = useSelector((state) => state.cart);

  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [dishData, setDishData] = useState({});

  // Calculate the total price
  let total = cartItems.reduce((sum, dish) => {
    sum += dish.price * dish.qty;
    return sum;
  }, 0);

  // round it up to 2 decimal place(just being cautious)
  total = total.toFixed(2);

  // remove the object that contains this dish name from cartItems
  // update itemCount
  const handleRemoveDish = (
    id,
    name,
    qty,
    price,
    description,
    isVegan,
    ContainsAllergy,
    glutenFree,
    spicyLevel
  ) => {
    dispatch(
      removeItemFromOrder({
        id,
        name,
        qty,
        price,
        description,
        isVegan,
        ContainsAllergy,
        glutenFree,
        spicyLevel,
      })
    );
  };

  const handleEdit = (
    id,
    name,
    qty,
    price,
    description,
    isVegan,
    ContainsAllergy,
    glutenFree,
    spicyLevel
  ) => {
    setDishData({
      id,
      name,
      qty,
      price,
      description,
      isVegan,
      ContainsAllergy,
      glutenFree,
      spicyLevel,
    });
    setOpenEditPopup(true);
  };

  // const handleRemoveItem = () => {
  //   if (qty >= 1) {
  //     dispatch(removeItem({ name, price, qty: 1 }));
  //   }
  // };

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
                  <Button
                    onClick={() =>
                      handleEdit(
                        i.id,
                        i.name,
                        i.qty,
                        i.price,
                        i.description,
                        i.isVegan,
                        i.ContainsAllergy,
                        i.glutenFree,
                        i.spicyLevel
                      )
                    }
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() =>
                      handleRemoveDish(
                        i.id,
                        i.name,
                        i.qty,
                        i.price,
                        i.description,
                        i.isVegan,
                        i.ContainsAllergy,
                        i.glutenFree,
                        i.spicyLevel
                      )
                    }
                  >
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
      {openEditPopup && dishData && sidesData && (
        <Popup
          openPopup={openEditPopup}
          handleClose={() => setOpenEditPopup(false)}
          name={dishData.name}
          price={dishData.price}
          description={dishData.description}
          isVegan={dishData.isVegan}
          ContainsAllergy={dishData.ContainsAllergy}
          glutenFree={dishData.glutenFree}
          spicyLevel={dishData.spicyLevel}
          sidesData={sidesData}
          isEditPopup={openEditPopup}
          dishId={dishData.id}
          quantity={dishData.qty}
        />
      )}
    </div>
  );
};

export default OrderSummary;
