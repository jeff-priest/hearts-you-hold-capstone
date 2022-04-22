import React, { useState } from "react";
import jsonp from "jsonp";
import queryString from "query-string";

// grab U / ID / Action URL from Eloise

function MailChimpAPI(props) {
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
        setMessage(data.result + " : " + data.msg);
      }
    );
  };

  const [message, setMessage] = useState("");

  return (
    <div>
      {/* <button onClick={subscribeToNewsLetter}>Submit</button>
      <div>{message}</div> */}

      {props.email}
    </div>
  );
}

export default MailChimpAPI;
