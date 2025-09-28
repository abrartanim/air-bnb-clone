// src/components/property/ImageGallery.tsx

import React from "react";
import type { Property } from "./types"; // Import the shared type

interface Props {
  property: Property;
}

const ImageGallery: React.FC<Props> = ({ property }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-2 mb-8 md:h-[400px] h-[300px]">
    {/* Main Image */}
    <div className="col-span-1 md:col-span-2 md:row-span-2">
      <img
        src={property.picture_url}
        alt="Main view of the property"
        className="w-full h-full object-cover rounded-lg md:rounded-l-lg"
      />
    </div>

    {/* Hide additional images on smaller screens */}
    <img
      src={property.picture_url}
      alt="View 2"
      className="w-full h-full object-cover hidden md:block"
    />
    <img
      src={property.picture_url}
      alt="View 3"
      className="w-full h-full object-cover rounded-tr-lg hidden md:block"
    />
    <img
      src={property.picture_url}
      alt="View 4"
      className="w-full h-full object-cover hidden md:block"
    />
    <img
      src={property.picture_url}
      alt="View 5"
      className="w-full h-full object-cover rounded-br-lg hidden md:block"
    />
  </div>
);

export default ImageGallery;
