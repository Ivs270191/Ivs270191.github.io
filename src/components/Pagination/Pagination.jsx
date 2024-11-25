import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";

const Pagination = (props) => {
  return (
    <>
      <div className={styles.main}>
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => props.setCurrentPage(e.selected + 1)}
          pageRangeDisplayed={5}
          pageCount={3}
          previousLabel="<"
          renderOnZeroPageCount={null}
          activeLinkClassName={styles.active}
        />
      </div>
    </>
  );
};

export default Pagination;
