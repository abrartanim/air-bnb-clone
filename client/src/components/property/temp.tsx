// src/components/property/PropertyInfo.tsx

import React, { useState, useMemo } from "react";
import { FaStar, FaMedal } from "react-icons/fa";
import {
  MdOutlineDoorFront,
  MdOutlineKingBed,
  FaCalendarAlt,
} from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import type { Property } from "./types";

// --- The Modal Component ---
// This component is defined inside the main file for simplicity.
// It receives a function to close it and the full list of amenities.

interface ModalProps {
  onClose: () => void;
  amenities: string[];
}

const AmenitiesModal: React.FC<ModalProps> = ({ onClose, amenities }) => {
  return (
    // Backdrop
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside the modal
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <div className="p-6 sticky top-0 bg-white border-b">
          <button onClick={onClose} className="absolute left-6 top-6">
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-semibold text-center">
            What this place offers
          </h2>
        </div>
        <div className="p-8">
          {/* We can add categorization here in the future */}
          <div className="space-y-4">
            {amenities.map((amenity) => (
              <div key={amenity} className="flex items-center text-lg">
                <GoSmiley className="text-2xl mr-4" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- The Main Component ---

interface Props {
  property: Property;
}

const PropertyInfo: React.FC<Props> = ({ property }) => {
  // State to control the modal's visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parse amenities once to avoid re-parsing on every render
  const allAmenities = useMemo(
    () => JSON.parse(property.amenities || "[]"),
    [property.amenities]
  );

  const getHostingYears = () => {
    // ... (rest of the function is unchanged)
    if (!property.host_since) return 0;
    const hostSinceDate = new Date(property.host_since);
    const today = new Date();
    let years = today.getFullYear() - hostSinceDate.getFullYear();
    const monthDifference = today.getMonth() - hostSinceDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < hostSinceDate.getDate())
    ) {
      years--;
    }
    return years;
  };
  const hostingYears = getHostingYears();

  return (
    <>
      <div>
        {/* Host and Property Details */}
        <div className="pb-6 border-b">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-semibold">
                {property.property_type} in {property.host_location}
              </h2>
              <p className="text-gray-600">
                {property.beds} double bed · {property.bathrooms_text}
              </p>
              <div className="flex items-center mt-2">
                <FaStar className="mr-1" />
                <span className="font-semibold">
                  {property.review_scores_rating}
                </span>
                <span className="mx-1">·</span>
                <a href="#" className="underline font-semibold">
                  {property.number_of_reviews} reviews
                </a>
              </div>
            </div>
          </div>

          <hr className="my-6" />

          <div className="flex items-center">
            <img
              src={property.host_thumbnail_url}
              alt={property.host_name}
              className="w-12 h-12 rounded-full mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold">
                Stay with {property.host_name}
              </h3>
              <p className="text-gray-500">
                {property.host_is_superhost === "t" && "Superhost · "}
                {hostingYears} years hosting
              </p>
            </div>
          </div>
        </div>

        {/* Special Highlights */}
        <div className="py-6 border-b space-y-4">
          {/* ... (content is unchanged) */}
        </div>

        {/* Description */}
        <div className="py-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">About this place</h2>
          <p className="text-gray-800 leading-relaxed">
            {property.description}
          </p>
        </div>

        {/* Amenities */}
        <div className="py-6 border-b">
          <h2 className="text-2xl font-semibold mb-4">
            What this place offers
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {allAmenities.slice(0, 10).map((amenity: string) => (
              <div key={amenity} className="flex items-center">
                <GoSmiley className="text-xl mr-4" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsModalOpen(true)} // This now opens the modal
            className="mt-6 border border-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100"
          >
            Show all {allAmenities.length} amenities
          </button>
        </div>
      </div>

      {/* Conditionally render the modal */}
      {isModalOpen && (
        <AmenitiesModal
          amenities={allAmenities}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default PropertyInfo;
