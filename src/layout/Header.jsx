import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/products" },
  { name: "About", path: "/about" },
  { name: "Complain", path: "/complain" },
  { name: "Login", path: "/login" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMobileMenu = () => setIsOpen((prev) => !prev);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-600">
          MyWebsite
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-4 text-sm font-medium text-gray-700">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="bg-green-500 text-white py-2 px-5 rounded-full hover:bg-green-600 shadow-md transition-all"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="md:hidden text-green-600 cursor-pointer" onClick={toggleMobileMenu}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white ${
          isOpen ? "max-h-96 py-4 px-6" : "max-h-0 px-6 py-0"
        }`}
      >
        <ul className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={closeMobileMenu}
              className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-all"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
