import React, { useCallback, useContext, useRef, useState } from "react";
import styles from "./Search.module.scss";
import { GrSearch } from "react-icons/gr";
import { RxCross1 } from "react-icons/rx";

import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../../redux/slices/filters";
import debounce from "lodash.debounce";

type inputChangeType = React.ChangeEvent<HTMLInputElement>

const Search = () => {
  const [localInput, setLocalInput] = useState("");

  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounced = useCallback(
    debounce((str:string) => dispatch(setSearchInput(str)), 300),
    []
  );
  const inputClear = () => {
    dispatch(setSearchInput(""));
    setLocalInput("");
    inputRef.current?.focus();
  };
  const inputHandleChange = (e: inputChangeType) => {
    setLocalInput(e.target.value);
    debounced(e.target.value);
  };

  return (
    <div className={styles.main}>
      <GrSearch className={styles.search} />
      <input
        ref={inputRef}
        value={localInput}
        onChange={(e) => inputHandleChange(e)}
        className={styles.input}
        placeholder="Поиск ..."
      />
      {localInput && <RxCross1 className={styles.cross} onClick={inputClear} />}
    </div>
  );
};

export default Search;
