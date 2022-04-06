import React from "react"

export default function ShoppingCart(props) {


    let shoppingCartItem = props.shoppingCartItem;

    return (<>
    <h1>{shoppingCartItem[0]?.itemName}</h1>
    </>)

}