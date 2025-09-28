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
    <div className="relative w-full rounded-xl overflow-hidden cursor-pointer">
      <div className="relative h-48">
        <LazyLoadImage
          src={imageSrc}
          alt={`${type} in ${location}`}
          effect="blur" // adds a blur placeholder while loading
          width="100%"
          height="100%"
          className="object-cover w-full h-48 rounded-xl"
          afterLoad={() => ScrollTrigger.refresh()} // refresh GSAP after image loads
        />
        {isGuestFavorite && (
          <span className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
            Guest favorite
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 rounded-full hover:text-red-500 transition-colors">
          <FaRegHeart className="text-white text-xl" />
          <a href="#"></a>
        </button>
      </div>
      <div className="p-1">
        <h4 className="text-sm font-semibold text-gray-800">
          {type} in {location}
        </h4>
        <p className="text-gray-600 mt-1 text-sm flex items-center gap-2">
          <span>
            ${price} for {nights} nights
          </span>
          <span className="select-none">•</span>
          <FaStar className="text-yellow-500 text-sm leading-none" />
          <span>{rating.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
