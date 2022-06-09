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
      // the length of cartItems array is changing as we add new dish ...
      // ... which means if we run a loop below based on cartItems length ...
      // ... to evaluate if the dish exists and modify(change value of qty OR push the new dish) ...
      // ... during each iteration, there will be 2 errors:
      // ...     - the new diffrent dish will be added to the array in iteration 1
      // ...     - the length of the array will increase by 1 which will trigger the loop again
      let index = undefined;
      let exists = false;
      // Loop through cartItems to see if the new dish exists and ...
      // ... change the value of exists accordingly.
      // If it exists, find the dish index in the array
      for (let i = 0; i < state.cartItems.length; i++) {
        if (action.payload.name === state.cartItems[i].name) {
          exists = true;
          index = i;
        }
      }
      // If there is an index value, increase the qty property of the dish object
      // If the new dish doesn't exist, push the new dish object into the array
      if (exists) {
        state.cartItems[index].qty = state.cartItems[index].qty + 1;
      } else {
        state.cartItems.push(action.payload);
      }
      // If it is the first item adding to the cart
      if (state.cartItems.length === 0) {
        state.cartItems.push(action.payload);
      }

      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
      localStorage.setItem('itemCount', JSON.stringify(state.itemCount));
    },
    removeItem: (state, action) => {
      // state.itemCount = state.itemCount - 1;
      // state.cartItems.filter((i) => i.id !== action.payload.id);
    },
    resetItems: (state) => {
      // state.itemCount = 0;
      // state.cartItems = [];
    },
  },
});

export const { addItem, removeItem, resetItems } = cartSlice.actions;
export default cartSlice.reducer;
