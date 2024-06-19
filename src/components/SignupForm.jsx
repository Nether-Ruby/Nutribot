import React, { useState } from "react";
import "../styles/LoginForm.css";
import UserField from "./UserField";
import PassField from "./PassField";
import LoginBttn from "./LoginBttn";
import ConField from "./ConField";
import NameField from "./nameField";

function SignupForm({ onclose }) {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Create an object with the form data
    const formData = {
      username,
      email,
      password,
      confirmPassword,
    };

    try {
      // Send a POST request to your backend
      const response = await fetch('http://localhost:5000/Nutribot/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful response
        console.log('Signup successful');
        // Optionally close the popup
        onclose();
      } else {
        // Handle errors
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="popUp">
      <div className="popUp-content">
        <form>
          <div>
            <button className="closeButton" onClick={onclose}>
              &times; {/* This is a common symbol for 'close' */}
            </button>
            <br></br>
            <br></br>
          </div>
        </form>
        <form onSubmit={handleSubmit} className="formSignUp" method="POST">
          <div className="center spacing">
            <NameField value={username} onChange={setUsername} />
          </div>
          <br></br>
          <div className="center">
            <UserField value={email} onChange={setEmail} />
          </div>
          <br></br>
          <div className="center">
            <PassField value={password} onChange={setPassword} />
          </div>
          <br></br>
          <div className="center">
            <ConField value={confirmPassword} onChange={setConfirmPassword} />
          </div>
          <br></br>
          <div className="center spacing">
            <LoginBttn />
          </div>
        </form>
      </div>
    </div>
  );
}
export default SignupForm;
