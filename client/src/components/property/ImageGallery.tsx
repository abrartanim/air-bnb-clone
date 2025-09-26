// src/components/property/ImageGallery.tsx

import React from "react";
import type { Property } from "./types"; // Import the shared type

interface Props {
  property: Property;
}

const ImageGallery: React.FC<Props> = ({ property }) => (
  <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-[400px]">
    {/* Main Image */}
    <div className="col-span-2 row-span-2">
      <img
        src={property.picture_url}
        alt="Main view of the property"
        className="w-full h-full object-cover rounded-l-lg"
      />
    </div>

    {/* Placeholder for additional images. In a real app, you'd map over an array of image URLs. */}
    <img
      src={property.picture_url}
      alt="View 2"
      className="w-full h-full object-cover"
    />
    <img
      src={property.picture_url}
      alt="View 3"
      className="w-full h-full object-cover rounded-tr-lg"
    />
    <img
      src={property.picture_url}
      alt="View 4"
      className="w-full h-full object-cover"
    />
    <img
      src={property.picture_url}
      alt="View 5"
      className="w-full h-full object-cover rounded-br-lg"
    />
  </div>
);

export default ImageGallery;
