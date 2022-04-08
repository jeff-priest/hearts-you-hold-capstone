import React from "react"
import { Link } from "react-router-dom";
import ShoppingCart from "./ShoppingCart.js";
import "./styles/home.css"

export default function Home (props) {

    let isFunded = props.isFunded;

    let totalFunded = isFunded.length

    return (
        <>
        <div className="heroContainer">
        <h1 className="heroHeader">Requests:<br></br>Organizations & Individual</h1>
        <p className="heroText">Would you like to fund a request in someone's name as a gift? No problem, just let us know the name and email of the person as well as a little note from you and we will send a nice email to them! Leave this info in the comment box when you check out!</p>
        </div>
        { /* Link to funded requests */}
        {/* sort by oldest/newest, state, category */}

        <section className="totalFunded">
        {`${totalFunded} Requests `} 
        <Link className="fundedLink" to="/Funded">Funded!</Link>
        </section>

        <ul>
        {props.donationItemsCardList}
        </ul>

        <ShoppingCart
        notFunded={props.notFunded}
        setNotFunded={props.setNotFunded}
        />
        </>
    )
}
