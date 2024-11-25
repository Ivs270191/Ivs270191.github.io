import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getCartItemsFromLC from "../../utils/getCartItemsFromLC";

export type CartItemType = {
  id: string;
  imageUrl: string;
  title: string;
  types: string;
  sizes: number;
  price: number;
  count: number | 0;
};

interface CartSliceStateType {
  cartItems: CartItemType[];
  totalPrice: number;
}

const { cartItems, totalPrice } = getCartItemsFromLC();
const initialState: CartSliceStateType = {
  cartItems,
  totalPrice,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartItems(state, action: PayloadAction<CartItemType>) {
      const findItem = state.cartItems.find(
        (e) => e.id === action.payload.id && e.types === action.payload.types
      );
      if (findItem) {
        findItem.count++;
      } else {
        state.cartItems.push({ ...action.payload, count: 1 });
      }
      // state.cartItems.push(action.payload);
      state.totalPrice = state.cartItems.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    minusItems(state, action: PayloadAction<CartItemType>) {
      const findItem = state.cartItems.find(
        (e) => e.id === action.payload.id && e.types === action.payload.types
      );
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.cartItems.reduce(
          (sum, obj) => obj.price * obj.count + sum,
          0
        );
      }
    },
    removeCartItems(state, action: PayloadAction<CartItemType>) {
      // console.log(action.payload)
      state.cartItems = state.cartItems.filter(
        (e) => e.id !== action.payload.id || e.types !== action.payload.types
      );
      state.totalPrice = state.cartItems.reduce(
        (sum, obj) => obj.price * obj.count + sum,
        0
      );
    },
    clearCartItems(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addCartItems, removeCartItems, clearCartItems, minusItems } =
  cartSlice.actions;

export default cartSlice.reducer;
