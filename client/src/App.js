
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import PayPal from "./components/PayPal.js";
import Funded from "./components/Funded.js";
import Home from "./components/Home.js"

import "./normalizer.css"
import "./styles.css"

export default function App() {
  //state holding json isFunded = false list
  const [notFunded, setNotFunded] = useState([]);
  const [isFunded, setIsFunded] = useState([]);

  //fetching isFunded = false items from DB
  useEffect(() => {
    let isConnectedToServer = true;

    async function getData() {
      let response = await fetch(`http://localhost:8003/`);

      response = await response.json();

      let notFundedVariable = response[0]

      let fundedVariable = response[1]

      //mapping over response object to add inShoppingCart = false - key-value
      notFundedVariable = notFundedVariable.map((notFundedObject, index) => {
        return (notFundedVariable = {
          ...notFundedObject,
          inShoppingCart: false,
          readMoreOpen: false,
        });
      });
      //setting response to notFunded state
      setNotFunded(notFundedVariable);

      setIsFunded(fundedVariable)
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

  let viewedDescription = null

  function descriptionSlice(itemDescription) {

    //if the description is less than 20 characters, show the whole description
    if (itemDescription.length < 20) {
      viewedDescription = itemDescription;
      return viewedDescription;

      //if it is over 20
    } else {
      for (let i = 20; i <= itemDescription.length; i++) {
        let character = itemDescription.charAt(i);

        //for a description that is over 20 characters but doesn't have a space between 20 and its total length
        if (i === itemDescription.length) {
          viewedDescription = itemDescription;
          return viewedDescription;

          //when the loop finds the first space it slices the description
        } else if (character === " ") {
          viewedDescription = itemDescription.slice(0, i);
          return viewedDescription;

          //if it's not a space it adds one to it and runs again
        } else if (character !== " ") {
          i++;
        }
      }
    }
  }

  //mapping over array of notFunded items to create list items for each card instances
  const donationItemsCardList = notFunded.map((donationItemCard, index) => {
    //this variable is a placeholder idea for limiting the description size

    descriptionSlice(donationItemCard.donationDescription);

    //variable for if readMoreOpen = true
    let readLessDescription = (
      <>
        {donationItemCard.donationDescription}
        <button className="readMoreBtn"
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
      //if the description is over 20 characters show the read more button
      <>{viewedDescription.length > 20 ? 
        <>{viewedDescription}
        <button className="readMoreBtn"
          onClick={(event) => {
            openReadMore(event, donationItemCard._id);
          }}
        >
          Read More...
        </button></> : 
        //if the description is under 20 characters just show the description without a read more button
        <>{viewedDescription}</>}
      </>
    );

    //variable for button that renders when inShoppingCart is true
    let inCartButton = (
      <>
        <button
          className="addedToDonation"
          disabled={true}
          onClick={(event) => {
            addToCart(event, donationItemCard._id);
          }}
        >
          Added To Donation
        </button>
      </>
    );

    //variable for button that renders when inShoppingCart is false
    let notInCartButton = (
      <>
        <button
          className="addToDonation"
          disabled={false}
          onClick={(event) => {
            addToCart(event, donationItemCard._id);
          }}
        >
          Donate
        </button>
      </>
    );

    return (
      //creating unique key for each li
      <li key={`donationItemCard-${index}`}>
        <div className="donationCard">

          {/* contents for left side of item card*/}
          <section className="cardNameDescription">
            <h2 className="cardName">{donationItemCard.itemName}</h2>
            <div className="cardDescriptionText">{donationItemCard.readMoreOpen
              ? readLessDescription
              : readMoreDescription}</div>

          <div className="donateButtonContainer">
          {donationItemCard.inShoppingCart ? inCartButton : notInCartButton}
          </div>
          </section>


          {/* contents for right side of item card*/}
          <section className="cardPriceReceipientLocation">

            <div className="cardItemPriceContainer">
            <h2 className="cardItemPrice">{`$${donationItemCard.itemPrice}`}</h2>
            </div>

            <div className="cardRecipientContainer">    
            <h4 className="cardRecipientName">{donationItemCard.recipientName}</h4>
            <div className="cardLocation">{`${donationItemCard.recipientUSLocation} - ${donationItemCard.recipientHomeOrigin}`}</div>
            </div>
          </section>
        </div>
      </li>
    );
  });

  return (
    <>
      <div id="body">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                donationItemsCardList={donationItemsCardList}
                notFunded={notFunded}
                setNotFunded={setNotFunded}
                isFunded={isFunded}
              />
            }
          />
          <Route
            path="/Funded"
            element={
              <Funded
              isFunded={isFunded}
              donationItemsCardList={donationItemsCardList}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}
