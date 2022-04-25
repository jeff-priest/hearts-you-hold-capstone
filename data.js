//----BOILER PLATE -- CONNECTING TO MONGO DATABASE ---//
require("dotenv").config();
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind("connection error"));
//----------- END BOILER PLATE -------//

const requestSchema = new mongoose.Schema({
  itemName: String,
  itemPrice: Number,
  donationDescription: String,
  isFunded: Boolean,
  recipientName: String,
  recipientUSLocation: String,
  dateCreated: Date,
  itemCategory: String,
  recipientState: String,
  comments: String,
  published: Boolean
});

module.exports = requestSchema;
