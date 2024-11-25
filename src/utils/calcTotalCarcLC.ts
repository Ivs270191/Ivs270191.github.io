import React from "react";
import { CartItemType } from "../redux/slices/cartSlice";

const calcTotalCarcLC = (cartItems: CartItemType[]) => {
  return cartItems.reduce((sum, obj) => obj.price * obj.count + sum, 0);
};

export default calcTotalCarcLC;
