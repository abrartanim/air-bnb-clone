import React from "react";
import {
  FaStar,
  FaShare,
  FaHeart,
  FaUserCircle,
  FaMedal,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdOutlineDoorFront, MdOutlineKingBed } from "react-icons/md";

// --- DUMMY DATA ---
const dummyProperty = {
  id: "36301",
  name: "Romantic & peaceful Plateau loft",
  description:
    "Enjoy the best of Montreal in this romantic, bright & peaceful nest in Trendy Plateau !",
  neighborhood_overview:
    "The neighborhood is very lively while the street is very peaceful. It is also very safe and any time of day or night.",
  picture_url:
    "https://a0.muscache.com/pictures/26c20544-475f-4d69-9e99-53eeb6398ff0.jpg",
  host_name: "Sylvie",
  host_since: "2011-02-07",
  host_about:
    "Hope you enjoy this wonderfully lively yet peaceful Montreal area as much as we do !",
  host_is_superhost: "t",
  host_thumbnail_url:
    "https://a0.muscache.com/im/users/381468/profile_pic/1334793552/original.jpg?aki_policy=profile_small",
  neighbourhood_cleansed: "Le Plateau-Mont-Royal",
  host_location: "Montreal, Canada",
  property_type: "Entire rental unit",
  accommodates: 2,
  bathrooms_text: "1 bath",
  bedrooms: 1,
  beds: 2,
  amenities:
    '["Hair dryer", "Wifi", "Indoor fireplace", "Patio or balcony", "Dryer", "Kitchen", "TV with standard cable", "First aid kit", "Shampoo", "Free street parking", "Iron", "Cooking basics", "Hangers", "Air conditioning", "Heating", "Washer"]',
  price: 154.0, // Assuming price is a number
  number_of_reviews: 52,
  review_scores_rating: 4.87,
  review_scores_cleanliness: 4.87,
  review_scores_checkin: 4.92,
  review_scores_communication: 4.9,
  review_scores_location: 4.88,
  review_scores_value: 4.77,
};

// --- TYPE DEFINITION ---
type Property = typeof dummyProperty;

// --- SUB-COMPONENTS ---

const PropertyHeader = ({ property }: { property: Property }) => (
  <header className="mb-8">
    <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4 text-sm">
        <span className="flex items-center">
          <FaStar className="mr-1" /> {property.review_scores_rating}
        </span>
        <a href="#" className="underline font-semibold">
          {property.number_of_reviews} reviews
        </a>
        {property.host_is_superhost === "t" && (
          <span className="flex items-center">
            <FaMedal className="mr-1" /> Superhost
          </span>
        )}
        <a href="#" className="underline font-semibold">
          {property.neighbourhood_cleansed}, {property.host_location}
        </a>
      </div>
      <div className="flex items-center space-x-4">
        <button className="flex items-center underline p-2 rounded-md hover:bg-gray-100">
          <FaShare className="mr-2" /> Share
        </button>
        <button className="flex items-center underline p-2 rounded-md hover:bg-gray-100">
          <FaHeart className="mr-2" /> Save
        </button>
      </div>
    </div>
  </header>
);

const ImageGallery = ({ property }: { property: Property }) => (
  <div className="grid grid-cols-4 grid-rows-2 gap-2 mb-8 h-[400px]">
    <div className="col-span-2 row-span-2">
      <img
        src={property.picture_url}
        alt="Main view"
        className="w-full h-full object-cover rounded-l-lg"
      />
    </div>
    {/* Placeholder for other images */}
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

const BookingCard = ({ property }: { property: Property }) => (
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
        <input type="text" placeholder="Add date" className="w-full" />
      </div>
      <div className="p-3 border-l">
        <label className="text-xs font-semibold">CHECKOUT</label>
        <input type="text" placeholder="Add date" className="w-full" />
      </div>
      <div className="col-span-2 p-3 border-t">
        <label className="text-xs font-semibold">GUESTS</label>
        <input type="text" placeholder="1 guest" className="w-full" />
      </div>
    </div>
    <button className="w-full bg-pink-600 text-white font-bold py-3 rounded-lg hover:bg-pink-700 transition">
      Reserve
    </button>
    <p className="text-center text-sm text-gray-500 my-4">
      You won't be charged yet
    </p>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span>${property.price} x 5 nights</span>
        <span>${property.price * 5}</span>
      </div>
      <div className="flex justify-between">
        <span>Cleaning fee</span>
        <span>$50</span>
      </div>
      <div className="flex justify-between">
        <span>Airbnb service fee</span>
        <span>$120</span>
      </div>
    </div>
    <hr className="my-4" />
    <div className="flex justify-between font-bold text-lg">
      <span>Total</span>
      <span>${property.price * 5 + 50 + 120}</span>
    </div>
  </div>
);

const PropertyInfo = ({ property }: { property: Property }) => (
  <div>
    <div className="flex justify-between items-start pb-6 border-b">
      <div>
        <h2 className="text-2xl font-semibold">
          {property.property_type} hosted by {property.host_name}
        </h2>
        <p className="text-gray-600">
          {property.accommodates} guests · {property.bedrooms} bedroom ·{" "}
          {property.beds} bed · {property.bathrooms_text}
        </p>
      </div>
      <img
        src={property.host_thumbnail_url}
        alt={property.host_name}
        className="w-14 h-14 rounded-full"
      />
    </div>

    <div className="py-6 border-b space-y-4">
      <div className="flex items-start">
        <MdOutlineDoorFront className="text-2xl mr-4 mt-1" />
        <div>
          <h3 className="font-semibold">Self check-in</h3>
          <p className="text-gray-500">Check yourself in with the lockbox.</p>
        </div>
      </div>
      <div className="flex items-start">
        <FaMedal className="text-2xl mr-4 mt-1" />
        <div>
          <h3 className="font-semibold">{property.host_name} is a Superhost</h3>
          <p className="text-gray-500">
            Superhosts are experienced, highly rated Hosts.
          </p>
        </div>
      </div>
      <div className="flex items-start">
        <FaCalendarAlt className="text-2xl mr-4 mt-1" />
        <div>
          <h3 className="font-semibold">Free cancellation before 5 days.</h3>
        </div>
      </div>
    </div>

    <div className="py-6 border-b">
      <p>{property.description}</p>
    </div>

    <div className="py-6 border-b">
      <h2 className="text-2xl font-semibold mb-4">What this place offers</h2>
      <div className="grid grid-cols-2 gap-4">
        {JSON.parse(property.amenities)
          .slice(0, 10)
          .map((amenity: string) => (
            <div key={amenity} className="flex items-center">
              <MdOutlineKingBed className="text-xl mr-4" />
              <span>{amenity}</span>
            </div>
          ))}
      </div>
      <button className="mt-6 border border-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-100">
        Show all {JSON.parse(property.amenities).length} amenities
      </button>
    </div>
  </div>
);

// --- MAIN PAGE COMPONENT ---

const PropertyDetailsPage = () => {
  return (
    <main className="container mx-auto px-8 py-12">
      <PropertyHeader property={dummyProperty} />
      <ImageGallery property={dummyProperty} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <PropertyInfo property={dummyProperty} />
        </div>
        <div>
          <BookingCard property={dummyProperty} />
        </div>
      </div>
      {/* Reviews, Map and Host Info sections would go here */}
    </main>
  );
};

export default PropertyDetailsPage;
