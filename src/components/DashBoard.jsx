import React from "react";
import HeaderDash from "./HeaderDash";
import Footer from "./Footer";
import DashBody from "./DashBody";
import "../styles/app.css"

function Dashboard() {
  return (
    <div className="app">
     <HeaderDash/>
     <DashBody/>
     <Footer/>
    </div>
  );
}

export default Dashboard;