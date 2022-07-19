import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Stack,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';
// Local Imports
import { removeItemFromOrder } from '../features/cartSlice';
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
    if (dish.side) {
      sum += dish.side.qty * dish.side.price;
    }
    return sum;
  }, 0);

  // round it up to 2 decimal place(just being cautious)
  total = total.toFixed(2);

  // remove the object that contains this dish name from cartItems
  // update itemCount
  const handleRemoveDish = (
    identifier,
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
        identifier,
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
    identifier,
    id,
    name,
    qty,
    price,
    description,
    isVegan,
    ContainsAllergy,
    glutenFree,
    spicyLevel,
    side,
    comesWithSide
  ) => {
    setDishData({
      identifier,
      id,
      name,
      qty,
      price,
      description,
      isVegan,
      ContainsAllergy,
      glutenFree,
      spicyLevel,
      side,
      comesWithSide,
    });

    setOpenEditPopup(true);
  };

  return (
    <div className="Order-Summary">
      <Stack
        direction="column"
        style={{ position: 'sticky', top: '100px', right: 0 }}
      >
        <Typography variant="span" ml={1} mt={1} sx={{ fontWeight: 'bolder' }}>
          Your Order
        </Typography>
        <Typography variant="span" ml={1} color="#969696fc">
          {itemCount} Items
        </Typography>

        <div>
          <TableContainer>
            <Table>
              <TableBody>
                {cartItems.length > 0 &&
                  cartItems.map((i) => (
                    <TableRow
                      key={i.identifier}
                      sx={{ verticalAlign: 'text-top' }}
                    >
                      <TableCell sx={{ border: 'none' }}>{i.qty}</TableCell>
                      <TableCell sx={{ border: 'none' }}>
                        <List>
                          <ListItem disablePadding>
                            <ListItemText primary={i.name} />
                          </ListItem>
                          {i.side && (
                            <ListItem
                              disablePadding
                              sx={{ color: '#969696fc' }}
                            >
                              <ListItemText primary={i.side.name} />
                            </ListItem>
                          )}
                          <ListItem disablePadding>
                            <Button
                              color="secondary"
                              sx={{
                                padding: 0,
                                minHeight: 0,
                                minWidth: 0,
                                marginRight: '16px',
                              }}
                              onClick={() =>
                                handleEdit(
                                  i.identifier,
                                  i.id,
                                  i.name,
                                  i.qty,
                                  i.price,
                                  i.description,
                                  i.isVegan,
                                  i.ContainsAllergy,
                                  i.glutenFree,
                                  i.spicyLevel,
                                  i.side,
                                  i.comesWithSide
                                )
                              }
                            >
                              Edit
                            </Button>

                            <Button
                              color="secondary"
                              sx={{
                                padding: 0,
                                minHeight: 0,
                                minWidth: 0,
                              }}
                              onClick={() =>
                                handleRemoveDish(
                                  i.identifier,
                                  i.id,
                                  i.name,
                                  i.qty,
                                  i.price,
                                  i.description,
                                  i.isVegan,
                                  i.ContainsAllergy,
                                  i.glutenFree,
                                  i.spicyLevel,
                                  i.comesWithSide
                                )
                              }
                            >
                              Remove
                            </Button>
                          </ListItem>
                        </List>
                      </TableCell>

                      <TableCell sx={{ border: 'none' }}>
                        {i.side
                          ? `$${(
                              (Number(i.price) + Number(i.side.price)) *
                              i.qty
                            ).toFixed(2)}`
                          : `$${(Number(i.price) * i.qty).toFixed(2)}`}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>

            <section className="cart-bottom">
              <p className="cart-item-count">{itemCount} Items</p>
              <div className="cart-total">
                <p>Total</p>
                <p>{total}</p>
              </div>
            </section>
          </TableContainer>
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
            dishIdentifier={dishData.identifier}
            quantity={dishData.qty}
            side={dishData.side ? dishData.side : 'NoSide'}
            comesWithSide={dishData.comesWithSide}
          />
        )}
      </Stack>
    </div>
  );
};

export default OrderSummary;
