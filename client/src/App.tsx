import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PropertyDetailsPage from "./pages/ProductDetailsPage";
import Footer from "./components/Footer";
import "./App.css";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
        </Routes>
        {/* <PropertyDetailsPage /> */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
