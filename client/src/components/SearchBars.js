import React, { useState, useEffect } from "react";
import "./styles/searchBars.css";

export default function Funded(props) {
  let itemCategoriesList = props.itemCategoriesList;
  let setItemCategory = props.setItemCategory;
  let notFunded = props.notFunded;
  let pageNumber = props.pageNumber;
  let setPageNumber = props.setPageNumber;
  let recipientStatesList = props.recipientStatesList
  let setItemRecipientsState = props.setItemRecipientsState

  let recipientStatesOptionList = [];


  recipientStatesOptionList = recipientStatesList.map((state, index) => {
    return (
      <option key={`optionCategory-${index}`} value={state}>
        {state}
      </option>
    );
  });

  let findStateValue = (event) => {
    let optionState = event.target.value;

    console.log(optionState);

    setItemRecipientsState(optionState);
    setPageNumber(0);
  };

  let itemCategoriesOptionList = [];

  let findCategoryValue = (event) => {
    let optionCategory = event.target.value;

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
        <div>
        <h1 className="categorySearchHeader">Sort By:</h1>
        </div>
        <div className="categorySearch">
          <label htmlFor="categorySelect">Items Category:</label>
          <select id="categorySelect" onChange={findCategoryValue}>
            <option value="" defaultValue hidden>Category</option>
            <option value="all"> All Categories </option>
            {itemCategoriesOptionList}
          </select>
        </div>

        <div className="categorySearch">
          <label htmlFor="categorySelect">Recipient's State :</label>
          <select id="categorySelect" onChange={findStateValue}>
            <option value="" defaultValue hidden>State</option>
            <option value="all"> All States </option>
            {recipientStatesOptionList}
          </select>
        </div>



      </div>
    </>
  );
}
