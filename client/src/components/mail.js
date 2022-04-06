// referred this this website for mailChimp code -> "https://dev.to/gedalyakrycer/create-an-email-list-with-react-mailchimp-965"

import React, { useState, useEffect } from "react";
import MailchimpSubscribe from "react-mailchimp-subscribe";

// creating custom form components
const CustomForm = ({ status, message, onValidated }) => {
  const { modalOpen, setModalOpen } = useState();

//asssign values 
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

//this handleSubmit sends the data to mailchimp (this code is provided my mailchimp)
  const handleSubmit = (e) => {
    e.preventDefault(); //stops the page from refreshing
    email &&
      firstName &&
      lastName &&   //&& checks to see if all inputs are filled out, if not filled out form wont submit 
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
        MERGE1: firstName,
        MERGE2: lastName,  //uses Merge 1 & 2 to assign our states to first and last name 
      });
  };

//   clears form if past form was successful 
  useEffect(() => {
    if (status === "success") clearFields();
    if (modalOpen && status === "success") clearFields();
  }, [status, modalOpen]);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  return (
    <form className="form" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="title">
    {/* Mailchimp's API sending back status responses, in 3 categories (alert sending, alert error, alert sucess ) */}
        {status === "success"
          ? "Success!"
          : "Join our email list for updates and more! "}
      </h3>

      {status === "sending" && (
        <div className="alert--sending">sending...</div>
      )}

      {status === "error" && (
        <div
          className="alert--error"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className="alert--success"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status !== "success" ? (
        // inputs for first name, last name and email
        <div className="inputBoxes">
          <input
            onChangeHandler={setFirstName}
            type="text"
            value={firstName}
            placeholder="First Name"
            isRequired
          />

          <input
            label="Last Name"
            onChangeHandler={setLastName}
            type="text"
            value={lastName}
            placeholder="Last Name"
            isRequired
          />

          <input
            label="Email"
            onChangeHandler={setEmail}
            type="email"
            value={email}
            placeholder="your@email.com"
            isRequired
          />
        </div>
      ) : null}

      {/*Close button appears if form was successfully sent*/}
      {status === "success" ? (
        <button
          handleClick={() => setModalOpen(false)}
          label="close"
          size="big"
          customClass="g__justify-self-center"
        >
          submit
        </button>
      ) : (
        <input
          label="subscribe"
          type="submit"
          formValues={[email, firstName, lastName]}
        />
      )}
    </form>
  );
};
// component to hold Mailchimp Form
const MailchimpFormContainer = (props) => {
// Url for the form from Mailchimp
  const postUrl = `https://heartsyouhold.us14.list-manage.com/subscribe/post?u=${process.env.U}&id=${process.env.ID}`

  return (
    <div className="Mailchimp-container">
      <MailchimpSubscribe
        url={postUrl}
        // rendering with a callback function... returning Custom form 
        render={({ subscribe, status, message }) => (
          <CustomForm
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </div>
  )
}

export default MailchimpFormContainer;
