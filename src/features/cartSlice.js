import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemCount: sessionStorage.getItem('itemCount')
    ? JSON.parse(sessionStorage.getItem('itemCount'))
    : 0,
  cartItems: sessionStorage.getItem('cartItems')
    ? JSON.parse(sessionStorage.getItem('cartItems'))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.itemCount = handlePayload(action.payload, state.cartItems, 'ADD');
      sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      sessionStorage.setItem('itemCount', JSON.stringify(state.itemCount));
    },
    updateItem: (state, action) => {
      state.itemCount = handlePayload(
        action.payload,
        state.cartItems,
        'UPDATE'
      );
      sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      sessionStorage.setItem('itemCount', JSON.stringify(state.itemCount));
    },
    resetItems: (state) => {
      state.itemCount = 0;
      state.cartItems = [];
      sessionStorage.removeItem('cartItems');
      sessionStorage.removeItem('itemCount');
    },
    // remove dish or multiple dishes of the same kind from OrderSummary component
    removeItemFromOrder: (state, action) => {
      state.itemCount = handlePayload(
        action.payload,
        state.cartItems,
        'REMOVEFROMORDER'
      );
      sessionStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      sessionStorage.setItem('itemCount', JSON.stringify(state.itemCount));
    },
  },
});

const handlePayload = (payload, stateArr, operation) => {
  // the length of cartItems array is changing as we add new dish ...
  // ... which means if we run a loop below based on cartItems length ...
  // ... to evaluate if the dish exists and modify(change value of qty OR push the new dish) ...
  // ... during each iteration, there will be 2 errors:
  // ...     - the new diffrent dish will be added to/removed from the array in each iteration
  // ...     - the length of the array will increase by 1 which will trigger the loop again if we are adding a new dish
  let updatedItemCount = 0;
  let exists = false;
  let index = undefined;
  // Loop through cartItems to see if the new dish exists and ...
  // ... change the value of exists accordingly.
  // If it exists, find the dish index in the array
  stateArr.forEach((dish, i) => {
    updatedItemCount += dish.qty;
    if (payload.identifier === dish.identifier) {
      exists = true;
      index = i;
    }
  });

  // If there is an index value, increase/decrease the qty property of the dish object based on action(operation)
  // If the new dish doesn't exist, push the new dish object into the array, remove logic could be ignored because ...
  // ... the dispatch method won't be called in the first place

  // if user is adding an order/orders with side
  if (exists && operation === 'ADD' && payload.side) {
    stateArr[index].qty = stateArr[index].qty + payload.qty;
    stateArr[index].side.qty += payload.side.qty;
    updatedItemCount += payload.qty;
    // if user is adding an order/orders without side
  } else if (exists && operation === 'ADD' && !payload.side) {
    stateArr[index].qty = stateArr[index].qty + payload.qty;
    updatedItemCount += payload.qty;
    // if user is updating an order/orders to the same side
  } else if (
    exists &&
    operation === 'UPDATE' &&
    payload.side &&
    payload.identifier.endsWith(payload.side.id.toString())
  ) {
    updatedItemCount -= stateArr[index].qty;
    stateArr[index].qty = payload.qty;
    stateArr[index].side = payload.side;
    updatedItemCount += payload.qty;
    // if user is updating an order/orders to a different side
  } else if (
    exists &&
    operation === 'UPDATE' &&
    payload.side &&
    !payload.identifier.endsWith(payload.side.id.toString())
  ) {
    updatedItemCount -= stateArr[index].qty;
    let updatedIdentifier =
      stateArr[index].id.toString() + payload.side.id.toString();
    const i = stateArr.findIndex((d) => d.identifier === updatedIdentifier);
    if (i !== -1) {
      stateArr[i].qty += payload.qty;
      stateArr[i].side.qty += payload.side.qty;
      stateArr = stateArr.splice(index, 1);
    } else {
      stateArr[index].identifier = updatedIdentifier;
      stateArr[index].qty = payload.qty;
      stateArr[index].side = payload.side;
    }

    updatedItemCount += payload.qty;
    // if user is only updating the qty of a sideless order/orders
  } else if (
    exists &&
    operation === 'UPDATE' &&
    !payload.side &&
    payload.identifier.endsWith('NoSide')
  ) {
    updatedItemCount -= stateArr[index].qty;
    stateArr[index].qty = payload.qty;
    updatedItemCount += payload.qty;
    // if user is updating an order/orders to a sideless order/orders
  } else if (
    exists &&
    operation === 'UPDATE' &&
    !payload.side &&
    !payload.identifier.endsWith('NoSide')
  ) {
    // let sideQty = stateArr[index].side ? stateArr[index].side.qty : 0;
    updatedItemCount -= stateArr[index].qty;
    // find if new identifier exists in stateArr
    const updatedIdentifier = payload.id.toString() + 'NoSide';
    let i = stateArr.findIndex((d) => d.identifier === updatedIdentifier);
    // if exists, there is no side, simply update the dish quantity
    if (i !== -1) {
      stateArr[i].qty += payload.qty;
      stateArr.splice(index, 1);
    }
    // if not, push it to stateArr
    else {
      stateArr[index].qty = payload.qty;
      stateArr[index].identifier = updatedIdentifier;
      delete stateArr[index].side;
    }
    updatedItemCount += payload.qty;
  } else if (!exists && operation === 'ADD') {
    stateArr.push(payload);
    updatedItemCount += payload.qty;
  } else if (exists && operation === 'REMOVEFROMORDER') {
    stateArr = stateArr.splice(index, 1);
    updatedItemCount -= payload.qty;
  }
  // If it is the first item adding to the cart
  if (stateArr.length === 0 && operation === 'ADD') {
    stateArr.push(payload);
    updatedItemCount += payload.qty;
  }
  return updatedItemCount;
};

export const { addItem, updateItem, resetItems, removeItemFromOrder } =
  cartSlice.actions;
export default cartSlice.reducer;
