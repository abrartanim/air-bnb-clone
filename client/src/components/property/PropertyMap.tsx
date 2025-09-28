// src/components/property/PropertyMap.tsx

import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import { renderToString } from "react-dom/server";
import { IoHome } from "react-icons/io5";

// You must import the Leaflet CSS for the map to render correctly
import "leaflet/dist/leaflet.css";

import type { Property } from "./types";

interface Props {
  property: Property;
}

const PropertyMap: React.FC<Props> = ({ property }) => {
  // Convert latitude and longitude strings to numbers for the map
  const position: [number, number] = [
    parseFloat(property.latitude),
    parseFloat(property.longitude),
  ];

  // Create a custom marker icon to match the image
  const customIcon = new L.DivIcon({
    html: renderToString(
      <div className="p-2 bg-black text-white rounded-full shadow-lg flex items-center justify-center">
        <IoHome size={24} />
      </div>
    ),
    className: "", // Prevents default leaflet styling
    iconSize: [40, 40],
    iconAnchor: [20, 40], // Anchors the icon bottom-center to the location
  });

  return (
    <div className="py-8 mt-8 border-t relative z-0">
      <h2 className="text-2xl font-semibold mb-6">Where you'll be</h2>

      {/* Map Display */}
      <div className="h-[480px] w-full md:w-2/3 mx-auto rounded-xl overflow-hidden mb-6 ">
        <MapContainer
          center={position}
          zoom={14}
          scrollWheelZoom={false}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={customIcon} />
        </MapContainer>
      </div>

      {/* Location Details */}
      <div>
        <h3 className="font-semibold text-lg">{property.host_location}</h3>
        <p className="text-gray-600 mt-2">{property.neighborhood_overview}</p>
        <button className="mt-4 font-semibold underline hover:text-black">
          Show more &gt;
        </button>
      </div>
    </div>
  );
};

export default PropertyMap;
