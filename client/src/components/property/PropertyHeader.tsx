// src/components/property/PropertyHeader.tsx

import React from "react";
import { FaShare, FaRegHeart } from "react-icons/fa"; // Using FaRegHeart for an outline heart icon
import type { Property } from "./types"; // Import the shared type

interface Props {
  property: Property;
}

const PropertyHeader: React.FC<Props> = ({ property }) => (
  <header className="mb-6 flex justify-between items-center">
    <h1 className="text-xl md:text-2xl font-semibold">{property.name}</h1>
    <div className="flex items-center space-x-2 md:space-x-4">
      <button className="cursor-pointer flex items-center underline font-semibold text-sm p-2 rounded-md hover:bg-gray-100">
        <FaShare className="mr-0 md:mr-2" />{" "}
        <span className="hidden md:inline">Share</span>
      </button>
      <button className="cursor-pointer flex items-center underline font-semibold text-sm p-2 rounded-md hover:bg-gray-100">
        <FaRegHeart className="mr-0 md:mr-2" />{" "}
        <span className="hidden md:inline">Save</span>
      </button>
    </div>
  </header>
);

export default PropertyHeader;
