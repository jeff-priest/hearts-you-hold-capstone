import React, { useState, useEffect } from "react";
import { HashLink as Link } from "react-router-hash-link";
import ShoppingCart from "./ShoppingCart.js";
import NotFundedPagination from "./NotFundedPagination.js";
import PayPal from "./PayPal.js";
import Mail from "./Mail.js";
import SearchBars from "./SearchBars.js";
import ScrollToTop from "./ScrollToTop.js";
import "./styles/home.css";
import Hearts from "./assets/hearts.png";

export default function Home(props) {
  const [shoppingCartIsOpen, setShoppingCartIsOpen] = useState(false);
  const [showShoppingCartButton, setShowShoppingCartButton] = useState(false);
  const [totalDonation, setTotalDonation] = useState(0);
  const [payPalOpen, setPayPalOpen] = useState(false);
  const [itemCategory, setItemCategory] = useState("all");
  const [itemRecipientsState, setItemRecipientsState] = useState("all")
  const [pageNumber, setPageNumber] = useState(0);

  let itemCategoriesList = props.itemCategoriesList;

  let isFunded = props.isFunded;

  let setIsFunded = props.setIsFunded;

  let totalFunded = isFunded.length;

  let notFunded = props.notFunded;

  let setNotFunded = props.setNotFunded;

  let recipientStatesList = props.recipientStatesList

  let setSuccessfulPayment = props.setSuccessfulPayment

  let openShoppingCart = () => {
    setShoppingCartIsOpen(true);
    setPayPalOpen(false);
  };

  useEffect(() => {
    let shoppingCartItem = notFunded.filter((item) => {
      return item.inShoppingCart === true;
    });

    if (shoppingCartItem[0]?.inShoppingCart === true) {
      setShowShoppingCartButton(true);
    } else return;
  }, []);

  useEffect(() => {
    setPayPalOpen(false);
  }, [notFunded]);

  return (
    <>
      <ScrollToTop />
      <div className="body">
        <div className="heroContainer">
          <h1 className="heroHeader">
            Requests:<br></br>Organizations & Individual
          </h1>
          <p className="heroText">
            Would you like to fund a request in someone's name as a gift? No
            problem, just let us know the name and email of the person as well
            as a little note from you and we will send a nice email to them!
            Leave this info in the comment box when you check out!
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
          {showShoppingCartButton && (
            <div id="shoppingCartButtonContainer">
              <img id="heartsLogo" src={Hearts} />

              <Link id="shoppingCartButton" to="#donation-cart">
                <button className="goToShoppingCart" onClick={openShoppingCart}>
                  Go To Cart
                </button>
              </Link>
            </div>
          )}

          <SearchBars
            itemCategoriesList={itemCategoriesList}
            setItemCategory={setItemCategory}
            notFunded={notFunded}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            recipientStatesList={recipientStatesList}
            setItemRecipientsState={setItemRecipientsState}
          />

          <NotFundedPagination
            notFunded={props.notFunded}
            setNotFunded={props.setNotFunded}
            setShowShoppingCartButton={setShowShoppingCartButton}
            itemCategory={itemCategory}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
            itemRecipientsState={itemRecipientsState}
          />
        </section>
        {shoppingCartIsOpen && (
          <ShoppingCart
            notFunded={props.notFunded}
            setNotFunded={props.setNotFunded}
            setShowShoppingCartButton={setShowShoppingCartButton}
            setShoppingCartIsOpen={setShoppingCartIsOpen}
            totalDonation={totalDonation}
            setTotalDonation={setTotalDonation}
            setPayPalOpen={setPayPalOpen}
          />
        )}

        {payPalOpen && (
          <>
            <div id="paypal">
              <PayPal
                totalDonation={totalDonation}
                notFunded={notFunded}
                setNotFunded={setNotFunded}
                setIsFunded={setIsFunded}
                isFunded={isFunded}
                setSuccessfulPayment={setSuccessfulPayment}
                setShowShoppingCartButton={setShowShoppingCartButton}
              />
              <center>
                <div id="api">
                  <Mail />
                </div>
              </center>
            </div>
          </>
        )}

        <Mail />
      </div>
    </>
  );
}
