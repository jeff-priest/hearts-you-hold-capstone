import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import "./styles/pagination.css";

export default function NotFundedPagination({
  notFunded,
  setNotFunded,
  setShowShoppingCartButton,
  itemCategory,
  pageNumber,
  setPageNumber,
  itemRecipientsState,
}) {
  const [donationItemsToDisplay, setDonationItemsToDisplay] = useState("");
  const [notFundedLength, setNotFundedLength] = useState(0);
  const [noMatchFound, setNotMatchFound] = useState(false);

  //function receives object id for each donationItemCard as parameter and maps over the notFunded state and finds the one that matches and changes its inShoppingCart value to true, function then resets notFunded state with new inShoppingCart values
  function addToCart(event, id) {
    let addedItem = notFunded.map((item) => {
      if (item._id === id) {
        setShowShoppingCartButton(true);
        return { ...item, inShoppingCart: true };
      } else {
        return item;
      }
    });
    setNotFunded(addedItem);
  }

  //openReadMore and closeReadMore uses the same logic as addToCart, these functions are toggling the readMoreOpen value between true and false and causing different descriptions to render accordingly
  function openReadMore(event, id) {
    let clickedItem = notFunded.map((item) => {
      if (item._id === id) {
        return { ...item, readMoreOpen: true };
      } else {
        return item;
      }
    });
    setNotFunded(clickedItem);
  }

  function closeReadMore(event, id) {
    let clickedItem = notFunded.map((item) => {
      if (item._id === id) {
        return { ...item, readMoreOpen: false };
      } else {
        return item;
      }
    });
    setNotFunded(clickedItem);
  }

  let viewedDescription = null;

  function descriptionSlice(itemDescription) {
    //if the description is less than 20 characters, show the whole description
    if (itemDescription.length < 300) {
      viewedDescription = itemDescription;
      return viewedDescription;

      //if it is over 20
    } else {
      for (let i = 300; i <= itemDescription.length; i++) {
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

  //pagination
  let donationItemsPerPage = 25;

  let pagesVisited = pageNumber * donationItemsPerPage;

  let displayDonationItems = [];

  //creates item list
  function mapTheItems() {
    //slices the section from the total list of items that corresponds to page number
    displayDonationItems = notFunded
      .filter((item) => {
        if (item.categorySelected === true) {
          return item;
        }
      })
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
            {viewedDescription.length > 300 ? (
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

        //variable for button that renders when inShoppingCart is true
        let inCartButton = (
          <>
            <button
              className="addedToDonation"
              disabled={true}
              onClick={(event) => {
                addToCart(event, donationItemCard._id);
              }}
            >
              Added To Donation
            </button>
          </>
        );

        //variable for button that renders when inShoppingCart is false
        let notInCartButton = (
          <>
            <button
              className="addToDonation"
              disabled={false}
              onClick={(event) => {
                addToCart(event, donationItemCard._id);
              }}
            >
              Donate
            </button>
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
                  {donationItemCard.inShoppingCart
                    ? inCartButton
                    : notInCartButton}
                </div>
              </section>

              {/* contents for right side of item card*/}
              <section className="cardPriceReceipientLocation">
                <div className="cardItemPriceContainer">
                  <h2 className="cardItemPrice">{`$${donationItemCard.itemPricePlusFifteen}`}</h2>
                </div>

                <div className="cardRecipientContainer">
                  <h4 className="cardRecipientName">
                    {donationItemCard.recipientName}
                  </h4>
                  <div className="cardLocation">{`${donationItemCard.recipientUSLocation}`}</div>
                </div>
              </section>
            </div>
          </li>
        );
      });

    setDonationItemsToDisplay(displayDonationItems);
  }

  //filters if category is present and creates item list
  useEffect(() => {
    //searching for both category and state
    if (itemCategory !== "all" && itemRecipientsState !== "all") {
      notFunded = notFunded.map((item) => {
        if (
          item.itemCategory === itemCategory &&
          item.recipientState === itemRecipientsState
        ) {
          return { ...item, categorySelected: true };
        } else {
          return { ...item, categorySelected: false };
        }
      });

      //searching for just state
    } else if (itemCategory === "all" && itemRecipientsState !== "all") {
      notFunded = notFunded.map((item) => {
        if (item.recipientState === itemRecipientsState) {
          return { ...item, categorySelected: true };
        } else {
          return { ...item, categorySelected: false };
        }
      });

      //searching for just category
    } else if (itemCategory !== "all" && itemRecipientsState === "all") {
      notFunded = notFunded.map((item) => {
        if (item.itemCategory === itemCategory) {
          return { ...item, categorySelected: true };
        } else {
          return { ...item, categorySelected: false };
        }
      });
    } else if (itemCategory === "all" && itemRecipientsState === "all") {
      notFunded = notFunded.map((item) => {
        return { ...item, categorySelected: true };
      });
    }

    let lengthOfFilter = notFunded.filter((item) => {
      if (item.categorySelected === true) {
        return item;
      }
    });

    if (lengthOfFilter.length === 0) {
      setNotMatchFound(true);
    } else {
      setNotMatchFound(false);
      setNotFundedLength(lengthOfFilter.length);

      mapTheItems();
    }
  }, [notFunded, itemCategory, pageNumber, itemRecipientsState]);

  let pageCount = Math.ceil(notFundedLength / donationItemsPerPage);

  //selected is the number for the page we want to move to, built in paginate
  let changePage = ({ selected }) => {
    setPageNumber(selected);
    return <>{window.scrollTo(0, 0)}</>;
  };

  let noMatch = (
    <>
      <li className="donationCard noListing">No Listings Found</li>
    </>
  );

  return (
    <>
      <ul>{noMatchFound ? noMatch : donationItemsToDisplay}</ul>

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        pageClassName={"paginationPages"}
        containerClassName={"paginationButtonsContainer"}
        previousLinkClassName={"previousButton"}
        nextLinkClassName={"nextButton"}
        activeClassName={"paginationActiveButton"}
        forcePage={pageNumber}
        pageRangeDisplayed={3}
        marginPagesDisplayed={0}
      />
    </>
  );
}
