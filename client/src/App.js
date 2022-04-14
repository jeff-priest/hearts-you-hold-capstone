import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Funded from "./components/Funded.js";
import Home from "./components/Home.js";

import "./normalizer.css";
import "./Styles.css";

export default function App() {
  //state holding json isFunded = false list
  const [notFunded, setNotFunded] = useState([]);
  const [isFunded, setIsFunded] = useState([]);
  const [itemCategoriesList, setItemCategoriesList] = useState([]);

  //fetching isFunded = false items from DB
  useEffect(() => {
    let isConnectedToServer = true;

    async function getData() {
      let response = await fetch(`http://localhost:8003/`);

      response = await response.json();

      setItemCategoriesList(response[1]);

      response = response[0];

      let notFundedVariable = response[0];

      let fundedVariable = response[1];

      //mapping over response object to add inShoppingCart = false - key-value
      notFundedVariable = notFundedVariable.map((notFundedObject, index) => {
        //adds 15% to item price and rounds up to next dollar
        let donationItemPrice = notFundedObject.itemPrice;

        donationItemPrice = donationItemPrice * 0.15 + donationItemPrice;

        donationItemPrice = Math.ceil(donationItemPrice);

        return {
          ...notFundedObject,
          inShoppingCart: false,
          readMoreOpen: false,
          itemPricePlusFifteen: donationItemPrice,
        };
      });

      setNotFunded(notFundedVariable);

      setIsFunded(fundedVariable);
    }

    if (isConnectedToServer) {
      getData();
    }

    // cleanup function to stop getData from running more than needed
    return () => {
      isConnectedToServer = false;
    };
  }, []);

  return (
    <>
      <div id="body">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                notFunded={notFunded}
                setNotFunded={setNotFunded}
                isFunded={isFunded}
                setIsFunded={setIsFunded}
                itemCategoriesList={itemCategoriesList}
              />
            }
          />
          <Route
            path="/Funded"
            element={
              <Funded
                notFunded={notFunded}
                isFunded={isFunded}
                setIsFunded={setIsFunded}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}
