import React from "react";
import PayPal from "./PayPal.js";

export default function ShoppingCart(props) {

  let notFunded = props.notFunded;

  let setNotFunded = props.setNotFunded;

  let shoppingCartItem = notFunded.filter((item) => {
    return item.inShoppingCart === true;
  });

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
      <li key={`shoppingCartItem-${index}`}>
        <h2>{item.itemName}</h2>
        <p>{`$${item.itemPrice}`}</p>
        <button
          onClick={(event) => {
            removeFromCart(event, item._id);
          }}
        >
          Remove from Cart
        </button>
      </li>
    );
  });

  return (
    <>
      {shoppingCart}
      <PayPal />
    </>
  );
}
