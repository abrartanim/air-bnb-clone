import React, { useState, useEffect, useRef } from "react"; // Import useRef
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
import StickyNav from "../components/property/StickyNav"; // 1. Import the new component

import type { Property } from "../components/property/types";
import { propertyTypeMap } from "../components/property/types";

// The dynamicSanitize function remains the same
const dynamicSanitize = (
  data: Property,
  typeMap: typeof propertyTypeMap
): Property => {
  const sanitizedData: Record<string, any> = { ...data };
  for (const key in sanitizedData) {
    if (sanitizedData[key] === null && key in typeMap) {
      const expectedType = typeMap[key];
      if (expectedType === "number") sanitizedData[key] = 0;
      else if (expectedType === "string") sanitizedData[key] = "Not available";
    }
  }
  return sanitizedData as Property;
};

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Add state for the sticky nav and a ref for the trigger element
  const [isStickyNavVisible, setStickyNavVisible] = useState(false);
  const infoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Data fetching logic remains the same...
    const fetchPropertyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<Property>(
          `http://localhost:8080/api/properties/${id}`
        );
        const sanitizedData = dynamicSanitize(response.data, propertyTypeMap);
        setProperty(sanitizedData);
      } catch (err) {
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchPropertyDetails();
  }, [id]);

  // 3. Add an effect to listen to scroll events
  useEffect(() => {
    const handleScroll = () => {
      if (infoSectionRef.current) {
        // Get the top position of the PropertyInfo section
        const topPosition = infoSectionRef.current.getBoundingClientRect().top;
        // The nav should appear when the section top is at or above the viewport top
        setStickyNavVisible(topPosition <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 p-10">{error}</div>;
  if (!property)
    return <div className="text-center p-10">Property not found.</div>;

  return (
    <>
      {/* 4. Render the StickyNav outside the main container */}
      <StickyNav isVisible={isStickyNavVisible} />

      <main className="container mx-auto px-8 py-12">
        <PropertyHeader property={property} />

        {/* 5. Add IDs to the sections you want to link to */}
        <div id="photos">
          <ImageGallery property={property} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
          {/* 6. Attach the ref to the trigger section */}
          <div className="lg:col-span-2" ref={infoSectionRef} id="amenities">
            <PropertyInfo property={property} />
            <div className="mt-1 pt-4 pl-3">
              <DatePicker />
            </div>
          </div>
          <div>
            <BookingCard property={property} />
          </div>
        </div>

        <div id="reviews" className="mt-8">
          <PropertyReviews property={property} />
        </div>

        <div id="location" className="mt-8">
          <PropertyMap property={property} />
        </div>

        <HostInfo property={property} />
      </main>
    </>
  );
};

export default PropertyDetailsPage;
