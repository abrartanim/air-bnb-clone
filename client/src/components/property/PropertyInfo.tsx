// src/components/property/PropertyInfo.tsx

import React, { useEffect, useState, useMemo, useRef } from "react";
import { FaStar, FaMedal, FaCalendarAlt } from "react-icons/fa";
import { MdOutlineDoorFront } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import type { Property } from "./types";
import { gsap } from "gsap";

interface ModalProps {
  onClose: () => void;
  amenities: string[];
}

const AmenitiesModal: React.FC<ModalProps> = ({ onClose, amenities }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Animate when component mounts
  useEffect(() => {
    const backdrop = backdropRef.current;
    const modal = modalRef.current;

    gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3 });

    gsap.fromTo(
      modal,
      { opacity: 0, scale: 0.9, y: -50 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
    );
  }, []);

  // Close animation handler
  const handleClose = () => {
    const backdrop = backdropRef.current;
    const modal = modalRef.current;

    gsap.to(modal, {
      opacity: 0,
      scale: 0.9,
      y: -50,
      duration: 0.3,
      ease: "power3.in",
    });

    gsap.to(backdrop, {
      opacity: 0,
      duration: 0.3,
      onComplete: onClose, // call parent onClose after animation finishes
    });
  };

  return (
    // Backdrop
    <div
      ref={backdropRef}
      onClick={handleClose}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center"
    >
      {/* Modal Box */}
      <div
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
        // Added overflow-hidden to clip the child elements
        className="bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col mb-20 overflow-hidden"
      >
        {/* Header */}
        {/* Removed redundant rounded-t-xl from child */}
        <div className="p-6  top-0 bg-white  relative z-10">
          <button
            onClick={handleClose}
            className="absolute left-6 top-6 cursor-pointer"
          >
            <IoClose size={24} />
          </button>
          <h2 className="text-2xl font-semibold mt-15">
            What this place offers
          </h2>
        </div>

        {/* Scrollable body */}
        {/* Removed redundant rounded-b-xl from child */}
        <div className="p-3 overflow-y-auto flex-2">
          <div className="space-y-4">
            {amenities.map((amenity) => (
              <div
                key={amenity}
                // Add padding and a bottom border to each item
                className="flex items-center text-lg pb-4 border-b border-gray-200"
              >
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

  // Function to calculate hosting years
  const getHostingYears = () => {
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
        {/* Host and Property Details - NEW STRUCTURE */}
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

        {/* Special Highlights (Kept from previous version) */}
        <div className="py-6 border-b space-y-4">
          <div className="flex items-start">
            <MdOutlineDoorFront className="text-2xl mr-4 mt-1" />
            <div>
              <h3 className="font-semibold">Self check-in</h3>
              <p className="text-gray-500">
                Check yourself in with the lockbox.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaMedal className="text-2xl mr-4 mt-1" />
            <div>
              <h3 className="font-semibold">
                {property.host_name} is a Superhost
              </h3>
              <p className="text-gray-500">
                Superhosts are experienced, highly rated Hosts.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <FaCalendarAlt className="text-2xl mr-4 mt-1" />
            <div>
              <h3 className="font-semibold">
                Free cancellation before 5 days.
              </h3>
            </div>
          </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
