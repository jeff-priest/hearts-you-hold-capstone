import React from "react"
import "./styles/home.css"

export default function Funded (props) {

    return (<>
        <div className="heroContainer">
        <h1 className="heroHeader">Funded Requests</h1>
        <p className="heroText">All of the requests on this page are from specific individuals, families or organizations. One of the core values of HYH is that only the individuals themselves know what they want or need and that it is critical to take the time to ask them. When you fund an Individual Request, you are providing something that not only the individual, family or organization needs but you are also supporting another HYH core value which is that immigrants, migrants and refugees should feel valued, respected and appreciated. Basically, your support is saying, “we love you and the fact that you are here!”</p>
        </div>
    <ul>
    {props.donationItemsCardList}
    </ul>
    </>);
}