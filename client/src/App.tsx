import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation, // Import useLocation
} from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import PropertyDetailsPage from "./pages/ProductDetailsPage";
import Footer from "./components/Footer";
import "./App.css";
import "./index.css";

// A new component to contain the page layout
const AppLayout = () => {
  const location = useLocation();
  // Check if the current page is a property details page
  const isPropertyPage = location.pathname.startsWith("/property/");

  return (
    <div>
      {/* Pass a prop to Header to tell it which page it's on */}
      <Header isPropertyPage={isPropertyPage} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetailsPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
