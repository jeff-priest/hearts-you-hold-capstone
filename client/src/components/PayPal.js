import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./styles/paypal.css";

export default function PayPal({
  notFunded,
  setSuccessfulPayment,
  setShowShoppingCartButton,
  totalDonation,
  formData,
  setPayPalOpen,
}) {
  const amount = totalDonation;

  const [successMessage, setSuccessMessage] = useState(false);
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
      setSuccessMessage(true);
      postData();

      setTimeout(() => {
        setSuccessfulPayment(true);
        setPayPalOpen(false);
      return <>{window.scrollTo(0, 0)}</>;
      }, 4000);
    });
  };
  //capture errors if one occurs
  const onError = (data, actions) => {
    setPayPalDisplayError(true);
  };

  let checkout = (
    <>
      <div className="checkoutContainer">
        <h1 className="checkoutHeader">Check Out</h1>
        <div className="checkoutTotalContainer">
          <h1 className="checkoutTotal">{`Donation Total: $${amount}`}</h1>
        </div>
        <div className="paypalButtonsContainer">
          <PayPalScriptProvider
            options={{
              "client-id":
                "AQJHk5efwAZ2kYrEqyKsolzaTwG3-SeSrujK207ZFhnMFQAekd_6lWW6KNGgpLEYU1dhQqYerRONEKRg",
            }}
          >
            <div className="payPalButton">
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="paypal"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
            </div>
            <div className="payPalButton">
            <PayPalButtons
              style={{ layout: "vertical" }}
              fundingSource="card"
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            />
            </div>
          </PayPalScriptProvider>
        </div>
      </div>
    </>
  );

  let complete = (
    <>
      <div className="donationCard noListing textCenter">
        <h1 className="checkoutTotal">Thank you for your donation!</h1>
      </div>
    </>
  );

  return (
    <>
      <div className="checkout">
        {payPalDisplayError && (
          <>
            <p className="donationCard noListing textCenter">
              We're sorry.
              <br />
              Something went wrong while processing your payment.
              <br />
              Please try again!
            </p>
          </>
        )}

        {successMessage ? complete : checkout}
      </div>
    </>
  );
}
