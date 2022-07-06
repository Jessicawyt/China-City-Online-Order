import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  itemCount: localStorage.getItem('itemCount')
    ? JSON.parse(localStorage.getItem('itemCount'))
    : 0,
  cartItems: localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      // Keep track of the total item number
      state.itemCount = state.itemCount + 1;
      handlePayload(action.payload, state.cartItems, 'ADD');
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('itemCount', JSON.stringify(state.itemCount));
    },
    removeItem: (state, action) => {
      state.itemCount = state.itemCount - 1;
      handlePayload(action.payload, state.cartItems, 'REMOVE');
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('itemCount', JSON.stringify(state.itemCount));
    },
    resetItems: (state) => {
      state.itemCount = 0;
      state.cartItems = [];
      localStorage.removeItem('cartItems');
      localStorage.removeItem('itemCount');
    },
    // remove dish or multiple dishes of the same kind from OrderSummary component
    removeItemFromOrder: (state, action) => {
      state.itemCount -= action.payload.qty;
      handlePayload(action.payload, state.cartItems, 'REMOVEFROMORDER');
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('itemCount', JSON.stringify(state.itemCount));
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
  let index = undefined;
  let exists = false;
  // Loop through cartItems to see if the new dish exists and ...
  // ... change the value of exists accordingly.
  // If it exists, find the dish index in the array
  for (let i = 0; i < stateArr.length; i++) {
    if (payload.name === stateArr[i].name) {
      exists = true;
      index = i;
    }
  }
  // If there is an index value, increase/decrease the qty property of the dish object based on action(operation)
  // If the new dish doesn't exist, push the new dish object into the array, remove logic could be ignored because ...
  // ... the dispatch method won't be called in the first place
  if (exists && operation === 'ADD') {
    stateArr[index].qty = stateArr[index].qty + 1;
  } else if (exists && operation === 'REMOVE' && stateArr[index].qty > 1) {
    stateArr[index].qty = stateArr[index].qty - 1;
  } else if (exists && operation === 'REMOVE' && stateArr[index].qty === 1) {
    stateArr = stateArr.splice(index, 1);
  } else if (!exists && operation === 'ADD') {
    stateArr.push(payload);
  } else if (exists && operation === 'REMOVEFROMORDER') {
    stateArr = stateArr.splice(index, 1);
  }
  // If it is the first item adding to the cart
  if (stateArr.length === 0 && operation === 'ADD') {
    stateArr.push(payload);
  }
};

export const { addItem, removeItem, resetItems, removeItemFromOrder } =
  cartSlice.actions;
export default cartSlice.reducer;
