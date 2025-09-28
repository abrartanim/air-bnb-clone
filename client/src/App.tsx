import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PropertyDetailsPage from "./pages/ProductDetailsPage";
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="font-sans">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
           <Route path="/property/:id" element={<PropertyDetailsPage />} />
        </Routes>
        {/* <PropertyDetailsPage /> */}
      </div>
    </Router>
  );
}

export default App;
