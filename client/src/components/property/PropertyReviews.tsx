// src/components/property/PropertyReviews.tsx

import React from "react";
import type { Property } from "./types";

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

const PropertyReviews: React.FC<Props> = ({ property }) => {
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
    <div className="py-8 border-t">
      <h2 className="text-2xl font-semibold flex items-center mb-8">
        <IoStar className="mr-3" />
        {property.review_scores_rating.toFixed(2)} ·{" "}
        {property.number_of_reviews} reviews
      </h2>

      {/* --- NEW: Single Grid Layout --- */}
      {/* A 7-column grid to hold all rating elements in one row */}
      <div className="grid grid-cols-7 items-center divide-x divide-gray-200">
        {/* Column 1: Overall Rating Bars (scaled down) */}
        <div className="col-span-1 pr-6">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">
            Overall rating
          </h3>
          {/* Using smaller fonts, thinner bars, and tighter spacing to scale */}
          <div className="space-y-1.5">
            {ratingDistribution.map(({ stars, percentage }) => (
              <div key={stars} className="flex items-center text-xs">
                <span className="w-3 text-gray-600">{stars}</span>
                <div className="w-full bg-gray-200 rounded-full h-1 mx-2">
                  <div
                    className="bg-black h-1 rounded-full"
                    style={{
                      width: `${percentage}%`,
                      minWidth: "2px", // Ensure even 0% is slightly visible
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columns 2-7: Category Ratings */}
        {/* Wrapped in a subgrid to take up the remaining 6 columns */}
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
    </div>
  );
};

export default PropertyReviews;
