import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // Add an item to cart
    addItem: (state, action) => {
      const newItem = action.payload; // { name, image, description, cost }
      const existingItem = state.items.find(item => item.name === newItem.name);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if already in cart
      } else {
        state.items.push({ ...newItem, quantity: 1 }); // Add with quantity 1
      }
    },

    // Remove an item completely
    removeItem: (state, action) => {
      const itemName = action.payload.name || action.payload; // support full item or name
      state.items = state.items.filter(item => item.name !== itemName);
    },

    // Update quantity of an item
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
  },
});

// Export action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer
export default CartSlice.reducer;
