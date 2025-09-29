import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import type { Property } from "./types";
import { type Review } from "./ReviewCard";
import { IoClose, IoStar, IoSearchOutline } from "react-icons/io5";
import {
  IoSparklesOutline,
  IoCheckmarkCircleOutline,
  IoKeyOutline,
  IoChatbubbleEllipsesOutline,
  IoLocationOutline,
  IoPricetagOutline,
} from "react-icons/io5";
import ReviewCard from "./ReviewCard";

// Define the component's props
interface ModalProps {
  onClose: () => void;
  property: Property;
  reviews: Review[];
}

// RatingCategory component (horizontal flex layout)
const RatingCategory: React.FC<{
  icon: React.ReactNode;
  label: string;
  score: number;
}> = ({ icon, label, score }) => (
  <div className="flex justify-between items-center w-full">
    <div className="flex items-center">
      <div className="text-2xl mr-4 text-gray-800">{icon}</div>
      <span className="text-gray-800">{label}</span>
    </div>
    <span className="font-semibold">{score.toFixed(1)}</span>
  </div>
);

const ReviewsModal: React.FC<ModalProps> = ({ onClose, property, reviews }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Data for ratings
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

  // Animation hooks
  useEffect(() => {
    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3 }
    );
    gsap.fromTo(
      modalRef.current,
      { opacity: 0, scale: 0.95, y: -20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "power2.out" }
    );
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, {
      opacity: 0,
      scale: 0.95,
      y: -20,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center"
    >
      <div
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        className="bg-white md:rounded-xl shadow-2xl w-full h-full md:max-w-4xl md:h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-4 rounded-3xl sticky top-0 bg-white z-10">
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto md:flex md:overflow-hidden">
          {/* Left Column */}
          <div className="p-6 border-b md:border-b-0 md:border-r md:w-1/3">
            <div>
              <h2 className="text-2xl font-bold flex items-center mb-4">
                <IoStar className="mr-2" />
                {property.review_scores_rating.toFixed(2)}
              </h2>
              {/* Section 1: Overall Rating */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-800 mb-3 text-base">
                  Overall rating
                </h3>
                <div className="space-y-1">
                  {ratingDistribution.map(({ stars, percentage }) => (
                    <div key={stars} className="flex items-center text-xs">
                      <span className="w-3 text-gray-600">{stars}</span>
                      <div className="w-full bg-gray-200 rounded-full h-1 mx-2">
                        <div
                          className="bg-black h-1 rounded-full"
                          style={{ width: `${percentage}%`, minWidth: "2px" }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Section 2: Individual Categories in a vertical list */}
              <div className="space-y-4 pt-4 text-sm">
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

          {/* Right Column (Scrollable) */}
          <div className="p-6 md:w-2/3 md:flex-1 md:overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">
                {property.number_of_reviews} reviews
              </h3>
              <div className="relative">
                <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews"
                  className="pl-9 pr-3 py-2 rounded-full bg-gray-100 focus:bg-white focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
            <div className="space-y-8 text-sm">
              {reviews.map((review, index) => (
                <ReviewCard key={index} {...review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal;
