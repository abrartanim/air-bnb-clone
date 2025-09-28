import React from "react";
import { FaStar } from "react-icons/fa";
import type { Property } from "./types";
import { format } from "date-fns";

interface Props {
  property: Property;
  startDate: Date | null;
  endDate: Date | null;
  nights: number;
}

const BookingCard: React.FC<Props> = ({
  property,
  startDate,
  endDate,
  nights,
}) => {
  const total = nights > 0 ? property.price * nights : 0;

  return (
    <div className="sticky top-24 p-6 border rounded-xl shadow-lg">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-2xl font-bold">${property.price}</span>
          <span className="text-gray-600"> night</span>
        </div>
        <div className="flex items-center text-sm">
          <FaStar className="mr-1" /> {property.review_scores_rating}
          <span className="text-gray-500 ml-1">
            ({property.number_of_reviews} reviews)
          </span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-px border rounded-lg mb-4">
        <div className="p-3">
          <label className="text-xs font-semibold">CHECK-IN</label>
          <input
            type="text"
            readOnly
            value={startDate ? format(startDate, "MM/dd/yyyy") : ""}
            placeholder="Add date"
            className="w-full outline-none bg-transparent"
          />
        </div>
        <div className="p-3 border-l">
          <label className="text-xs font-semibold">CHECKOUT</label>
          <input
            type="text"
            readOnly
            value={endDate && nights > 0 ? format(endDate, "MM/dd/yyyy") : ""}
            placeholder="Add date"
            className="w-full outline-none bg-transparent"
          />
        </div>
        <div className="col-span-2 p-3 border-t">
          <label className="text-xs font-semibold">GUESTS</label>
          <input
            type="text"
            placeholder="1 guest"
            className="w-full outline-none bg-transparent"
          />
        </div>
      </div>
      <button className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition">
        Reserve
      </button>

      {nights > 0 && (
        <>
          <p className="text-center text-sm text-gray-500 my-4">
            You won't be charged yet
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>
                ${property.price} x {nights} {nights === 1 ? "night" : "nights"}
              </span>
              <span>${total}</span>
            </div>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default BookingCard;
