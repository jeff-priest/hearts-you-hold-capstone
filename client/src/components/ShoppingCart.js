import React, { useState } from "react";
import PayPal from "./PayPal.js";
import Mail from "./Mail.js";
import Percentage from "./Percentage.js";
import "./styles/shoppingCart.css"


export default function ShoppingCart(props) {

  const [isChecked, setIsChecked] = useState(false);

  let notFunded = props.notFunded;

  let setNotFunded = props.setNotFunded;

  let setShowShoppingCartButton = props.setShowShoppingCartButton

  let setShoppingCartIsOpen = props.setShoppingCartIsOpen

  //changing inShoppingCart value to true
  let shoppingCartItem = notFunded.filter((item) => {
    return item.inShoppingCart === true;
  });

  console.log(shoppingCartItem.length);

  //making an array of the itemPrices in the shopping cart
  let totalDonationArray = shoppingCartItem.map((item) => {
    return item.itemPrice
  });

  //if there is nothing in the shopping cart it will not display the cart or the go to cart button anymore
  if (totalDonationArray.length === 0) {
    setShowShoppingCartButton(false)
    setShoppingCartIsOpen(false)
  }

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

  let checkedBox = () => {

    if(isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true)
    }
  };

  return (
    <>
      <div id="donation-cart">
        <div className="shoppingCartLeft">
          <h1 className="shoppingCartHeader">Your Donation</h1>
          <ul>  
            {shoppingCart}
          </ul>
        </div>
        <div className="donationTotal">
          {`Donation Total: $ ${donationTotal}`}
        </div>

        <section className="percentageContainer">
        <h2>Support Hearts You Hold</h2>
        <div id="checkLabel">
        <label for="checkInput">
        <input id="checkInput" type="checkbox" name="test"
        onChange={checkedBox}/>
        I would like to adjust the amount.
        </label>
        </div>
        <p>This donation includes an optional 15% donation to support Hearts You Hold.</p>
        { isChecked && <Percentage/>}
        </section>

        </div>
      <PayPal />
      <Mail />
    </>
  );
}
