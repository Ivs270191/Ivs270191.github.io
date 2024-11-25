import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCartItems, CartItemType } from "../redux/slices/cartSlice";
import { NavLink } from "react-router-dom";
import { RootState } from "../redux/store";
import { PizzaItemType } from "../redux/slices/pizzaSlice";

const PizzaBlock = (props: PizzaItemType) => {
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const pizzaTypes = ["тонкое", "традиционное"];

  const dispatch = useDispatch();
  const findCartItem = useSelector(
    (state: RootState) => state.cartSlice.cartItems
  );
  const findCartItemSum = findCartItem
    .filter((e) => e.id === props.id)
    .reduce((sum, e) => e.count + sum, 0);

  const clickAddCartItem = () => {
    const itemCart: CartItemType = {
      id: props.id,
      imageUrl: props.imageUrl,
      title: props.title,
      types: pizzaTypes[activeType],
      sizes: props.sizes[activeSize],
      price: props.price,
      count: 0,
    };
    dispatch(addCartItems(itemCart));
  };

  return (
    <div className="pizza-block">
      <NavLink to={`/pizza/${props.id}`}>
        <img className="pizza-block__image" src={props.imageUrl} alt="Pizza" />
      </NavLink>
      <h4 className="pizza-block__title">{props.title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {props.types.map((types) => (
            <li
              key={types}
              onClick={() => setActiveType(types)}
              className={activeType === types ? "active" : ""}
            >
              {pizzaTypes[types]}
            </li>
          ))}
        </ul>
        <ul>
          {props.sizes.map((size, i) => (
            <li
              key={i}
              onClick={() => setActiveSize(i)}
              className={activeSize === i ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{props.price} грн</div>
        <div className="button button--outline button--add">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            ></path>
          </svg>
          <span onClick={clickAddCartItem}>Добавить</span>
          {findCartItemSum > 0 && <i>{findCartItemSum}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaBlock;
