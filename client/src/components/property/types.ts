// src/components/property/types.ts

// This defines the shape of our property data object.
// Exporting it allows any component to import and use it for props.
export interface Property {
  id: string;
  name: string;
  description: string;
  neighborhood_overview: string;
  picture_url: string;
  host_name: string;
  host_since: string;
  host_about: string;
  host_is_superhost: "t" | "f";
  host_thumbnail_url: string;
  neighbourhood_cleansed: string;
  host_location: string;
  property_type: string;
  accommodates: number;
  bathrooms_text: string;
  bedrooms: number;
  beds: number;
  amenities: string; // This is a JSON string
  price: number;
  number_of_reviews: number;
  review_scores_rating: number;
  review_scores_cleanliness: number;
  review_scores_checkin: number;
  review_scores_communication: number;
  review_scores_location: number;
  review_scores_value: number;
}
