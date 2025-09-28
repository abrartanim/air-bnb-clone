import React from "react";
import type { Property } from "./types";
import { FaStar } from "react-icons/fa";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { BsChatDots } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

interface Props {
  property: Property;
}

const HostInfo: React.FC<Props> = ({ property }) => {
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

  return (
    <div className="py-8 mt-8 border-t">
      <h2 className="text-2xl font-semibold mb-6">Meet your host</h2>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-20">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Host Card is now a standard div, not a link */}
          <div className="p-6  rounded-2xl shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center text-center">
                <img
                  src={property.host_thumbnail_url}
                  alt={property.host_name}
                  className="w-24 h-24 rounded-full mb-2"
                />
                <h3 className="text-2xl font-bold">{property.host_name}</h3>
                <p className="text-gray-500 text-sm">Host</p>
              </div>
              <div className="flex flex-col space-y-3 pl-6 border-l self-stretch">
                <div>
                  <p className="font-bold text-lg">
                    {property.number_of_reviews}
                  </p>
                  <p className="text-sm text-gray-500">Reviews</p>
                </div>
                <hr />
                <div>
                  <p className="font-bold text-lg flex items-center">
                    {property.review_scores_rating.toFixed(2)}{" "}
                    <FaStar className="ml-1 text-sm" />
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
          </div>

          {/* Additional Host Info */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-3">
              <BsChatDots size={20} />
              <span className="text-gray-700">Speaks some language</span>
            </div>
            <div className="flex items-center space-x-3">
              <GoLocation size={20} />
              <span className="text-gray-700">
                Lives in {property.host_location}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          {/* Host Details */}
          <div>
            <h4 className="font-semibold">Host details</h4>
            <p className="text-gray-600 mt-2">
              Response rate: {property.host_response_rate}
            </p>
            <p className="text-gray-600 mt-1">
              Responds {property.host_response_time}
            </p>
          </div>

          <button className="mt-12 w-full bg-gray-100 text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
            Message host
          </button>

          <div className="flex items-start mt-4 text-xs text-gray-500">
            <IoShieldCheckmarkOutline
              size={24}
              className="mr-2 text-gray-700 flex-shrink-0"
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
