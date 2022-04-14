import React, { useState, useEffect } from "react";
import "./styles/shoppingCart.css";

export default function Percentages(props) {
  let notFunded = props.notFunded;
  let setTotalDonation = props.setTotalDonation;

  //finding all the in cart items
  let shoppingCartItem = notFunded.filter((item) => {
    return item.inShoppingCart === true;
  });

  //making an array of the itemPrices in the shopping cart
  let totalDonationArray = shoppingCartItem.map((item) => {
    return item.itemPrice;
  });

  let donationTotalValue = totalDonationArray.reduce(
    (previousValue, currentValue) => {
      return previousValue + currentValue;
    }
  );

  let percentageCalculator = (event) => {
    let percentage = event.target.value;

    switch (percentage) {
      case "zero":
        setTotalDonation(donationTotalValue);
        break;

      case "five":
        donationTotalValue = donationTotalValue * 0.05 + donationTotalValue;

        donationTotalValue = Math.ceil(donationTotalValue);

        setTotalDonation(donationTotalValue);

        break;

      case "ten":
        donationTotalValue = donationTotalValue * 0.1 + donationTotalValue;

        donationTotalValue = Math.ceil(donationTotalValue);

        setTotalDonation(donationTotalValue);

        break;

      case "fifteen":
        donationTotalValue = donationTotalValue * 0.15 + donationTotalValue;

        donationTotalValue = Math.ceil(donationTotalValue);

        setTotalDonation(donationTotalValue);

        break;

      case "twenty":
        donationTotalValue = donationTotalValue * 0.2 + donationTotalValue;

        donationTotalValue = Math.ceil(donationTotalValue);

        setTotalDonation(donationTotalValue);

        break;

      case "twenty-five":
        donationTotalValue = donationTotalValue * 0.25 + donationTotalValue;

        donationTotalValue = Math.ceil(donationTotalValue);

        setTotalDonation(donationTotalValue);

        break;
    }
  };

  return (
    <>
      <div className="radioContainer">
        <div className="radioLow">
          <input
            className="radioInput"
            type="radio"
            value="zero"
            onClick={percentageCalculator}
            name="percentage"
          />
          0%
          <input
            className="radioInput"
            type="radio"
            value="five"
            onClick={percentageCalculator}
            name="percentage"
          />
          5%
          <input
            className="radioInput"
            type="radio"
            value="ten"
            onClick={percentageCalculator}
            name="percentage"
          />
          10%
        </div>
        <div className="radioHigh">
          <input
            className="radioInput"
            type="radio"
            value="fifteen"
            onClick={percentageCalculator}
            name="percentage"
          />
          15%
          <input
            className="radioInput"
            type="radio"
            value="twenty"
            onClick={percentageCalculator}
            name="percentage"
          />
          20%
          <input
            className="radioInput"
            type="radio"
            value="twenty-five"
            onClick={percentageCalculator}
            name="percentage"
          />
          25%
        </div>
      </div>
    </>
  );
}
