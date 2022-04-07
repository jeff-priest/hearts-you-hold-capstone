import React from "react"
import PayPal from './PayPal.js'

export default function ShoppingCart(props) {


    let shoppingCartItem = props.shoppingCartItem;


    let shoppingCart = shoppingCartItem.map((item, index) => {

        return (
        <li key={`shoppingCartItem-${index}`}>
             <h2>{item.itemName}</h2>
             <p>{`$${item.itemPrice}`}</p>
        </li>
        )

    });

   console.log(shoppingCart[0]?.itemName);

    return (<>
    {shoppingCart}
    <PayPal />
    </>)

}