import React, { useState } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import ScrollToTop from "./ScrollToTop";
import "./styles/pagination.css";
import "./styles/home.css";

export default function Funded(props) {
  let isFunded = props.isFunded;
  let setIsFunded = props.setIsFunded;

  function openReadMore(event, id) {
    let clickedItem = isFunded.map((item) => {
      if (item._id === id) {
        return { ...item, readMoreOpen: true };
      } else {
        return item;
      }
    });
    setIsFunded(clickedItem);
  }

  function closeReadMore(event, id) {
    let clickedItem = isFunded.map((item) => {
      if (item._id === id) {
        return { ...item, readMoreOpen: false };
      } else {
        return item;
      }
    });
    setIsFunded(clickedItem);
  }

  let viewedDescription = null;

  function descriptionSlice(itemDescription) {
    //if the description is less than 20 characters, show the whole description
    if (itemDescription.length < 20) {
      viewedDescription = itemDescription;
      return viewedDescription;

      //if it is over 20
    } else {
      for (let i = 20; i <= itemDescription.length; i++) {
        let character = itemDescription.charAt(i);

        //for a description that is over 20 characters but doesn't have a space between 20 and its total length
        if (i === itemDescription.length) {
          viewedDescription = itemDescription;
          return viewedDescription;

          //when the loop finds the first space it slices the description
        } else if (character === " ") {
          viewedDescription = itemDescription.slice(0, i);
          return viewedDescription;

          //if it's not a space it adds one to it and runs again
        } else if (character !== " ") {
          i++;
        }
      }
    }
  }

  //what page of items the user is on
  const [pageNumber, setPageNumber] = useState(0);

  //number of items on each page
  let donationItemsPerPage = 1;

  //page number state multiplied by how many items appear on each page
  let pagesVisited = pageNumber * donationItemsPerPage;

  //slices the section from the total list of items that corresponds to page number

  let displayDonationItems = isFunded
    .slice(pagesVisited, pagesVisited + donationItemsPerPage)
    .map((donationItemCard, index) => {
      //this variable is a placeholder idea for limiting the description size

      descriptionSlice(donationItemCard.donationDescription);

      //variable for if readMoreOpen = true
      let readLessDescription = (
        <>
          {donationItemCard.donationDescription}
          <button
            className="readMoreBtn"
            onClick={(event) => {
              closeReadMore(event, donationItemCard._id);
            }}
          >
            Read Less
          </button>
        </>
      );

      //variable for if readMoreOpen = false
      let readMoreDescription = (
        //if the description is over 20 characters show the read more button
        <>
          {viewedDescription.length > 20 ? (
            <>
              {viewedDescription}
              <button
                className="readMoreBtn"
                onClick={(event) => {
                  openReadMore(event, donationItemCard._id);
                }}
              >
                Read More...
              </button>
            </>
          ) : (
            //if the description is under 20 characters just show the description without a read more button
            <>{viewedDescription}</>
          )}
        </>
      );

      return (
        //creating unique key for each li
        <li key={`donationItemCard-${index}`}>
          <div className="donationCard">
            {/* contents for left side of item card*/}
            <section className="cardNameDescription">
              <h2 className="cardName">{donationItemCard.itemName}</h2>
              <div className="cardDescriptionText">
                {donationItemCard.readMoreOpen
                  ? readLessDescription
                  : readMoreDescription}
              </div>
              <div className="donateButtonContainer">
                <button className="addedToDonation" disabled={true}>
                  Donated!
                </button>
              </div>
            </section>

            {/* contents for right side of item card*/}
            <section className="cardPriceReceipientLocation">
              <div className="cardItemPriceContainer">
                <h2 className="cardItemPrice">{`$${donationItemCard.itemPrice}`}</h2>
              </div>

              <div className="cardRecipientContainer">
                <h4 className="cardRecipientName">
                  {donationItemCard.recipientName}
                </h4>
                <div className="cardLocation">{`${donationItemCard.recipientUSLocation} - ${donationItemCard.recipientHomeOrigin}`}</div>
              </div>
            </section>
          </div>
        </li>
      );
    });

  let pageCount = Math.ceil(isFunded.length / donationItemsPerPage);

  //selected is the number for the page we want to move to, built in paginate
  let changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <ScrollToTop />
      <div className="body">
        <div className="heroContainer">
          <h1 className="heroHeader">Funded Requests</h1>
          <p className="heroText">
            All of the requests on this page are from specific individuals,
            families or organizations. One of the core values of HYH is that
            only the individuals themselves know what they want or need and that
            it is critical to take the time to ask them. When you fund an
            Individual Request, you are providing something that not only the
            individual, family or organization needs but you are also supporting
            another HYH core value which is that immigrants, migrants and
            refugees should feel valued, respected and appreciated. Basically,
            your support is saying, “we love you and the fact that you are
            here!”
          </p>

          <section className="totalFunded">
            <div>
              {`View Our ${props.notFunded.length} `}
              <Link className="fundedLink" to="/">
                Requests!
              </Link>
            </div>
          </section>
        </div>
        <ul>{displayDonationItems}</ul>
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          pageClassName={"paginationPages"}
          containerClassName={"paginationButtonsContainer"}
          previousClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          activeClassName={"paginationActiveButton"}
        />
      </div>
    </>
  );
}
