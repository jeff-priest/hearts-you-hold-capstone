import React from "react"
import PayPal from './PayPal.js'
import Requests from './Requests.js'
import '../Styles.css'

export default function Home () {



    return (
        <>
        <h1>Requests - Organizations & Individual</h1>
        <p>Would you like to fund a request in someone's name as a gift? No problem, just let us know the name and email of the person as well as a little note from you and we will send a nice email to them! Leave this info in the comment box when you check out!</p>
        { /* Link to funded requests */}
        {/* sort by oldest/newest, state, category */}
        <Requests />

        <PayPal />
        </>
    )
}


//automatically put in readmore button after X amount of characters?