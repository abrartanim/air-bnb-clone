// src/pages/PropertyDetailsPage.tsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// Import your components
import PropertyHeader from "../components/property/PropertyHeader";
import ImageGallery from "../components/property/ImageGallery";
import PropertyInfo from "../components/property/PropertyInfo";
import BookingCard from "../components/property/BookingCard";
import DatePicker from "../components/DatePicker";
import PropertyReviews from "../components/property/PropertyReviews";
import PropertyMap from "../components/property/PropertyMap";
import HostInfo from "../components/property/HostInfo";

// Import the full Property type definition
import type { Property } from "../components/property/types";
import { propertyTypeMap } from "../components/property/types";

// The dynamicSanitize function remains the same
// src/pages/PropertyDetailsPage.tsx

const dynamicSanitize = (
  data: Property,
  typeMap: typeof propertyTypeMap
): Property => {
  // 1. Cast the object to allow string indexing
  const sanitizedData: Record<string, any> = { ...data };

  for (const key in sanitizedData) {
    if (sanitizedData[key] === null && key in typeMap) {
      const expectedType = typeMap[key];
      if (expectedType === "number") {
        sanitizedData[key] = 0;
      } else if (expectedType === "string") {
        sanitizedData[key] = "Not available";
      }
    }
  }

  // 2. Cast it back to the original type before returning
  return sanitizedData as Property;
};

const PropertyDetailsPage = () => {
  // 1. Get the 'id' from the URL
  const { id } = useParams<{ id: string }>();

  // 2. Set up state for property data, loading, and errors
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 3. Fetch data when the component mounts or the id changes
  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Property>(
          `http://localhost:8080/api/properties/${id}`
        );
        // setProperty(response.data);
        const sanitizedData = dynamicSanitize(response.data, propertyTypeMap);
        setProperty(sanitizedData);
      } catch (err) {
        setError("Failed to load property details. Please try again later.");
        console.error("Error fetching property details:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPropertyDetails();
    }
  }, [id]);

  // 4. Handle loading and error states
  if (loading) {
    return <div className="text-center p-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 p-10">{error}</div>;
  }

  if (!property) {
    return <div className="text-center p-10">Property not found.</div>;
  }

  // 5. Render the page with the fetched data
  return (
    <main className="container mx-auto px-8 py-12">
      <PropertyHeader property={property} />
      <ImageGallery property={property} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <PropertyInfo property={property} />
          <div className="mt-1 pt-4 pl-3">
            <DatePicker />
          </div>
        </div>
        <div>
          <BookingCard property={property} />
        </div>
      </div>
      <PropertyReviews property={property} />
      <PropertyMap property={property} />
      <HostInfo property={property} />
    </main>
  );
};

export default PropertyDetailsPage;
