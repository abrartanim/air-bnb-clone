import { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import "./App.css";
import "./index.css";

// 1. Define the type for our property data to match the backend schema
interface Property {
  _id: string;
  title: string;
  price: number;
  images: string[];
  location: {
    city: string;
    country: string;
  };
  rating: number;
  category: string;
}

function App() {
  // 2. Set up state to hold the properties, initializing with an empty array
  const [properties, setProperties] = useState<Property[]>([]);

  // 3. Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/properties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []); // The empty array [] ensures this effect runs only once

  return (
    <div className="font-sans">
      <Header />

      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Featured Stays</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {/* 4. Map over the 'properties' state variable instead of the dummy data */}
          {properties.map((property) => (
            <ProductCard
              key={property._id}
              imageSrc={property.images[0]} // Use the first image for the card
              location={property.location.city}
              price={property.price}
              rating={property.rating}
              type={property.category}
              // FIX: Add missing props required by ProductCard
              isGuestFavorite={property.rating > 4.8} // Example logic: high rating = guest favorite
              nights={5} // Provide a default value for nights
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
