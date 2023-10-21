import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [
    // {
    //   pizzaId: 12,
    //   name: "meditarranean",
    //   quantity: 2,
    //   unitPrice: 16,
    //   totalPrice: 32,
    // },
  ],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = newItem
      state.cart.push(action.payload);
    },
    editOrder: {
      prepare(cart, orderId, userDetail) {
        return { payload: { cart, orderId, userDetail } };
      },
      reducer(state, action) {
        state.cart = action.payload.cart;
        state.orderId = action.payload.orderId;
        state.userDetail = action.payload.userDetail;
      },
    },
    updateIngredients: {
      prepare(ingredients, pizzaId) {
        return { payload: { ingredients, pizzaId } };
      },
      reducer(state, action) {
        const { ingredients, pizzaId } = action.payload;
        state.cart.forEach((item) => {
          if (item.pizzaId === pizzaId) {
            item.ingredients = ingredients;
          }
        });
      },
    },

    deleteItem(state, action) {
      //payload = id
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});
export const {
  addItem,
  updateIngredients,
  editOrder,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);
export const getCart = (store) => store.cart.cart;
export const getUser = (store) => store.user.username;
export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
