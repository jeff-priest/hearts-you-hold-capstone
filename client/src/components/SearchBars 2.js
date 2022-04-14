import React, { useState, useEffect } from "react";
import "./styles/searchBars.css";

export default function Funded(props) {
  let itemCategoriesList = props.itemCategoriesList;
  let setItemCategory = props.setItemCategory;
  let notFunded = props.notFunded;
  let pageNumber = props.pageNumber;
  let setPageNumber = props.setPageNumber;

  let itemCategoriesOptionList = [];

  let findFilterValue = (event) => {
    let optionCategory = event.target.value;

    console.log(optionCategory);

    setItemCategory(optionCategory);
    setPageNumber(0);
  };

  itemCategoriesOptionList = itemCategoriesList.map((category, index) => {
    return (
      <option key={`optionCategory-${index}`} value={category}>
        {category}
      </option>
    );
  });

  return (
    <>
      <div className="searchSectionContainer">
        <div className="categorySearch">
          <label htmlFor="categorySelect">Search By Item Category:</label>
          <select id="categorySelect" onChange={findFilterValue}>
            <option value="" hidden selected>
              Category
            </option>
            <option value=""> All Categories </option>
            {itemCategoriesOptionList}
          </select>
        </div>
      </div>
    </>
  );
}
