//-----BOILER PLATE -- CONNECTING TO EXPRESS SERVER ------//
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const port = process.env.PORT || 8003;
const host = process.env.PORT || 8003;
require("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//-------END BOILER PLATE----------------------//

//bringing in schema
const requestSchema = require("./data.js");

//model for schema instances
const Request = mongoose.model("RequestItem", requestSchema);

//getting data and filtering it based on isFunded value and sending it in response as an array for client state
app.get("/", async (request, response) => {
  try {
    let notFunded = await Request.find({ isFunded: false });

    //building items for front-end response
    notFunded = notFunded.map((item) => {
      item = {
        _id: item._id,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        donationDescription: item.donationDescription,
        isFunded: item.isFunded,
        recipientName: item.recipientName,
        recipientUSLocation: item.recipientUSLocation,
        dateCreated: item.dateCreated,
        itemCategory: item.itemCategory,
        recipientState: item.recipientState,
      };

      return item;
    });

    let isFunded = await Request.find({ isFunded: true });

    isFunded = isFunded.map((item) => {
      item = {
        _id: item._id,
        itemName: item.itemName,
        itemPrice: item.itemPrice,
        donationDescription: item.donationDescription,
        isFunded: item.isFunded,
        recipientName: item.recipientName,
        recipientUSLocation: item.recipientUSLocation,
        dateCreated: item.dateCreated,
        itemCategory: item.itemCategory,
        recipientState: item.recipientState,
      };

      return item;
    });

    //categories filter
    let itemCategories = notFunded.map((item) => {
      return item.itemCategory;
    });

    let itemCategorySet = new Set(itemCategories);

    itemCategories = [...itemCategorySet];

    //dropping null from category search
    itemCategories = itemCategories.filter((item) => item !== null);

    //recipient's state filter
    let recipientStates = notFunded.map((item) => {
      return item.recipientState;
    });

    let recipientStatesSet = new Set(recipientStates);

    recipientStates = [...recipientStatesSet];

    //dropping null from state search
    recipientStates = recipientStates.filter((item) => item !== null);

    let fundedArray = [notFunded, isFunded];

    response.json([fundedArray, itemCategories, recipientStates]);
  } catch (error) {
    return response.status(404).send("Request not found");
  }
});

//successful payment - changes isFunded value
app.post("/donation-cart", async (request, response) => {
  try {
    let itemsToChange = request.body;

    let changedItems = [];

    for (let i = 0; i < itemsToChange.length; i++) {
      changedItems = await Request.findByIdAndUpdate(itemsToChange[i]._id, {
        isFunded: true,
      });
    }

    response.send(changedItems);
  } catch (error) {
    return response.status(404).send("Request not found");
  }
});

app.listen(port, host, () => {
  console.log("listening on port: " + port + " and host: " + host);
});
