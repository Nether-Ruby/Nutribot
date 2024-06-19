import "./App.css";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Dashboard from "./components/DashBoard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
