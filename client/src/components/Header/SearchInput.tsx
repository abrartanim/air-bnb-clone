import React from "react";
import { FaSearch } from "react-icons/fa"; // Assuming you have react-icons installed

interface SearchInputProps {
  isScrolled: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ isScrolled }) => {
  if (isScrolled) {
    return (
      <div className="flex items-center space-x-2 rounded-full border border-gray-200 shadow-md py-2 px-4 transition-all duration-300 ease-in-out">
        <button className="text-sm font-semibold px-4 py-1 cursor-pointer">
          Anywhere
        </button>
        <div className="h-6 w-px bg-gray-200" />
        <button className="text-sm px-4 py-1 cursor-pointer">Anytime</button>
        <div className="h-6 w-px bg-gray-200" />
        <button className="text-sm text-gray-600 px-4 py-1 cursor-pointer">
          Add guests
        </button>
        <div className="ml-2 bg-rose-500 text-white p-2 rounded-full cursor-pointer">
          <FaSearch className="h-4 w-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-2xl bg-white rounded-full shadow-lg border border-gray-200 transition-all duration-300 ease-in-out">
      <div className="flex-1 py-3 px-6 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200">
        <p className="font-semibold text-sm">Where</p>
        <p className="text-gray-600 text-xs">Search destinations</p>
      </div>
      <div className="hidden md:block h-8 w-px bg-gray-200" />
      <div className="flex-1 py-3 px-6 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200">
        <p className="font-semibold text-sm">Check in</p>
        <p className="text-gray-600 text-xs">Add dates</p>
      </div>
      <div className="hidden md:block h-8 w-px bg-gray-200" />
      <div className="flex-1 py-3 px-6 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200">
        <p className="font-semibold text-sm">Check out</p>
        <p className="text-gray-600 text-xs">Add dates</p>
      </div>
      <div className="hidden md:block h-8 w-px bg-gray-200" />
      <div className="flex-1 flex items-center justify-between py-3 pl-6 pr-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors duration-200">
        <div>
          <p className="font-semibold text-sm">Who</p>
          <p className="text-gray-600 text-xs">Add guests</p>
        </div>
        <div className="bg-rose-500 text-white p-4 rounded-full">
          <FaSearch className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
