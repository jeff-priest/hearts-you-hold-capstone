import React from "react";
import PayPal from "./PayPal.js";
import Mail from "./Mail.js";
import "./styles/shoppingCart.css"


export default function ShoppingCart(props) {

  let notFunded = props.notFunded;

  let setNotFunded = props.setNotFunded;

  //changing inShoppingCart value to true
  let shoppingCartItem = notFunded.filter((item) => {
    return item.inShoppingCart === true;
  });

  //making an array of the itemPrices in the shopping cart
  let totalDonationArray = shoppingCartItem.map((item) => {
    return item.itemPrice
  });

  //totaling the donation prices
  let donationTotal = 0;

  for (let i  = 0; i < totalDonationArray.length; i++){
     donationTotal  += totalDonationArray[i];
  }


  function removeFromCart(event, id) {
    let removedItem = notFunded.map((item) => {
      if (item._id === id) {
        return { ...item, inShoppingCart: false };
      } else {
        return item;
      }
    });
    setNotFunded(removedItem);
  }

  let shoppingCart = shoppingCartItem.map((item, index) => {
    return (
      <li className="shoppingCartItem"
      key={`shoppingCartItem-${index}`}>

        <div className="namePriceContainer">
          <h2 className="itemName">{`${item.itemName}:`}</h2>
          <h2 className="itemPrice">{`$${item.itemPrice}`}</h2>
        </div>
        <button className="shoppingCartButton"
          onClick={(event) => {
            removeFromCart(event, item._id);
          }}
        >
          Remove from Donation
        </button>
      </li>
    );
  });

  return (
    <>
      <div className="shoppingCart">
        <div className="shoppingCartLeft">
          <h1 className="shoppingCartHeader">Your Donation</h1>
          <ul>  
            {shoppingCart}
          </ul>
        </div>
        <div className="donationTotal">
          {`Donation Total: $ ${donationTotal}`}
        </div>
        </div>
      <PayPal />
      <Mail />
    </>
  );
}
