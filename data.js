//----BOILER PLATE -- CONNECTING TO MONGO DATABASE ---//

const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/dummyHYH", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on("error", console.error.bind("connection error"));
//----------- END BOILER PLATE -------//


const requestSchema = new mongoose.Schema({

   item: String,
   name: String,
   price: Number,
   date: Date,
   blurb: String,

})

module.exports = requestSchema