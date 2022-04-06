//branches test

import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PayPal from "./components/PayPal.js";
import Home from "./components/Home.js";

export default function App() {
  //state holding json isFunded = false list
  const [notFunded, setNotFunded] = useState([]);

  //fetching isFunded = false items from DB
  useEffect(() => {
    let isConnectedToServer = true;

    async function getData() {
      let response = await fetch(`http://localhost:8003/`);

      response = await response.json();

      //mapping over response object to add inShoppingCart = false - key-value
      response = response.map((responseObject, index) => {
        return (response = {
          ...responseObject,
          inShoppingCart: false,
          readMoreOpen: false,
        });
      });
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

  //function receives object id for each donationItemCard as parameter and maps over the notFunded state and finds the one that matches and changes its inShoppingCart value to true, function then resets notFunded state with new inShoppingCart values
  function addToCart(event, id) {
    let addedItem = notFunded.map((item) => {
      if (item._id === id) {
        return { ...item, inShoppingCart: true };
      } else {
        return item;
      }
    });
    setNotFunded(addedItem);
  }

  //openReadMore and closeReadMore uses the same logic as addToCart, these functions are toggling the readMoreOpen value between true and false and causing different descriptions to render accordingly
  function openReadMore(event, id) {
    let clickedItem = notFunded.map((item) => {
      if (item._id === id) {
        return { ...item, readMoreOpen: true };
      } else {
        return item;
      }
    });
    setNotFunded(clickedItem);
  }

  function closeReadMore(event, id) {
    let clickedItem = notFunded.map((item) => {
      if (item._id === id) {
        return { ...item, readMoreOpen: false };
      } else {
        return item;
      }
    });
    setNotFunded(clickedItem);
  }

  let shoppingCartItem = notFunded.filter((item) => {
    return item.inShoppingCart === true
  })

  console.log(shoppingCartItem);

  //mapping over array of notFunded items to create list items for each card instances
  const donationItemsCardList = notFunded.map((donationItemCard, index) => {
    //this variable is a placeholder idea for limiting the description size
    let viewedDescription = donationItemCard.donationDescription.slice(0, 15);

    //variable for if readMoreOpen = true
    let readLessDescription = (
      <>
        {donationItemCard.donationDescription}
        <button
          onClick={(event) => {
            closeReadMore(event, donationItemCard._id);
          }}
        >
          Read Less
        </button>
      </>
    );

    //variable for if readMoreOpen = false
    let readMoreDescription = (
      <>
        {viewedDescription}
        <button
          onClick={(event) => {
            openReadMore(event, donationItemCard._id);
          }}
        >
          Read More
        </button>
      </>
    );

    //variable for button that renders when inShoppingCart is true
    let inCartButton = (
      <>
        <button
          className="AddToCart"
          disabled={true}
          onClick={(event) => {
            addToCart(event, donationItemCard._id);
          }}
        >
          Added to cart
        </button>
      </>
    );

    //variable for button that renders when inShoppingCart is false
    let notInCartButton = (
      <>
        <button
          className="AddToCart"
          disabled={false}
          onClick={(event) => {
            addToCart(event, donationItemCard._id);
          }}
        >
          Add to cart
        </button>
      </>
    );

    return (
      //creating unique key for each li
      <li key={`donationItemCard-${index}`}>
        <div className="listing">
          {donationItemCard.inShoppingCart ? inCartButton : notInCartButton}

          {/* {addToCartClicked && cartButtons} */}

          {/* contents for left side of item card*/}
          <section className="left">
            <h2>{donationItemCard.itemName}</h2>
            {donationItemCard.readMoreOpen
              ? readLessDescription
              : readMoreDescription}
          </section>

          {/* contents for right side of item card*/}
          <section className="right">
            <p>{`${donationItemCard.itemPrice}`}</p>
            <h4>{donationItemCard.recipientName}</h4>
            <div>{`${donationItemCard.recipientUSLocation} - ${donationItemCard.recipientHomeOrigin}`}</div>
          </section>
        </div>
      </li>
    );

  });

  return (
    <>
      <PayPal />
      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                donationItemsCardList={donationItemsCardList}
                shoppingCartItem={shoppingCartItem}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}
