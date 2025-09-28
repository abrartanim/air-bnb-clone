import React, { useLayoutEffect, useRef } from "react";
import { FaGlobe, FaBars, FaSearch } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import SearchInput from "./Header/SearchInput";
import logo from "../assets/logo.png";
import { useMediaQuery } from "../hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const DESKTOP_BREAKPOINT = "(min-width: 768px)";

interface HeaderProps {
  isPropertyPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isPropertyPage = false }) => {
  const headerRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);

  useLayoutEffect(() => {
    if (isDesktop && !isPropertyPage) {
      const ctx = gsap.context(() => {
        let isAnimating = false;
        ScrollTrigger.create({
          id: "mainHeaderAnimation",
          trigger: document.body,
          start: 80,
          end: "bottom top",
          onEnter: () => {
            if (isAnimating) return;
            isAnimating = true;
            headerRef.current?.classList.add("is-scrolled");
            gsap.to(window, {
              scrollTo: { y: 120, autoKill: false },
              duration: 0.4,
              ease: "power2.out",
              onComplete: () => {
                isAnimating = false;
              },
            });
          },
          onLeaveBack: () => {
            if (isAnimating) return;
            isAnimating = true;
            headerRef.current?.classList.remove("is-scrolled");
            gsap.to(window, {
              scrollTo: { y: 40, autoKill: false },
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
    }
  }, [isDesktop, isPropertyPage]);

  return (
    <header
      ref={headerRef}
      // THE ONLY CHANGE IS HERE: We make the 'sticky top-0' classes conditional
      className={`z-50 w-full bg-white shadow-sm group ${
        isPropertyPage ? "" : "sticky top-0"
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 transition-all duration-300 ease-in-out py-4 group-[.is-scrolled]:py-2">
        <div className="hidden md:flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <img
              src={logo}
              className="h-8 w-auto cursor-pointer"
              alt="Airbnb logo"
            />
          </div>

          <div className="flex-1 flex justify-center relative h-12 items-center">
            {isPropertyPage ? (
              <SearchInput isScrolled={true} />
            ) : (
              <>
                <nav className="absolute transition-opacity duration-300 group-[.is-scrolled]:opacity-0">
                  <div className="flex items-center space-x-8 text-sm">
                    <button className="font-semibold text-black">Stays</button>
                    <button className="text-gray-500">Experiences</button>
                    <button className="text-gray-500">
                      Online Experiences
                    </button>
                  </div>
                </nav>
                <div className="absolute opacity-0 transition-opacity duration-300 group-[.is-scrolled]:opacity-100">
                  <SearchInput isScrolled={true} />
                </div>
              </>
            )}
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

        {!isPropertyPage && (
          <div className="hidden md:flex transition-all duration-300 ease-in-out overflow-hidden justify-center max-h-48 opacity-100 pt-4 group-[.is-scrolled]:max-h-0 group-[.is-scrolled]:opacity-0 group-[.is-scrolled]:pt-0">
            <SearchInput isScrolled={false} />
          </div>
        )}

        {!isPropertyPage && (
          <div className="md:hidden flex flex-col gap-4">
            <button className="w-full flex items-center space-x-3 border rounded-full shadow-md hover:shadow-lg transition-shadow py-2 px-4 text-left">
              <FaSearch className="h-5 w-5 text-gray-800" />
              <span className="text-sm font-medium text-gray-800">
                Start your search
              </span>
            </button>
            <nav className="flex justify-center items-center space-x-8 text-sm font-semibold text-gray-600">
              <button className="text-black font-bold border-b-2 border-black pb-2">
                Stays
              </button>
              <button>Experiences</button>
              <button>Services</button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
