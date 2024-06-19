import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import HeaderLanding from "./HeaderLanding";
import LandingMain from "./LandingMain";
import Footer from "./Footer";
import Dashboard from "./DashBoard";

function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigateTo = useNavigate();
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigateTo("/dashboard");
  };
  return (
    <div>
      <HeaderLanding onLoginSuccess={handleLoginSuccess} />
      <LandingMain />
      <Footer />
    </div>
  );
}

export default LandingPage;
