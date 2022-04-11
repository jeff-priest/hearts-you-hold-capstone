import React, { useState } from "react";
import { HashLink as Link } from "react-router-hash-link";
import ShoppingCart from "./ShoppingCart.js";
import NotFundedPagination from "./NotFundedPagination.js";
import ScrollToTop from "./ScrollToTop.js";
import "./styles/home.css";
import Hearts from "./assets/hearts.png";

export default function Home(props) {
  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);
  const [showShoppingCartButton, setShowShoppingCartButton] = useState(false);

  let isFunded = props.isFunded;

  let totalFunded = isFunded.length;

  let notFunded = props.notFunded;

  let openShoppingCart = () => {
    setShoppingCartIsOpen(true);
  };

  return (
    <>
    <ScrollToTop/>

      <div className="heroContainer">
        <h1 className="heroHeader">
          Requests:<br></br>Organizations & Individual
        </h1>
        <p className="heroText">
          Would you like to fund a request in someone's name as a gift? No
          problem, just let us know the name and email of the person as well as
          a little note from you and we will send a nice email to them! Leave
          this info in the comment box when you check out!
        </p>


      <section className="totalFunded">
        <div>
          {`${totalFunded} Requests `}
          <Link className="fundedLink" to="/Funded">
            Funded!
          </Link>
        </div>
      </section>
      </div>

    <section>
      
      { showShoppingCartButton && <div id="shoppingCartButtonContainer">
        <img id="heartsLogo" src={Hearts} />

        <Link id="shoppingCartButton" to="#donation-cart">
          <button className="goToShoppingCart" onClick={openShoppingCart}>
            Go To Cart
          </button>
        </Link>
      </div>}

      <NotFundedPagination
        notFunded={props.notFunded}
        setNotFunded={props.setNotFunded}
        setShowShoppingCartButton={setShowShoppingCartButton}
      />
    </section>
      {shoppingCartIsOpen && (
        <ShoppingCart
          notFunded={props.notFunded}
          setNotFunded={props.setNotFunded}
          setShowShoppingCartButton={setShowShoppingCartButton}
          setShoppingCartIsOpen={setShoppingCartIsOpen}
        />
      )}
    </>
  );
}
