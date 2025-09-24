import { useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import "./App.css";
import "./index.css";

function App() {
  const products = [
    {
      imageSrc:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80",
      isGuestFavorite: true,
      location: "Kuala Lumpur",
      price: 57,
      nights: 2,
      rating: 4.87,
      type: "Apartment",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118f?auto=format&fit=crop&w=800&q=80",
      isGuestFavorite: false,
      location: "Bukit Bintang",
      price: 65,
      nights: 2,
      rating: 4.83,
      type: "Condo",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      isGuestFavorite: true,
      location: "Bukit Bintang",
      price: 79,
      nights: 2,
      rating: 4.87,
      type: "Apartment",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=800&q=80",
      isGuestFavorite: true,
      location: "Kuala Lumpur",
      price: 92,
      nights: 2,
      rating: 4.88,
      type: "Apartment",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1597047084897-51e81819a499?auto=format&fit=crop&w=800&q=80",
      isGuestFavorite: false,
      location: "Bukit Bintang",
      price: 115,
      nights: 2,
      rating: 4.97,
      type: "Apartment",
    },
    {
      imageSrc:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=800&q=80",
      isGuestFavorite: true,
      location: "Bukit Bintang",
      price: 96,
      nights: 2,
      rating: 4.95,
      type: "Apartment",
    },
  ];

  return (
    <div className="font-sans">
      {/* 2. Place the Header at the top of your app */}
      <Header />

      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Featured Stays</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
