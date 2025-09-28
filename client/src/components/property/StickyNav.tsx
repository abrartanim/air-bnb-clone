import React from "react";

interface StickyNavProps {
  isVisible: boolean;
}

const navLinks = [
  { href: "#photos", label: "Photos" },
  { href: "#amenities", label: "Amenities" },
  { href: "#reviews", label: "Reviews" },
  { href: "#location", label: "Location" },
];

const StickyNav: React.FC<StickyNavProps> = ({ isVisible }) => {
  // Handles the smooth scroll when a nav link is clicked
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const targetId = href.substring(1); // Remove the '#'
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = 90; // Offset to account for the nav bar's height
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    // This div is fixed to the viewport and spans the full width.
    // Its visibility is controlled by the isVisible prop.
    <div
      className={`fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="container mx-auto px-8">
        <div className="flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="py-4 text-sm font-semibold text-gray-700 hover:text-black"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default StickyNav;
