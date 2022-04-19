import { useState } from "react";
import "./styles/forum.css";
import jsonp from "jsonp";
import queryString from "query-string";

function Forum() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState(false);
  const [addToEmail, setAddToEmail] = useState(false);
  const [listYourName, setListYourName] = useState(false);
  const [blurb, setBlurb] = useState(false);

  // mailchimp code.... runs functions to send email too mailchimp severs / line 16-32
  const [message, setMessage] = useState("");
  const subscribeToNewsLetter = () => {
    const formData = {
      EMAIL: email,
      MERGE1: firstName,
      MERGE2: lastName,
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

  function handleFirstName(e) {
    setFirstName(e.target.value);
    console.log("firstName", e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
    console.log("lastName", e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
    console.log("email", e.target.value);
  }

  function handleHearAboutUs(e) {
    setHearAboutUs(e.target.value);
    console.log("hearAboutUs", e.target.value);
  }

  function handleAddToEmail(e) {
    setAddToEmail(e.target.value);
    console.log("addToEmail", e.target.value);

    if (e.target.value === "yes") {
      subscribeToNewsLetter();
    }
  }

  function handleListYourName(e) {
    setListYourName(e.target.value);
    console.log("listYourName", e.target.value);
  }

  function handleBlurb(e) {
    setBlurb(e.target.value);
    console.log("Blurb", e.target.value);
  }

  return (
    <div className="form">
      <div id="textBoxes">
        <input
          type="text"
          placeholder="First Name"
          defaultValue={firstName}
          onChange={handleFirstName}
        />
        <br />
        <input
          type="text"
          placeholder="Last Name"
          defaultValue={lastName}
          onChange={handleLastName}
        />
        <br />
        <input
          type="text"
          placeholder="Email"
          defaultValue={email}
          onChange={handleEmail}
        />
      </div>

      <div id="formQuestions">
        {/* hear about us start */}
        <h3>How did you hear about us?</h3>
        <label htmlFor="checkBoxAnswers">
          <input id="website" value="website" type="checkbox" onChange={handleHearAboutUs} />
          Website
        </label>
        <br />
        <label htmlFor="checkBoxAnswers">
          <input id="facebook" type="checkbox" onChange={handleHearAboutUs} />
          Facebook
        </label>
        <br />
        <label htmlFor="checkBoxAnswers">
          <input id="donorParty" value="donorParty" type="checkbox" onChange={handleHearAboutUs} />
          Donor Party
        </label>
        <br />
        <label htmlFor="checkBoxAnswers">
          <input id="friend" value="friend" type="checkbox" onChange={handleHearAboutUs} />
          Friend
        </label>
        <br />
        <label htmlFor="checkBoxAnswers">
          <input id="other" value="other" type="checkbox" onChange={handleHearAboutUs} />
          Other
        </label>
        <br />
        {/* hear about us end */}

        {/* Add to mailList start */}
        <h3>Would you like to be added to our mailing list?</h3>
        <label htmlFor="checkBoxAnswers">
          <input id="yes" value="yes" type="checkbox" onChange={handleAddToEmail} />
          Yes
        </label>
        <br />
        <label htmlFor="checkBoxAnswers">
          <input id="no" value="no" type="checkbox" onChange={handleAddToEmail} />
          No
        </label>
        <br />
        {/* Add to mailList ends */}

        {/* list name on website start */}
        <h3>Can we list your name on the website?</h3>
        <label htmlFor="checkBoxAnswers">
          <input id="yes" value="yes" type="checkbox" onChange={handleListYourName} />
          Yes
        </label>
        <br />
        <label htmlFor="checkBoxAnswers">
          <input id="no" value="no" type="checkbox" onChange={handleListYourName} />
          No
        </label>
        <br />
        {/* list name on website ends */}

        {/* blurb starts */}
        <h3>
          Would you be willing to post a little blurb (pre written and emailed to
          you) in your <br /> local listserv or local forum each month? This is a
          very successful way to bring in <br /> new donors!
        </h3>
        <label htmlFor="checkBoxAnswers">
          <input id="No thank you, not at this time" value="No thank you, not at this time" type="checkbox" onChange={handleBlurb} />
          Yes, I would be happy to help out in this way
        </label>
        <br />
        <label htmlFor="checkBoxAnswers">
          <input id="No thank you, not at this time" value="No thank you, not at this time" type="checkbox" onChange={handleBlurb} />
          No thank you, not at this time
        </label>
        <br />
        {/* blurb ends */}
      </div>
    </div>
  );
}

export default Forum;
