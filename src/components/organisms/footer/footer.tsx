import { Link } from "react-router-dom";

import tmddLogo from "@/assets/tmdb-logo-3.svg";
import fbIcon from "@/assets/fb-icon.svg";
import igIcon from "@/assets/ig-icon.svg";
import xIcon from "@/assets/x-icon.svg";

export const Footer = () => {
  return (
    <footer className="bg-[#172554] text-white py-12 px-4 lg:px-8">
      <div className="max-w-3xl mx-auto flex flex-col justify-between lg:flex-row gap-4">
        <div className="mb-2">
          <img src={tmddLogo} alt="TMDB Logo" className="h-16 w-auto object-contain brightness-110" />
        </div>

        <nav className="flex flex-col flex-wrap gap-3 font-medium">
          <Link to="/" className="hover:text-blue-300 transition-colors duration-200">
            Home
          </Link>
          <Link to="/upcoming" className="hover:text-blue-300 transition-colors duration-200">
            Upcoming
          </Link>
          <Link to="/popular" className="hover:text-blue-300 transition-colors duration-200">
            Popular
          </Link>
          <Link to="/top-rated" className="hover:text-blue-300 transition-colors duration-200">
            Top Rated
          </Link>
          <Link to="/genres" className="hover:text-blue-300 transition-colors duration-200">
            Genres
          </Link>
        </nav>

        <nav className="flex flex-col flex-wrap gap-3 font-medium">
          <Link to="/about" className="hover:text-blue-300 transition-colors duration-200">
            About
          </Link>
          <Link to="/contact" className="hover:text-blue-300 transition-colors duration-200">
            Contact Us
          </Link>
          <Link to="/terms" className="hover:text-blue-300 transition-colors duration-200">
            Terms of Use
          </Link>
          <Link to="/privacy" className="hover:text-blue-300 transition-colors duration-200">
            Privacy Policy
          </Link>
          <Link to="/cookies" className="hover:text-blue-300 transition-colors duration-200">
            Cookie Policy
          </Link>
          <Link to="/dmca" className="hover:text-blue-300 transition-colors duration-200">
            DMCA
          </Link>
        </nav>

        <div className="flex gap-4">
          <a href="">
            <img src={fbIcon} alt="" />
          </a>
          <a href="">
            <img src={igIcon} alt="" />
          </a>
          <a href="">
            <img src={xIcon} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};
