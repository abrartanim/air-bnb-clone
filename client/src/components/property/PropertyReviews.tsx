import React from "react";
import type { Property } from "./types"; // Make sure the path is correct

// Icons
import { FaStar } from "react-icons/fa";
import { LuSparkles } from "react-icons/lu";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LiaKeySolid } from "react-icons/lia";
import { BsChatDots } from "react-icons/bs";
import { HiOutlineMapPin } from "react-icons/hi2";
import { IoPricetagOutline } from "react-icons/io5";

interface Props {
  property: Property;
}

// Helper component for individual rating categories
const RatingCategory: React.FC<{
  icon: React.ReactNode;
  label: string;
  score: number;
}> = ({ icon, label, score }) => (
  <div>
    <div className="flex justify-between items-center">
      <div>
        <div className="text-3xl mb-1">{icon}</div>
        <p className="font-semibold">{label}</p>
        <p className="text-gray-600">{score.toFixed(1)}</p>
      </div>
    </div>
  </div>
);

const PropertyReviews: React.FC<Props> = ({ property }) => {
  // Data for the six rating categories
  const reviewCategories = [
    {
      label: "Cleanliness",
      score: property.review_scores_cleanliness,
      icon: <LuSparkles />,
    },
    {
      label: "Accuracy",
      score: property.review_scores_accuracy,
      icon: <IoIosCheckmarkCircleOutline />,
    },
    {
      label: "Check-in",
      score: property.review_scores_checkin,
      icon: <LiaKeySolid />,
    },
    {
      label: "Communication",
      score: property.review_scores_communication,
      icon: <BsChatDots />,
    },
    {
      label: "Location",
      score: property.review_scores_location,
      icon: <HiOutlineMapPin />,
    },
    {
      label: "Value",
      score: property.review_scores_value,
      icon: <IoPricetagOutline />,
    },
  ];

  // This calculates the width of the 5-star bar based on the average rating.
  // The other bars are set to a small default value as we don't have distribution data.
  const ratingDistribution = [
    {
      stars: 5,
      percentage: (property.review_scores_rating / 5) * 100,
    },
    { stars: 4, percentage: 8 }, // Placeholder value
    { stars: 3, percentage: 2 }, // Placeholder value
    { stars: 2, percentage: 1 }, // Placeholder value
    { stars: 1, percentage: 3 }, // Placeholder value
  ];

  return (
    <div className="py-8 border-t">
      <h2 className="text-2xl font-semibold flex items-center mb-6">
        <FaStar className="mr-3" />
        {property.review_scores_rating.toFixed(2)} ·{" "}
        {property.number_of_reviews} reviews
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Side: Overall Rating Bars */}
        <div className="space-y-3">
          <p className="font-semibold text-lg">Overall rating</p>
          {ratingDistribution.map(({ stars, percentage }) => (
            <div key={stars} className="flex items-center text-sm">
              <span className="w-4">{stars}</span>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mx-4">
                <div
                  className="bg-black h-1.5 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Category Ratings */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
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
