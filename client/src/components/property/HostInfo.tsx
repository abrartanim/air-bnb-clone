// src/components/property/HostInfo.tsx

import React from "react";
import type { Property } from "./types";
import { FaStar, FaMedal } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

interface Props {
  property: Property;
}

const HostInfo: React.FC<Props> = ({ property }) => {
  // Function to calculate hosting years from the 'host_since' date
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

  const isSuperhost = property.host_is_superhost === "t";

  return (
    <div className="py-8 mt-8 border-t">
      <h2 className="text-2xl font-semibold mb-6">Meet your host</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2">
          {/* Host Card */}
          <div className="flex items-center space-x-6 border p-6 rounded-2xl shadow-sm">
            <div className="relative">
              <img
                src={property.host_thumbnail_url}
                alt={property.host_name}
                className="w-24 h-24 rounded-full"
              />
              {isSuperhost && (
                <div className="absolute -bottom-1 -right-1 bg-red-500 p-1.5 rounded-full text-white">
                  <FaMedal size={20} />
                </div>
              )}
            </div>
            <div className="flex-grow">
              <h3 className="text-2xl font-bold">{property.host_name}</h3>
              {isSuperhost && (
                <p className="text-gray-500 font-semibold">Superhost</p>
              )}
            </div>
            <div className="text-center pl-6 border-l space-y-3">
              <div>
                <p className="font-bold text-lg">
                  {property.number_of_reviews}
                </p>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
              <hr />
              <div>
                <p className="font-bold text-lg flex items-center justify-center">
                  {property.review_scores_rating.toFixed(1)}{" "}
                  <FaStar className="ml-1" />
                </p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
              <hr />
              <div>
                <p className="font-bold text-lg">{getHostingYears()}</p>
                <p className="text-sm text-gray-500">Years hosting</p>
              </div>
            </div>
          </div>

          {/* Host About Section */}
          <div className="mt-6">
            <p className="text-gray-700 leading-relaxed">
              {property.host_about}
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="pl-4">
          {isSuperhost && (
            <>
              <h3 className="text-lg font-semibold">
                {property.host_name} is a Superhost
              </h3>
              <p className="text-gray-600 mt-1">
                Superhosts are experienced, highly rated hosts who are committed
                to providing great stays for guests.
              </p>
            </>
          )}

          <div className="mt-6">
            <h4 className="text-lg font-semibold">Host details</h4>
            <p className="text-gray-600 mt-2">
              Response rate: {property.host_response_rate}
            </p>
            <p className="text-gray-600 mt-1">
              Responds {property.host_response_time}
            </p>
          </div>

          <button className="mt-6 w-full border border-black text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
            Message host
          </button>

          <div className="flex items-start mt-4 text-xs text-gray-500">
            <IoShieldCheckmarkOutline
              size={28}
              className="mr-2 text-red-500 flex-shrink-0"
            />
            <span>
              To protect your payment, always use Airbnb to send money and
              communicate with hosts.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostInfo;
