import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./styles/paypal.css";

export default function PayPal({
  notFunded,
  setSuccessfulPayment,
  setShowShoppingCartButton,
  totalDonation,
  formData
}) {
  const amount = totalDonation;

  const [successMessage, setSuccessMessage] = useState("");
  const [payPalDisplayError, setPayPalDisplayError] = useState(false);

  async function postData() {
    setPayPalDisplayError(false);
    console.log("it worked");

    let purchasedItems = notFunded.filter((item) => {
      return item.inShoppingCart === true;
    });

    purchasedItems = purchasedItems.map((purchasedItem) => {
      return {
        ...purchasedItem,
        inShoppingCart: false,
        isFunded: true,
      };
    });

    let response = await fetch(`http://localhost:8003/donation-cart`, {
      method: "POST",
      body: JSON.stringify([purchasedItems, formData, amount]),
      headers: { "Content-Type": "application/json" },
    });
    response = await response.json();

    setSuccessfulPayment(true);
    setShowShoppingCartButton(false);
  }

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        // combination of amount and currency
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccessMessage("Successful Purchase");
      postData();
    });
  };
  //capture errors if one occurs
  const onError = (data, actions) => {
    setPayPalDisplayError(true);
  };

  return (
    <>
      <h1>CHECK OUT</h1>

      {payPalDisplayError && (
        <>
          <p className="donationCard noListing">
            We're sorry. Something went wrong while processing your payment.
            Please try again!
          </p>
        </>
      )}

      <div className="checkoutPaypal">
        <div id="item-0">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AQJHk5efwAZ2kYrEqyKsolzaTwG3-SeSrujK207ZFhnMFQAekd_6lWW6KNGgpLEYU1dhQqYerRONEKRg",
            }}
          >
            <div>{successMessage}</div>
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="paypal"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
            ,
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="card"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
          </PayPalScriptProvider>
        </div>

        <div id="item-1">
          <h1>Checkout amount</h1>
          <h3>$ {amount}</h3>
        </div>
      </div>
    </>
  );
}
