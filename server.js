//-----BOILER PLATE -- CONNECTING TO EXPRESS SERVER ------//
const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
const port = process.env.PORT || 8003;
const app = express();


app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//-------END BOILER PLATE----------------------//

//bringing in schema 
const requestSchema = require('./data.js');

//model for schema instances
const Request = mongoose.model('RequestItem', requestSchema);


//creating API route for the front end to access ALL the entries from the database
app.get("/allRequestItems", async (req, res) => {
    //assigning the result of a find on our Model to a variable
    let allRequestItems = await Request.find ({})
    // logging all requestItems 
    console.log(allRequestItems)
});


app.listen(port, () => {
    console.log('listening on port: ' + port) 
  })