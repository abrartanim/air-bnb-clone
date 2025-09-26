// src/pages/PropertyDetailsPage.tsx

import React from "react";

// Import all the new components
import PropertyHeader from "../components/property/PropertyHeader";
import ImageGallery from "../components/property/ImageGallery";
import PropertyInfo from "../components/property/PropertyInfo";
import BookingCard from "../components/property/BookingCard";

// The dummy data remains here for now.
// In a real app, you would fetch this from your API.
const dummyProperty = {
  id: "36301",
  name: "Romantic & peaceful Plateau loft",
  description:
    "Enjoy the best of Montreal in this romantic, bright & peaceful nest in Trendy Plateau !",
  neighborhood_overview:
    "The neighborhood is very lively while the street is very peaceful. It is also very safe and any time of day or night.",
  picture_url:
    "https://a0.muscache.com/pictures/26c20544-475f-4d69-9e99-53eeb6398ff0.jpg",
  host_name: "Sylvie",
  host_since: "2011-02-07",
  host_about:
    "Hope you enjoy this wonderfully lively yet peaceful Montreal area as much as we do !",
  host_is_superhost: "t" as "t" | "f",
  host_thumbnail_url:
    "https://a0.muscache.com/im/users/381468/profile_pic/1334793552/original.jpg?aki_policy=profile_small",
  neighbourhood_cleansed: "Le Plateau-Mont-Royal",
  host_location: "Montreal, Canada",
  property_type: "Entire rental unit",
  accommodates: 2,
  bathrooms_text: "1 bath",
  bedrooms: 1,
  beds: 2,
  amenities:
    '["Hair dryer", "Wifi", "Indoor fireplace", "Patio or balcony", "Dryer", "Kitchen", "TV with standard cable", "First aid kit", "Shampoo", "Free street parking", "Iron", "Cooking basics", "Hangers", "Air conditioning", "Heating", "Washer"]',
  price: 154.0,
  number_of_reviews: 52,
  review_scores_rating: 4.87,
  review_scores_cleanliness: 4.87,
  review_scores_checkin: 4.92,
  review_scores_communication: 4.9,
  review_scores_location: 4.88,
  review_scores_value: 4.77,
};

const PropertyDetailsPage = () => {
  return (
    <main className="container mx-auto px-8 py-12">
      <PropertyHeader property={dummyProperty} />
      <ImageGallery property={dummyProperty} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <PropertyInfo property={dummyProperty} />
        </div>
        <div>
          <BookingCard property={dummyProperty} />
        </div>
      </div>
      {/* Reviews, Map and Host Info sections would go here */}
    </main>
  );
};

export default PropertyDetailsPage;
