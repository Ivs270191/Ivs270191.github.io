import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { fetchPizzas, PizzaItemType } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";

const ItemDescription = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getPizzas = async () => {
      dispatch(fetchPizzas(`items/${id}`));
    };
    getPizzas();
  }, []);
  const items = useSelector((state: any) => state.pizzaSlice.items);

  return (
    <>
      <div className="pizza-block">
        <img className="pizza-block__image" src={items.imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{items.title}</h4>
        <div className="pizza-block__selector"></div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">{items.price} грн</div>
        </div>
      </div>
    </>
  );
};

export default ItemDescription;
