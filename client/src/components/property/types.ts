// src/components/property/types.ts

export interface Property {
  id: string;
  listing_url: string;
  scrape_id: number;
  last_scraped: string;
  source: string;
  name: string;
  description: string;
  neighborhood_overview: string;
  picture_url: string;
  host_id: number;
  host_url: string;
  host_name: string;
  host_since: string;
  host_location: string;
  host_about: string;
  host_response_time: string;
  host_response_rate: string;
  host_acceptance_rate: string;
  host_is_superhost: "t" | "f";
  host_thumbnail_url: string;
  host_picture_url: string;
  host_neighbourhood: string;
  host_listings_count: number;
  host_total_listings_count: number;
  host_verifications: string; // JSON string
  host_has_profile_pic: "t" | "f";
  host_identity_verified: "t" | "f";
  neighbourhood: string;
  neighbourhood_cleansed: string;
  neighbourhood_group_cleansed: string;
  latitude: string;
  longitude: string;
  property_type: string;
  room_type: string;
  accommodates: number;
  bathrooms: number;
  bathrooms_text: string;
  bedrooms: number;
  beds: number;
  amenities: string; // JSON string
  price: number;
  minimum_nights: number;
  maximum_nights: number;
  minimum_minimum_nights: number;
  maximum_minimum_nights: number;
  minimum_maximum_nights: number;
  maximum_maximum_nights: number;
  minimum_nights_avg_ntm: number;
  maximum_nights_avg_ntm: number;
  calendar_updated: string;
  has_availability: "t" | "f";
  availability_30: number;
  availability_60: number;
  availability_90: number;
  availability_365: number;
  calendar_last_scraped: string;
  number_of_reviews: number;
  number_of_reviews_ltm: number;
  number_of_reviews_l30d: number;
  availability_eoy: number;
  number_of_reviews_ly: number;
  estimated_occupancy_l365d: number;
  estimated_revenue_l365d: number;
  first_review: string;
  last_review: string;
  review_scores_rating: number;
  review_scores_accuracy: number;
  review_scores_cleanliness: number;
  review_scores_checkin: number;
  review_scores_communication: number;
  review_scores_location: number;
  review_scores_value: number;
  license: string;
  instant_bookable: "t" | "f";
  calculated_host_listings_count: number;
  calculated_host_listings_count_entire_homes: number;
  calculated_host_listings_count_private_rooms: number;
  calculated_host_listings_count_shared_rooms: number;
  reviews_per_month: number;
}

export const propertyTypeMap: Record<string, 'string' | 'number'> = {
  // Numbers that can be null
  review_scores_rating: 'number',
  review_scores_accuracy: 'number',
  review_scores_cleanliness: 'number',
  review_scores_checkin: 'number',
  review_scores_communication: 'number',
  review_scores_location: 'number',
  review_scores_value: 'number',
  reviews_per_month: 'number',
  beds: 'number',
  bedrooms: 'number',
  bathrooms: 'number',

  // Strings that can be null
  neighborhood_overview: 'string',
  host_about: 'string',
  description: 'string',
};
