// src/pages/PropertyDetailsPage.tsx

import React from "react";

// Import all the new components
import PropertyHeader from "../components/property/PropertyHeader";
import ImageGallery from "../components/property/ImageGallery";
import PropertyInfo from "../components/property/PropertyInfo";
import BookingCard from "../components/property/BookingCard";
import DatePicker from "../components/DatePicker";
import PropertyReviews from "../components/property/PropertyReviews";
import PropertyMap from "../components/property/PropertyMap";
// The dummy data remains here for now.
// In a real app, you would fetch this from your API.
const dummyProperty = {
  id: "36301",
  listing_url: "https://www.airbnb.com/rooms/36301",
  scrape_id: 20250615022705,
  last_scraped: "2025-06-26",
  source: "city scrape",
  name: "Romantic & peaceful Plateau  loft",
  description:
    "Enjoy the best of Montreal  in this romantic, bright & peaceful nest in Trendy Plateau !",
  neighborhood_overview:
    "The neighborhood is very lively while the street is very peaceful. It is also very safe and any time of day or night.",
  picture_url:
    "https://a0.muscache.com/pictures/26c20544-475f-4d69-9e99-53eeb6398ff0.jpg",
  host_id: 381468,
  host_url: "https://www.airbnb.com/users/show/381468",
  host_name: "Sylvie",
  host_since: "2011-02-07",
  host_location: "Montreal, Canada",
  host_about:
    "Hope you enjoy this wonderfully lively yet peaceful Montreal area as much as we do !\n\n\n   ",
  host_response_time: "within a day",
  host_response_rate: "90%",
  host_acceptance_rate: "56%",
  host_is_superhost: "t" as "t" | "f",
  host_thumbnail_url:
    "https://a0.muscache.com/im/users/381468/profile_pic/1334793552/original.jpg?aki_policy=profile_small",
  host_picture_url:
    "https://a0.muscache.com/im/users/381468/profile_pic/1334793552/original.jpg?aki_policy=profile_x_medium",
  host_neighbourhood: "Le Plateau",
  host_listings_count: 8,
  host_total_listings_count: 11,
  host_verifications: "['email', 'phone']",
  host_has_profile_pic: "t" as "t" | "f",
  host_identity_verified: "t" as "t" | "f",
  neighbourhood: "Neighborhood highlights",
  neighbourhood_cleansed: "Le Plateau-Mont-Royal",
  neighbourhood_group_cleansed: "",
  latitude: "45.53026",
  longitude: "-73.58413",
  property_type: "Entire rental unit",
  room_type: "Entire home/apt",
  accommodates: 2,
  bathrooms: 1,
  bathrooms_text: "1 bath",
  bedrooms: 1,
  beds: 2,
  amenities:
    '["Hair dryer", "Wifi", "Indoor fireplace", "Patio or balcony", "Dryer", "Extra pillows and blankets", "Kitchen", "TV with standard cable", "First aid kit", "Stove", "Shampoo", "Free street parking", "Oven", "Iron", "Cooking basics", "Essentials", "Hangers", "Bed linens", "Air conditioning", "Heating", "Refrigerator", "Coffee maker", "Fire extinguisher", "Pets allowed", "Smoke alarm", "Dishes and silverware", "Hot water", "Microwave", "Washer"]',
  price: 154.0,
  minimum_nights: 210,
  maximum_nights: 730,
  minimum_minimum_nights: 210,
  maximum_minimum_nights: 210,
  minimum_maximum_nights: 730,
  maximum_maximum_nights: 730,
  minimum_nights_avg_ntm: 210,
  maximum_nights_avg_ntm: 730,
  calendar_updated: "",
  has_availability: "t" as "t" | "f",
  availability_30: 0,
  availability_60: 0,
  availability_90: 21,
  availability_365: 295,
  calendar_last_scraped: "2025-06-26",
  number_of_reviews: 52,
  number_of_reviews_ltm: 1,
  number_of_reviews_l30d: 0,
  availability_eoy: 120,
  number_of_reviews_ly: 2,
  estimated_occupancy_l365d: 255,
  estimated_revenue_l365d: 39270,
  first_review: "2015-05-25",
  last_review: "2024-08-31",
  review_scores_rating: 4.87,
  review_scores_accuracy: 4.88,
  review_scores_cleanliness: 4.87,
  review_scores_checkin: 4.92,
  review_scores_communication: 4.9,
  review_scores_location: 4.88,
  review_scores_value: 4.77,
  license: "",
  instant_bookable: "f" as "t" | "f",
  calculated_host_listings_count: 8,
  calculated_host_listings_count_entire_homes: 8,
  calculated_host_listings_count_private_rooms: 0,
  calculated_host_listings_count_shared_rooms: 0,
  reviews_per_month: 0.42,
};

const PropertyDetailsPage = () => {
  return (
    <main className="container mx-auto px-8 py-12">
      <PropertyHeader property={dummyProperty} />
      <ImageGallery property={dummyProperty} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <PropertyInfo property={dummyProperty} />
          <div className="mt-1 pt-4 pl-3 ">
            <DatePicker />
          </div>
        </div>
        <div>
          <BookingCard property={dummyProperty} />
        </div>
      </div>

      {/* Reviews, Map and Host Info sections would go here */}
      <PropertyReviews property={dummyProperty} />
      <PropertyMap property={dummyProperty} />
    </main>
  );
};

export default PropertyDetailsPage;
