import React, { useState } from "react";
import jsonp from "jsonp";
import queryString from "query-string";

// signup form URL from mailchimp account: http://eepurl.com/hY1P7n
// https://heartsyouhold.us14.list-manage.com/subscribe/post
// u: c00ddccf8d310066a300f407c
// id: 54c3496fcb

// grab HYH U/ ID / and action url 

function Mail(props) {
  const subscribeToNewsLetter = () => {
    const formData = {
      EMAIL: props.email,
      MERGE1: props.firstname,
      MERGE2: props.lastname,
    };
    jsonp(
      `https://heartsyouhold.us14.list-manage.com/subscribe/post-json?u=c00ddccf8d310066a300f407c&amp;id=54c3496fcb&${queryString.stringify(
        formData
      )}`,
      { param: "c" },
      (err, data) => {
        console.log(data)
        // return message from mailChimp API 
        setMessage(data.result + " : " + data.msg);
      }
    );
  };

  const [message, setMessage] = useState("");

  return (
    <div>
      <div>{message}</div>
      <button onClick={subscribeToNewsLetter}>Submit</button>
    </div>
  );
}

export default Mail;