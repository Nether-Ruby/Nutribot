import React from "react";
import "../styles/LoginForm.css";
import UserField from "./UserField";
import PassField from "./PassField";
import LoginBttn from "./LoginBttn";

function LoginForm() {
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
        <form className="form" method="POST">
          <div className="center spacing">
            <UserField />
          </div>
          <br></br>
          <div className="center">
            <PassField />
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
export default LoginForm;
