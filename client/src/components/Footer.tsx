import React from "react";
import {
  FaGlobe,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaShieldAlt,
} from "react-icons/fa";

// A reusable link item component for the lists
const LinkItem = ({
  href = "#",
  children,
}: {
  href?: string;
  children: React.ReactNode;
}) => (
  <li className="mb-3">
    <a href={href} className="hover:underline cursor-pointer text-gray-700">
      {children}
    </a>
  </li>
);

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-sm text-gray-800 font-sans">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Top section with links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-8">
          {/* Support Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul>
              <LinkItem>Help Center</LinkItem>
              <LinkItem>Get help with a safety issue</LinkItem>
              <LinkItem>AirCover</LinkItem>
              <LinkItem>Anti-discrimination</LinkItem>
              <LinkItem>Disability support</LinkItem>
              <LinkItem>Cancellation options</LinkItem>
              <LinkItem>Report neighborhood concern</LinkItem>
            </ul>
          </div>

          {/* Hosting Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Hosting</h3>
            <ul>
              <LinkItem>Airbnb your home</LinkItem>
              <LinkItem>Airbnb your experience</LinkItem>
              <LinkItem>Airbnb your service</LinkItem>
              <LinkItem>AirCover for Hosts</LinkItem>
              <LinkItem>Hosting resources</LinkItem>
              <LinkItem>Community forum</LinkItem>
              <LinkItem>Hosting responsibly</LinkItem>
              <LinkItem>Airbnb-friendly apartments</LinkItem>
              <LinkItem>Join a free Hosting class</LinkItem>
              <LinkItem>Find a co-host</LinkItem>
            </ul>
          </div>

          {/* Airbnb Column */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Airbnb</h3>
            <ul>
              <LinkItem>2025 Summer Release</LinkItem>
              <LinkItem>Newsroom</LinkItem>
              <LinkItem>Careers</LinkItem>
              <LinkItem>Investors</LinkItem>
              <LinkItem>Gift cards</LinkItem>
              <LinkItem>Airbnb.org emergency stays</LinkItem>
            </ul>
          </div>
        </div>

        {/* Bottom section with copyright and social links */}
        <div className="border-t border-gray-200 pt-8 flex flex-col-reverse md:flex-row justify-between items-center">
          {/* Left side: Copyright and legal links */}
          <div className="flex flex-wrap text-gray-600 mt-4 md:mt-0 text-center">
            <span>© 2025 Airbnb, Inc.</span>
            <span className="mx-2">·</span>
            <a href="#" className="hover:underline cursor-pointer">
              Terms
            </a>
            <span className="mx-2">·</span>
            <a href="#" className="hover:underline cursor-pointer">
              Sitemap
            </a>
            <span className="mx-2">·</span>
            <a href="#" className="hover:underline cursor-pointer">
              Privacy
            </a>
            <span className="mx-2">·</span>
            <a
              href="#"
              className="hover:underline cursor-pointer flex items-center"
            >
              Your Privacy Choices
              <FaShieldAlt className="ml-2 h-5 w-5 text-blue-600" />
            </a>
          </div>

          {/* Right side: Language, Currency, and Social Icons */}
          <div className="flex items-center space-x-6">
            <a
              href="#"
              className="flex items-center font-semibold hover:underline cursor-pointer"
            >
              <FaGlobe className="mr-2" />
              English (US)
            </a>
            <a
              href="#"
              className="font-semibold hover:underline cursor-pointer"
            >
              ৳ BDT
            </a>
            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-gray-800 hover:text-gray-900 cursor-pointer"
              >
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-gray-900 cursor-pointer"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-800 hover:text-gray-900 cursor-pointer"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
