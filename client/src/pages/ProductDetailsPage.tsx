import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// @ts-ignore
import { Range } from "react-date-range";
import { addDays, differenceInCalendarDays } from "date-fns";

// Import your components
import PropertyHeader from "../components/property/PropertyHeader";
import ImageGallery from "../components/property/ImageGallery";
import PropertyInfo from "../components/property/PropertyInfo";
import BookingCard from "../components/property/BookingCard";
import DatePicker from "../components/DatePicker";
import PropertyReviews from "../components/property/PropertyReviews";
import PropertyMap from "../components/property/PropertyMap";
import HostInfo from "../components/property/HostInfo";
import StickyNav from "../components/property/StickyNav";

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
  const [isStickyNavVisible, setStickyNavVisible] = useState(false);
  const infoSectionRef = useRef<HTMLDivElement>(null);

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: undefined, // Start with no dates selected
      endDate: undefined,
      key: "selection",
    },
  ]);

  useEffect(() => {
    // ... (Data fetching logic remains the same)
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

  useEffect(() => {
    // ... (Scroll handling logic remains the same)
    const handleScroll = () => {
      if (infoSectionRef.current) {
        const topPosition = infoSectionRef.current.getBoundingClientRect().top;
        setStickyNavVisible(topPosition <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Define the function to clear dates
  const handleClearDates = () => {
    const today = new Date();
    setDateRange([
      {
        startDate: today,
        endDate: today,
        key: "selection",
      },
    ]);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error)
    return <div className="text-center text-red-500 p-10">{error}</div>;
  if (!property)
    return <div className="text-center p-10">Property not found.</div>;

  const startDate = dateRange[0]?.startDate ?? null;
  const endDate = dateRange[0]?.endDate ?? null;
  const nights =
    startDate && endDate ? differenceInCalendarDays(endDate, startDate) : 0;

  return (
    <>
      <StickyNav isVisible={isStickyNavVisible} />

      <main className="container mx-auto px-8 py-12">
        <PropertyHeader property={property} />

        <div id="photos">
          <ImageGallery property={property} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-8">
          <div className="lg:col-span-2" ref={infoSectionRef} id="amenities">
            <PropertyInfo property={property} />
            <div className="mt-8 pt-8 border-t">
              {/* Pass the state, onChange handler, and the new onClear handler */}
              <DatePicker
                ranges={dateRange}
                onChange={(item) => setDateRange([item.selection])}
                onClear={handleClearDates}
                nights={nights}
              />
            </div>
          </div>
          <div>
            <BookingCard
              property={property}
              startDate={startDate}
              endDate={endDate}
              nights={nights}
            />
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
