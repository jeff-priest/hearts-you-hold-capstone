import { useState } from "react";
import "./styles/form.css";
import jsonp from "jsonp";
import queryString from "query-string";

function Form({setFormData, payPal}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [hearAboutUs, setHearAboutUs] = useState(false);
  const [addToEmail, setAddToEmail] = useState(false);
  const [listYourName, setListYourName] = useState(false);
  const [blurb, setBlurb] = useState(false);

  // mailchimp code.... runs functions to send email too mailchimp severs 
  const [message, setMessage] = useState("");
  
  function handleFormSubmit(event) {
    
    event.preventDefault();
    
    let formDataObject = {
      firstName,
      lastName,
      email,
      hearAboutUs,
      addToEmail,
      listYourName,
      blurb,
    }
    
    setFormData(formDataObject)
    
    payPal();
    
    const subscribeToNewsLetter = () => {
      const formData = {
        EMAIL: formDataObject.email,
        MERGE1: formDataObject.firstName,
        MERGE2: formDataObject.lastName,
      };

      console.log(formData.EMAIL);

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

    if(addToEmail) {
      console.log("Join MailChimp!");
      subscribeToNewsLetter()
    }
    
  }
  
  return (
    <form  className="form" onSubmit={handleFormSubmit}>
      <div className="formContainer">
      <h1 className="fillOut">Please Fill Out This Form To Complete Your Donation</h1>
      <div className="textBoxes">
        <input className="inputText"
          type="text"
          placeholder="First Name"
          defaultValue={firstName}
          onChange={(e)=> setFirstName(e.target.value)}
        />
        <br />
        <input className="inputText"
          type="text"
          placeholder="Last Name"
          defaultValue={lastName}
          onChange={(e)=> setLastName(e.target.value)}
        />
        <br />
        <input className="inputText"
          type="text"
          placeholder="Email"
          defaultValue={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
      </div>

      <div className="formQuestionsContainer">
        {/* hear about us start */}
        <h3 className="formQuestions">How did you hear about us?</h3>
        <label  className="checkBox"  htmlFor="checkBoxAnswers">
          <input className="input" id="website" value="website" type="checkbox" onChange={(e)=> setHearAboutUs(e.target.value)} />
          Website
        </label>
        <br />
        <label className="checkBox" htmlFor="checkBoxAnswers">
          <input className="input"  id="facebook" value="facebook" type="checkbox" onChange={(e)=> setHearAboutUs(e.target.value)} />
          Facebook
        </label>
        <br />
        <label className="checkBox" htmlFor="checkadBoxAnswers">
          <input className="input" id="friend" value="friend" type="checkbox" onChange={(e)=> setHearAboutUs(e.target.value)} />
          Friend
        </label>
        <br />
        <label className="checkBox" htmlFor="checkBoxAnswers">
          <input className="input" id="other" value="other" type="checkbox" onChange={(e)=> setHearAboutUs(e.target.value)} />
          Other
        </label>
        <br />
        {/* hear about us end */}

        {/* Add to mailList start */}
        <h3 className="formQuestions">Would you like to be added to our mailing list?</h3>
        <label className="checkBox"  htmlFor="checkBoxAnswers">
          <input className="input" id="yes" value={true} type="checkbox" onChange={(e)=> setAddToEmail(e.target.value)} />
          Yes
        </label>
        <br />
        <label className="checkBox" htmlFor="checkBoxAnswers">
          <input className="input" id="no" value={false} type="checkbox" onChange={(e)=> setAddToEmail(e.target.value)} />
          No
        </label>
        <br />
        {/* Add to mailList ends */}

        {/* list name on website start */}
        <h3 className="formQuestions">Can we list your name on the website?</h3>
        <label className="checkBox" htmlFor="checkBoxAnswers">
          <input className="input" id="yes" value="yes" type="checkbox" onChange={(e)=> setListYourName(e.target.value)} />
          Yes
        </label>
        <br />
        <label className="checkBox" htmlFor="checkBoxAnswers">
          <input className="input" id="no" value="no" type="checkbox" onChange={(e)=> setListYourName(e.target.value)} />
          No
        </label>
        <br />
        {/* list name on website ends */}

        {/* blurb starts */}
        <h3 className="formQuestions">
          Would you be willing to post a little blurb (pre written and emailed to
          you) in your <br /> local listserv or local forum each month? This is a
          very successful way to bring in <br /> new donors!
        </h3>
        <label className="checkBox" htmlFor="checkBoxAnswers">
          <input className="input" id="No thank you, not at this time" value="No thank you, not at this time" type="checkbox" onChange={(e)=> setBlurb(e.target.value)} />
          Yes, I would be happy to help out in this way
        </label>
        <br />
        <label className="checkBox" htmlFor="checkBoxAnswers">
          <input className="input" id="No thank you, not at this time" value="No thank you, not at this time" type="checkbox" onChange={(e)=> setBlurb(e.target.value)} />
          No thank you, not at this time
        </label>
        <br />
        {/* blurb ends */}
      </div>

        <button type="submit" className="proceedToCheckout">
          Procceed To Checkout!
        </button>
        </div>
    </form>  
  );
}

export default Form;
