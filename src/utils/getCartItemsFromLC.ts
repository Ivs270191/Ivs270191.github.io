import React from "react";
import calcTotalCarcLC from "./calcTotalCarcLC";
import { CartItemType } from "../redux/slices/cartSlice";

const getCartItemsFromLC = () => {
  const data = localStorage.getItem("cart");
  const cartItems = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalCarcLC(cartItems);

  return {
    cartItems,
    totalPrice,
  };
};

export default getCartItemsFromLC;
