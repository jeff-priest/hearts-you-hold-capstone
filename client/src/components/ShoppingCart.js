import React, { useState, useEffect } from "react";
import PayPal from "./PayPal.js";
import Mail from "./Mail.js";
import Percentage from "./Percentage.js";
import "./styles/shoppingCart.css";

export default function ShoppingCart(props) {
  const [isChecked, setIsChecked] = useState(false);

  let payPalOpen = props.payPalOpen

  let setPayPalOpen = props.setPayPalOpen

  let totalDonation = props.totalDonation

  let setTotalDonation = props.setTotalDonation

  let notFunded = props.notFunded;

  let setNotFunded = props.setNotFunded;

  let setShowShoppingCartButton = props.setShowShoppingCartButton;

  let setShoppingCartIsOpen = props.setShoppingCartIsOpen;

  //changing inShoppingCart value to true
  let shoppingCartItem = notFunded.filter((item) => {
    return item.inShoppingCart === true;
  });

  //making an array of the itemPrices in the shopping cart
  let totalDonationArray = shoppingCartItem.map((item) => {
    return item.itemPricePlusFifteen;
  });

  //if there is nothing in the shopping cart it will not display the cart or the go to cart button anymore
  if (totalDonationArray.length === 0) {
    setShowShoppingCartButton(false);
    setShoppingCartIsOpen(false);
  }

  //totaling the donation prices and and setting it to totalDonation state
  useEffect(() => {
    function addDonations() {
      let donationTotal = 0;

      for (let i = 0; i < totalDonationArray.length; i++) {
        donationTotal = donationTotal + totalDonationArray[i];

        if (i === totalDonationArray.length - 1) {
          setTotalDonation(donationTotal);
        }
      }
    }

    addDonations();
  }, [notFunded]);

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
      <li className="shoppingCartItem" key={`shoppingCartItem-${index}`}>
        <div className="namePriceContainer">
          <h2 className="itemName">{`${item.itemName}:`}</h2>
          <h2 className="itemPrice">{`$${item.itemPricePlusFifteen}`}</h2>
        </div>
        <button
          className="shoppingCartButton"
          onClick={(event) => {
            removeFromCart(event, item._id);
          }}
        >
          Remove from Donation
        </button>
      </li>
    );
  });

  //forcing donation percentage form to close when items are added or removed from cart
  useEffect(() => {
    setIsChecked(false);
  }, [notFunded])

  let checkedBox = () => {
    if (isChecked) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
    }
  };

  let payPal = () => {

    setPayPalOpen(true)
    setShoppingCartIsOpen(false)

    console.log("paypal test");
  };

  return (
    <>
      <div id="donation-cart">
        <div className="shoppingCartLeft">
          <h1 className="shoppingCartHeader">Your Donation</h1>
          <ul>{shoppingCart}</ul>
        </div>
        <div className="donationTotal">
          {`Donation Total: $ ${totalDonation}`}
        </div>

        <section className="percentageContainer">
          <h3 className="percentageHeader">Support Hearts You Hold</h3>
          <div id="checkLabel">
            <label htmlFor="checkInput">
              <input
                id="checkInput"
                type="checkbox"
                checked={isChecked}
                onChange={checkedBox}
              />
              I would like to adjust the amount.
            </label>
          </div>
          <p className="percentageHeader">
            This donation includes an optional 15% donation to support Hearts
            You Hold.
          </p>
          {isChecked && (
            <Percentage
              totalDonation={totalDonation}
              setTotalDonation={setTotalDonation}
              notFunded={notFunded}
            />
          )}
        </section>
      </div>

      <button onClick={payPal}>
        Submit
      </button>



      <center><div id="api">
        {/* <PayPal totalDonation={totalDonation} /> */}
        {/* {payPal} */}
        <Mail />
      </div></center>
    </>
  );
}
