// testing branches
import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import "./styles/api.css";

export default function PayPal(props) {
  const amount = props.totalDonation;

  const [show, setShow] = useState(true);
  const [success, setSuccess] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [orderID, setOrderID] = useState(false);

  let notFunded = props.notFunded;

  let setNotFunded = props.setNotFunded;

  let isFunded = props.isFunded;

  let setIsFunded = props.setIsFunded;

  let setSuccessfulPayment = props.setSuccessfulPayment

  let setShowShoppingCartButton = props.setShowShoppingCartButton


  //UseEffect to update database - this will need to go in the paypal handler function
  // useEffect(() => {
  //   async function postData() {
  //     let purchasedItems = notFunded.filter((item) => {
  //       return item.inShoppingCart === true;
  //     });

  //     console.log(purchasedItems);

  //     purchasedItems = purchasedItems.map((purchasedItem) => {
  //       return {
  //         ...purchasedItem,
  //         inShoppingCart: false,
  //         isFunded: true,
  //       };
  //     });

  //     console.log(purchasedItems);

  //     let response = await fetch(`http://localhost:8003/donation-cart`, {
  //       method: "POST",
  //       body: JSON.stringify(purchasedItems),
  //       headers: { "Content-Type": "application/json" },
  //     });
  //     response = await response.json();

  //     // setSuccessfulPayment(true)
  //     // setShowShoppingCartButton(false)
  //   }

  //   postData();
  // }, [notFunded]);



  // creates a paypal order
  const createOrder = (data, actions) => {
    console.log(typeof amount, amount);
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
        setOrderID(orderID);
        return orderID;
      });
  };

  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      setSuccess(true);
      setSuccessMessage("Successful Purchase");
    });
  };
  //capture errors if one occurs
  const onError = (data, actions) => {
    setErrorMessage("An Error occured with your payment");
  };

  return (
    <PayPalScriptProvider
      options={{
        "client-id":
          "AQJHk5efwAZ2kYrEqyKsolzaTwG3-SeSrujK207ZFhnMFQAekd_6lWW6KNGgpLEYU1dhQqYerRONEKRg",
      }}
    >
      <div className="wrapper">{successMessage}</div>
      <PayPalButtons
        style={{ layout: "horizontal" }}
        fundingSource="paypal"
        createOrder={createOrder}
        onApprove={onApprove}
      />
      ,
      <PayPalButtons
        style={{ layout: "horizontal" }}
        fundingSource="card"
        createOrder={createOrder}
        onApprove={onApprove}
      />
      ,
    </PayPalScriptProvider>
  );
}
