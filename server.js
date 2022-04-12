//-----BOILER PLATE -- CONNECTING TO EXPRESS SERVER ------//
const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors');
const port = process.env.PORT || 8003;
const host = process.env.PORT || 8003;
require ("dotenv").config();
const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

//-------END BOILER PLATE----------------------//

//bringing in schema 
const requestSchema = require('./data.js');

//model for schema instances
const Request = mongoose.model('RequestItem', requestSchema);


//getting data and filtering it based on isFunded value and sending it in response as an array for client state
app.get("/", async (request, response) => {

    let notFunded = await Request.find ({isFunded: false})

    let isFunded = await Request.find ({isFunded: true})

    let fundedArray = [notFunded, isFunded]

    response.json(fundedArray)
});

app.post("/donation-cart", async (request, response) => {
    let itemsToChange = request.body;
    
    console.log(itemsToChange);
    let changedItems = []
    
    for(let i = 0; i < itemsToChange.length; i++) {

        changedItems = await Request.findByIdAndUpdate(itemsToChange[i]._id, {isFunded: true})
             
    }
    
    response.send(changedItems)

})

app.listen(port, host, () => {
    console.log('listening on port: ' + port + ' and host: ' +  host ) 
  })

  

