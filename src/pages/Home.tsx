import React from "react";
import { useEffect, useState } from "react";
import qs from "qs";

// import Categories from "../components/Categories";
// import PizzaBlock from "../components/PizzaBlock";
// import Sort from "../components/Sort";
// import Skeleton from "../components/Sekeleton";
import { Categories, PizzaBlock, Sort, Skeleton } from "../components"; // пример ре-експорта

// import Pagination from "../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSelectedCategory, setSelectedType } from "../redux/slices/filters";
import { fetchPizzas } from "../redux/slices/pizzaSlice";
import { RootState, useAppDispatch } from "../redux/store";

const Home = () => {
  //   const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const [ascDesc, setAscDesc] = useState(false);
  //   const [currentPage , setCurrentPage] = useState(1) //для синхронизации пагинации с мокАпи

  const { selectedCategory, selectedType } = useSelector(
    (state: RootState) => state.filterSlice
  );
  const { items, status } = useSelector((state: RootState) => state.pizzaSlice);

  const { searchInput } = useSelector((state: RootState) => state.filterSlice);

  const navigate = useNavigate();

  const getPizzas = async () => {
    dispatch(
      fetchPizzas(
        `items?title=${searchInput}&category=${
          selectedCategory > 0 ? selectedCategory : ""
        }&sortBy=${selectedType}&order=${ascDesc ? "desc" : "asc"}`
      )
    );

    // // setTimeout(() => {
    // //   setIsLoading(false);
    // //   dispatch(setItems(res));
    // // }, 500); // чисто для наглядности скелета
    // window.scrollTo(0, 0); // для дефолтной позиции скрола после рендера
  };
  //   const pizzas = items
  //     .filter((item) => {
  //       if (item.title.toLowerCase().includes(searchInput.toLowerCase())) {
  //         return true;
  //       } // проверка на поиск инпута
  //       return false;
  //     })
  //     .map((obj) => <PizzaBlock key={obj.id} {...obj} />); // рендер отфильтрованого массива

  const skeletons = [...new Array(8)].map((_, i) => (
    <Skeleton key={`${i} + skeleton`} />
  ));

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setSelectedCategory(Number(params.selectedCategory)));
      dispatch(setSelectedType(String(params.selectedType)));
    }
  }, []); // для принимания параметров с юрл , если вставить в строку скопированый юрл
  useEffect(() => {
    if (selectedCategory === 0) {
      navigate("/"); // мейн страница скидывает путь на основной
    }
    if (selectedCategory > 0) {
      const queryString = qs.stringify({
        selectedCategory,
        selectedType,
      });
      navigate(`?${queryString}`); // прикручивает в юрл текущий адрес-ссылку
    }
  }, [selectedCategory, selectedType]);

  useEffect(() => {
    getPizzas();
  }, [selectedCategory, selectedType, ascDesc, searchInput]);
  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort setAscDesc={setAscDesc} ascDesc={ascDesc} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "error" ? (
          <div className="content__error-info">
            <h2>
              Что то пошло не так <span>😕</span>
            </h2>
            <p>По вашему запросу ничего не найдено</p>
          </div>
        ) : status === "loading" ? (
          skeletons
        ) : items.length > 0 ? (
          items.map((obj) => <PizzaBlock key={obj.id + obj.types} {...obj} />)
        ) : (
          []
        )}
      </div>
      {/* <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} /> */}
    </>
  );
};

export default Home;
