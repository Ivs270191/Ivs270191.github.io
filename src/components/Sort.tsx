import React, { memo, useEffect, useRef, useState } from "react";
import { GrDescend, GrAscend } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { setSelectedType } from "../redux/slices/filters";

type ListType = { name: string; prop: string };
type SortProps = {
  ascDesc: boolean;
  setAscDesc: React.Dispatch<React.SetStateAction<boolean>>;
};

const Sort = memo((props: SortProps) => {
  const [visible, setVisible] = useState(false);
  const list: ListType[] = [
    { name: "популярности", prop: "rating" },
    { name: "цене", prop: "price" },
    { name: "алфавиту", prop: "title" },
  ];
  const [selected, setSelected] = useState(0);
  const sortRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const onSelected = (obj: ListType, i: number) => {
    setSelected(i);
    setVisible(!visible);
    dispatch(setSelectedType(obj.prop));
  };
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      //if (e.target instanceof HTMLDivElement)
      if (!sortRef.current?.contains(e.target as HTMLDivElement)) {
        setVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []); //функционал для скрытия поп-ап при клике вне дива

  return (
    <>
      <div ref={sortRef} className="sort">
        <div className="sort__label">
          {props.ascDesc ? (
            <GrDescend
              className="sort__adc"
              onClick={() => props.setAscDesc(!props.ascDesc)}
            />
          ) : (
            <GrAscend
              className="sort__adc"
              onClick={() => props.setAscDesc(!props.ascDesc)}
            />
          )}
          <b>Сортировка по:</b>
          <span onClick={() => setVisible(!visible)}>
            {list[selected].name}
          </span>
        </div>
        {visible && (
          <div className="sort__popup">
            <ul>
              {list.map((obj, i) => (
                <li
                  key={i}
                  onClick={() => onSelected(obj, i)}
                  className={selected === i ? "active" : ""}
                >
                  {obj.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
});

export default Sort;
