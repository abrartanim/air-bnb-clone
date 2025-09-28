// src/components/property/PropertyReviews.tsx

import React, { useState } from "react";
import type { Property } from "./types";
import ReviewCard, { type Review } from "./ReviewCard"; // Import ReviewCard and its type
import ReviewModal from "./ReviewModal"; // Import the new modal

// Icons
import {
  IoStar,
  IoSparklesOutline,
  IoCheckmarkCircleOutline,
  IoKeyOutline,
  IoChatbubbleEllipsesOutline,
  IoLocationOutline,
  IoPricetagOutline,
} from "react-icons/io5";

interface Props {
  property: Property;
}

// Helper component for individual rating categories
const RatingCategory: React.FC<{
  icon: React.ReactNode;
  label: string;
  score: number;
}> = ({ icon, label, score }) => (
  <div className="text-center">
    <div>
      <p className="text-sm leading-tight">{label}</p>
      <p className="text-base font-semibold leading-tight mt-1">
        {score.toFixed(1)}
      </p>
    </div>
    <div className="mt-3 flex justify-center text-2xl text-gray-700">
      {icon}
    </div>
  </div>
);

// --- MOCK DATA FOR REVIEWS ---
const reviews: Review[] = [
  {
    name: "Elena & Natalia",
    joinDate: "11 years on Airbnb",
    reviewDate: "2 weeks ago",
    rating: 5,
    text: "We stayed there for a week. It's a very convenient place wherever you wanna move around the city. Walkable distance to Petronas Twin Towers, Menara Tower, Bukit Bintang and the beautiful park.",
  },
  {
    name: "John Doe",
    joinDate: "3 years on Airbnb",
    reviewDate: "1 month ago",
    rating: 4,
    text: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec velit neque, auctor sit amet aliquam vel, ullamcorper sit amet ligula. Curabitur non nulla sit amet nisl tempus.",
  },
  {
    name: "Jane Smith",
    joinDate: "New user",
    reviewDate: "3 days ago",
    rating: 5,
    text: "Nulla quis lorem ut libero malesuada feugiat. Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec rutrum congue leo eget malesuada. A fantastic stay, would highly recommend!",
  },
  {
    name: "Carlos",
    joinDate: "5 years on Airbnb",
    reviewDate: "1 month ago",
    rating: 5,
    text: "Pellentesque in ipsum id orci porta dapibus. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Vivamus suscipit tortor eget felis porttitor volutpat. The apartment was clean and spacious.",
  },
  {
    name: "Aisha",
    joinDate: "2 years on Airbnb",
    reviewDate: "2 months ago",
    rating: 3,
    text: "The location was great, but the apartment was smaller than expected. Curabitur aliquet quam id dui posuere blandit. Sed porttitor lectus nibh. It was a bit noisy at night but overall an okay experience.",
  },
  {
    name: "Kenji",
    joinDate: "7 years on Airbnb",
    reviewDate: "3 weeks ago",
    rating: 5,
    text: "Donec sollicitudin molestie malesuada. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus. Nulla porttitor accumsan tincidunt. Perfect for a business trip, very professional host.",
  },
  {
    name: "Fatima",
    joinDate: "1 year on Airbnb",
    reviewDate: "4 weeks ago",
    rating: 4,
    text: "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Cras ultricies ligula sed magna dictum porta. Proin eget tortor risus. The check-in process was smooth and the host was very responsive.",
  },
  {
    name: "David",
    joinDate: "6 years on Airbnb",
    reviewDate: "5 days ago",
    rating: 5,
    text: "Exceptional view from the balcony. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Will definitely come back again.",
  },
  {
    name: "Olivia",
    joinDate: "4 years on Airbnb",
    reviewDate: "2 months ago",
    rating: 4,
    text: "A cozy and comfortable place. Nulla quis lorem ut libero malesuada feugiat. The kitchen was well-equipped, which was a huge plus for us as we love to cook our own meals during travels.",
  },
  {
    name: "Mohammed",
    joinDate: "8 years on Airbnb",
    reviewDate: "3 months ago",
    rating: 5,
    text: "Quisque velit nisi, pretium ut lacinia in, elementum id enim. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. The host provided excellent local recommendations.",
  },
  {
    name: "Isabella",
    joinDate: "New user",
    reviewDate: "1 week ago",
    rating: 5,
    text: "From the moment we walked in, it felt like home. The decor is stylish and modern, and the entire apartment was spotless. Couldn't have asked for a better experience for our first booking!",
  },
  {
    name: "Liam",
    joinDate: "3 years on Airbnb",
    reviewDate: "6 days ago",
    rating: 4,
    text: "Great value for the price. The location is unbeatable, with easy access to public transport and major attractions. The Wi-Fi was a bit slow at times, but it wasn't a major issue for us.",
  },
];

const PropertyReviews: React.FC<Props> = ({ property }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reviewCategories = [
    {
      label: "Cleanliness",
      score: property.review_scores_cleanliness,
      icon: <IoSparklesOutline />,
    },
    {
      label: "Accuracy",
      score: property.review_scores_accuracy,
      icon: <IoCheckmarkCircleOutline />,
    },
    {
      label: "Check-in",
      score: property.review_scores_checkin,
      icon: <IoKeyOutline />,
    },
    {
      label: "Communication",
      score: property.review_scores_communication,
      icon: <IoChatbubbleEllipsesOutline />,
    },
    {
      label: "Location",
      score: property.review_scores_location,
      icon: <IoLocationOutline />,
    },
    {
      label: "Value",
      score: property.review_scores_value,
      icon: <IoPricetagOutline />,
    },
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 89 },
    { stars: 4, percentage: 9 },
    { stars: 3, percentage: 1 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 1 },
  ];

  return (
    <>
      <div className="py-8 border-t">
        <h2 className="text-2xl font-semibold flex items-center mb-8">
          <IoStar className="mr-3" />
          {property.review_scores_rating.toFixed(2)} ·{" "}
          {property.number_of_reviews} reviews
        </h2>

        {/* --- Ratings Grid --- */}
        <div className="hidden md:grid grid-cols-7 items-center divide-x divide-gray-200">
          <div className="col-span-1 pr-6">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">
              Overall rating
            </h3>
            <div className="space-y-1.5">
              {ratingDistribution.map(({ stars, percentage }) => (
                <div key={stars} className="flex items-center text-xs">
                  <span className="w-3 text-gray-600">{stars}</span>
                  <div className="w-full bg-gray-200 rounded-full h-1 mx-2">
                    <div
                      className="bg-black h-1 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        minWidth: "2px",
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-span-6 grid grid-cols-6 divide-x divide-gray-200">
            {reviewCategories.map((cat) => (
              <RatingCategory
                key={cat.label}
                label={cat.label}
                score={cat.score}
                icon={cat.icon}
              />
            ))}
          </div>
        </div>

        {/* Individual Reviews Section */}
        <div className="mt-12 md:mt-8 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {reviews.slice(0, 6).map(
              (
                review,
                index // Show first 6 reviews
              ) => (
                <ReviewCard key={index} {...review} />
              )
            )}
          </div>
          {/* Button to open the modal */}
          <div className="mt-6">
            <button
              onClick={() => setIsModalOpen(true)}
              className="border border-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Show all {property.number_of_reviews} reviews
            </button>
          </div>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && (
        <ReviewModal
          property={property}
          reviews={reviews}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PropertyReviews;
