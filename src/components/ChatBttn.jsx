import React from "react";
import "../styles/DashBody.css"

const ChatBttn = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            Chatbot
        </button>
    );
};
export default ChatBttn;