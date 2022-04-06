//branches test 
// ryans branch 

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PayPal from "./components/PayPal.js";
import Home from "./components/Home.js"

export default function App() {

  //state holding json isFunded = false list
  const [notFunded, setNotFunded] = useState([]);

  //fetching isFunded = false items from DB
  useEffect(() => {
    let isConnectedToServer = true;

    async function getData() {
      let response = await fetch(`http://localhost:8003/`);

      response = await response.json();

      console.log(response);

      //setting response to notFunded state
      setNotFunded(response);
    }
    if (isConnectedToServer) {
      getData();
    }

    // cleanup function to stop getData from running more than needed
    return () => {
      isConnectedToServer = false;
    };
  }, []);

  console.log(notFunded);

  //mapping over array of notFunded items to create list items for each card instances
  const donationItemsCardList = notFunded?.map((donationItemCard, index) => {
    return (
      //creating unique key for each li
      <li key={`donationItemCard-${index}`}>
        <div className="listing">
          {/* contents for left side of item card*/}
          <section className="left">
            <h2>{donationItemCard.itemName}</h2>
            <p>{donationItemCard.donationDescription}</p>
            <button>Add to cart</button>
          </section>

          {/* contents for right side of item card*/}
          <section className="right">
            <p>{`$${donationItemCard.itemPrice}`}</p>
            <h4>{donationItemCard.recipientName}</h4>
            <div>{`${donationItemCard.recipientUSLocation} - ${donationItemCard.recipientHomeOrigin}`}</div>
          </section>
        </div>
      </li>
    );
  });

  console.log(donationItemsCardList);

  return (
    <>
      <PayPal />
      <div>
        <Routes>
          <Route path="/" element={<Home
           donationItemsCardList={donationItemsCardList}
           />} />
        </Routes>
      </div>
    </>
  );
}
