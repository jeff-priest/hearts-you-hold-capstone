//----BOILER PLATE -- CONNECTING TO MONGO DATABASE ---//

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/dummyHYH", { useNewUrlParser: true, useUnifiedTopology: true });

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
   recipientHomeOrigin: String,
   dateCreated: Date,
   itemCategory: String,
   recipientState: String,
   comments: String

})

module.exports = requestSchema