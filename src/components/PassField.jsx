import React from "react";
import "../styles/userField.css"
function PassField({ value, onChange }) {
  return (
    <div className="fieldContainer">
      <input
      type="password"
      placeholder="Password"
      className="userField"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required
    />
    </div>
    
  );
}
  
  export default PassField;