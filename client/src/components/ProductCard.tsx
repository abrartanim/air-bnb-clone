// src/components/ProductCard.tsx
import React from "react";
import { FaStar, FaRegHeart } from "react-icons/fa";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ProductCardProps {
  imageSrc: string;
  isGuestFavorite: boolean;
  location: string;
  price: number;
  nights: number;
  rating: number;
  type: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageSrc,
  isGuestFavorite,
  location,
  price,
  nights,
  rating,
  type,
}) => {
  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer">
      <div className="relative h-48">
        <LazyLoadImage
          src={imageSrc}
          alt={`${type} in ${location}`}
          effect="blur" // adds a blur placeholder while loading
          width="100%"
          height="100%"
          className="object-cover w-full h-48"
          afterLoad={() => ScrollTrigger.refresh()} // refresh GSAP after image loads
        />
        {isGuestFavorite && (
          <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Guest favorite
          </span>
        )}
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:text-red-500 transition-colors">
          <FaRegHeart className="text-gray-700 text-lg" />
        </button>
      </div>
      <div className="p-4">
        <h3 className="text-md font-semibold text-gray-800">
          {type} in {location}
        </h3>
        <p className="text-gray-600 mt-1 text-sm">
          ${price} for {nights} nights <span className="mx-1">•</span>{" "}
          <FaStar className="inline text-yellow-500 mr-1" />
          {rating.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
