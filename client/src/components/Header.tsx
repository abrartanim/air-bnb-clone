import React, { useLayoutEffect, useRef } from "react";
import { FaGlobe, FaBars } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // <-- 1. Import the plugin
import SearchInput from "./Header/SearchInput";
import logo from "../assets/logo.png";

// 2. Register both plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Header: React.FC = () => {
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // A simple flag to prevent the lock animation from re-triggering itself
      let isAnimating = false;

      ScrollTrigger.create({
        trigger: document.body,
        start: 80, // Fire events at this scroll position
        end: "bottom top",

        // When scrolling DOWN past 80px
        onEnter: () => {
          if (isAnimating) return;
          isAnimating = true;

          // First, update the class
          headerRef.current?.classList.add("is-scrolled");

          // Then, animate the scrollbar to a "locked" position
          gsap.to(window, {
            scrollTo: { y: 120, autoKill: false }, // Nudge scroll down to 120px
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              isAnimating = false;
            },
          });
        },

        // When scrolling UP past 80px
        onLeaveBack: () => {
          if (isAnimating) return;
          isAnimating = true;

          // Update the class
          headerRef.current?.classList.remove("is-scrolled");

          // Animate the scrollbar back up to a "locked" position
          gsap.to(window, {
            scrollTo: { y: 40, autoKill: false }, // Nudge scroll up to 40px
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => {
              isAnimating = false;
            },
          });
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  // Your JSX remains exactly the same as before
  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full bg-white shadow-sm group"
    >
      <div className="container mx-auto px-8 transition-all duration-300 ease-in-out py-4 group-[.is-scrolled]:py-2">
        {/* Top row */}
        <div className="flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <img
              src={logo}
              className="h-8 w-auto cursor-pointer"
              alt="Airbnb logo"
            />
          </div>
          <div className="flex-1 flex justify-center relative h-12 items-center">
            <nav className="absolute transition-opacity duration-300 group-[.is-scrolled]:opacity-0">
              <div className="hidden md:flex items-center space-x-8 text-sm">
                <button className="font-semibold text-black">Stays</button>
                <button className="text-gray-500">Experiences</button>
                <button className="text-gray-500">Online Experiences</button>
              </div>
            </nav>
            <div className="absolute opacity-0 transition-opacity duration-300 group-[.is-scrolled]:opacity-100">
              <SearchInput isScrolled={true} />
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center space-x-4 text-gray-700">
            <button className="hidden md:inline-flex text-sm font-semibold hover:bg-gray-100 px-4 py-3 rounded-full">
              Airbnb your home
            </button>
            <button className="hover:bg-gray-100 p-3 rounded-full">
              <FaGlobe className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-2 border border-gray-300 rounded-full py-2 px-3 hover:shadow-md cursor-pointer">
              <FaBars className="h-4 w-4" />
            </div>
          </div>
        </div>
        {/* Expanded Search Bar */}
        <div className="transition-all duration-300 ease-in-out overflow-hidden flex justify-center max-h-48 opacity-100 pt-4 group-[.is-scrolled]:max-h-0 group-[.is-scrolled]:opacity-0 group-[.is-scrolled]:pt-0">
          <SearchInput isScrolled={false} />
        </div>
      </div>
    </header>
  );
};

export default Header;
