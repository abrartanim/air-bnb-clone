import { useState } from "react";
import Header from "./components/Header";
import "./App.css";
import "./index.css";

function App() {
  return (
    <div className="font-sans">
      {/* 2. Place the Header at the top of your app */}
      <Header />

      {/* 3. Add main content to make the page scrollable */}
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-4">Page Content</h1>
        <p>Scroll down to see the header transform.</p>

        {/* Placeholder content to create a long page for scrolling */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="bg-gray-200 h-60 rounded-xl animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-3/4 rounded animate-pulse"></div>
              <div className="bg-gray-200 h-4 w-1/2 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
