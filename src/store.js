// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './CartSlice';

// Create a Redux store using Redux Toolkit's configureStore
const store = configureStore({
  reducer: {
    cart: cartReducer, // 'cart' slice is managed by cartReducer
  },
});

export default store; // Export the store to use in your App
