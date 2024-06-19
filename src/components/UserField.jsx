import React from "react";
import "../styles/userField.css";

function UserField({ value, onChange }) {
  return (
    <div className="fieldContainer">
      <input
        type="text"
        placeholder="Username"
        className="userField"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </div>
  );
}

export default UserField;
