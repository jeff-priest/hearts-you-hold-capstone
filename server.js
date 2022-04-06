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
const { response } = require("express");

//model for schema instances
const Request = mongoose.model('RequestItem', requestSchema);


//creating API route for the front end to access ALL NOT FUNDED entries from the database
app.get("/", async (request, response) => {
    //assigning the result of a find on our Model to a variable
    let notFunded = await Request.find ({isFunded: false})
    // logging all requestItems 
    console.log(notFunded)

    response.json(notFunded)
});

//creating API route for the front end to access ALL FUNDED entries from the database
app.get("/funded-requests", async (request, response) => {
    //assigning the result of a find on our Model to a variable
    let isFunded = await Request.find ({isFunded: true})
    // logging all requestItems 
    console.log(isFunded)

    response.json(isFunded)
});


app.listen(port, () => {
    console.log('listening on port: ' + port) 
  })

