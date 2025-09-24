import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* We will add the property details page route here later */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
