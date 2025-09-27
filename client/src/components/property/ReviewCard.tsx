// src/components/property/ReviewCard.tsx

import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoStar } from "react-icons/io5";

// Define the props for the component
export interface Review {
  name: string;
  joinDate: string;
  reviewDate: string;
  rating: number;
  text: string;
}

const ReviewCard: React.FC<Review> = ({
  name,
  joinDate,
  reviewDate,
  rating,
  text,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 160; // Characters to show before truncating

  // Toggle the expanded state
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  // Determine the text to display
  const displayText =
    isExpanded || text.length <= MAX_LENGTH
      ? text
      : `${text.substring(0, MAX_LENGTH)}...`;

  return (
    <div className="mb-6">
      {/* Header: Avatar, Name, Join Date */}
      <div className="flex items-center mb-2">
        <FaUserCircle className="text-4xl text-gray-500 mr-4" />
        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-gray-600">{joinDate}</p>
        </div>
      </div>

      {/* Rating and Review Date */}
      <div className="flex items-center mb-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <IoStar
              key={i}
              className={i < rating ? "text-black" : "text-gray-300"}
            />
          ))}
        </div>
        <p className="ml-3 text-sm font-semibold text-gray-800">{reviewDate}</p>
      </div>

      {/* Review Text with "Show more" button */}
      <div className="text-gray-900">
        <p>
          {displayText}
          {text.length > MAX_LENGTH && !isExpanded && (
            <button
              onClick={toggleExpanded}
              className="ml-1 font-semibold underline cursor-pointer"
            >
              Show more
            </button>
          )}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
