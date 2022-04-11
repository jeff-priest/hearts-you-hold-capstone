import React, { useState } from "react";
import "./styles/shoppingCart.css"


export default function Percentages(props) {

    return (<>

        <div className="radioContainer">
            <input className="radioInput" type="radio" value="zero" name="male"/>0%
            <input className="radioInput" type="radio" value="five" name="male"/>5%
            <input className="radioInput" type="radio" value="ten" name="male"/>10%
            <input className="radioInput" type="radio" value="fifteen" name="male"/>15%
            <input className="radioInput" type="radio" value="twenty" name="male"/>20%
            <input className="radioInput" type="radio" value="twenty-five" name="male"/>25%
        </div>




    </>)
}