// src/pages/HomePage.tsx

import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // 1. Import Link
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 2. Updated Interface to match the new API response
interface Property {
  id: string; // Changed from _id
  name: string;
  price: number;
  picture_url: string;
  neighbourhood_cleansed: string; // Changed from nested address object
  review_scores_rating: number;
  property_type: string;
}

function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<Property[]>("/api/properties");
        setProperties(response.data);

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <main className="container mx-auto p-8 mt-10">
      <h1 className="text-3xl font-bold mb-8">Featured Stays</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {properties.map((property) => (
          // 3. Wrap ProductCard with a Link and use the correct 'id'
          <Link to={`/property/${property.id}`} key={property.id}>
            <ProductCard
              imageSrc={property.picture_url}
              location={property.neighbourhood_cleansed}
              price={property.price}
              rating={property.review_scores_rating || 0}
              type={property.property_type}
              isGuestFavorite={(property.review_scores_rating || 0) > 4.8}
              nights={5}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
