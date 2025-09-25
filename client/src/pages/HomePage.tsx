import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { gsap } from "gsap"; // 1. Import GSAP
import { ScrollTrigger } from "gsap/ScrollTrigger"; // 2. Import ScrollTrigger

gsap.registerPlugin(ScrollTrigger);

// Interface for a single property
interface Property {
  _id: string;
  name: string;
  price: number;
  picture_url: string;
  address: {
    neighbourhood: string;
  };
  review_scores_rating: number;
  property_type: string;
}

// Rename the function to HomePage
function HomePage() {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get<Property[]>(
          "http://localhost:8080/api/properties"
        );
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
          <ProductCard
            key={property._id}
            imageSrc={property.picture_url}
            location={property.address.neighbourhood}
            price={property.price}
            rating={property.review_scores_rating || 0}
            type={property.property_type}
            isGuestFavorite={(property.review_scores_rating || 0) > 4.8}
            nights={5}
          />
        ))}
      </div>
    </main>
  );
}

export default HomePage;
