"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FiMenu, FiSearch, FiX } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { MdLanguage } from "react-icons/md";

const navItems = ["ক্লাস ৬-১২", "ভর্তি পরীক্ষা", "অনলাইন ব্যাচ", "ইংলিশ সেন্টার"];
const suggestions = [
  "HSC 25 শেষ মুহূর্তের প্রস্তুতি ...",
  "hsc 26",
  "english",
  "ielts",
  "৯ম শ্রেণি - অনলাইন ব্যাচ ২০২৫",
];

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Get current language from pathname
  const getCurrentLanguage = () => {
    if (pathname.startsWith("/bn")) return "bn";
    if (pathname.startsWith("/en")) return "en";
    return "en"; // default to English
  };

  const currentLang = getCurrentLanguage();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to reset scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileOpen]);

  // Toggle language function
  const toggleLanguage = () => {
    const newLang = currentLang === "en" ? "bn" : "en";
    const currentPath = pathname.replace(/^\/(en|bn)/, "") || "";
    router.push(`/${newLang}${currentPath}`);
  };

  return (
    <nav className="w-full py-2 bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${currentLang}`} className="flex items-center gap-2">
          <Image src="/10mslogo-svg.svg" alt="10 Minute School" width={130} height={40} priority />
        </Link>

        {/* Search */}
        <div
          className="hidden lg:flex items-center flex-grow max-w-[400px] mx-6 relative"
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}>
          <div
            className={`flex items-center w-full px-4 py-2 border rounded-full ${
              isSearchFocused ? "ring-1 ring-gray-400" : "border-gray-300"
            } bg-white`}>
            <FiSearch className="text-orange-500 mr-2" />
            <input
              type="text"
              placeholder="স্কিল কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন..."
              className="w-full text-sm bg-transparent outline-none"
            />
          </div>

          {/* Suggestions popup */}
          {isSearchFocused && (
            <div className="absolute z-auto top-full left-0 w-full bg-white rounded-xl shadow-lg mt-2 border border-gray-200 overflow-hidden">
              <p className="text-gray-600 text-xs font-bold px-4 pt-3 pb-1">জনপ্রিয় অনুসন্ধান</p>
              <ul>
                {suggestions.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">
                    <FiSearch className="text-gray-400" />
                    <span className="text-gray-400 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-4 font-medium text-gray-700">
          {navItems.map((item, idx) => (
            <div key={idx} className="relative group cursor-pointer">
              <div className="flex items-center gap-1">
                <span className="text-gray-700 text-[12px]">{item}</span>
                <span className="ml-1 text-xs">
                  <IoIosArrowDown />
                </span>
              </div>
              <div className="absolute hidden group-hover:block top-full left-0 mt-2 bg-white shadow-md rounded-lg min-w-[200px] z-40 p-2">
                <p className="text-xs text-gray-500 px-2 py-1">ড্রপডাউন কন্টেন্ট</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right section */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={toggleLanguage}
            className="border px-2 py-1 rounded flex items-center gap-1 text-sm hover:bg-gray-50 transition-colors">
            <MdLanguage />
            {currentLang.toUpperCase() === "EN" ? "BN" : "EN"}
          </button>
          <div className="flex items-center text-green-600 text-sm font-semibold gap-1">
            <FaPhoneAlt size={14} />
            16910
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded text-sm">
            লগ-ইন
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Left Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          {/* Background overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Left drawer */}
          <div
            className={`fixed top-0 left-0 h-full w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
              isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}>
            {/* Drawer header */}
            <div className="flex items-center justify-between p-6 border-b">
              <Image src="/10mslogo-svg.svg" alt="10 Minute School" width={140} height={40} />
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <FiX size={24} />
              </button>
            </div>

            {/* Drawer content */}
            <div className="flex flex-col h-full">
              {/* Search */}
              <div className="p-6 border-b">
                <div className="flex items-center w-full px-4 py-3 border rounded-full border-gray-300 bg-gray-50">
                  <FiSearch className="text-orange-500 mr-3 text-lg" />
                  <input
                    type="text"
                    placeholder="স্কিল কোর্স, কিংবা স্কুল প্রোগ্রাম সার্চ করুন..."
                    className="w-full text-sm bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Navigation items */}
              <div className="flex-1 px-6 py-6 overflow-y-auto">
                {navItems.map((item, idx) => (
                  <div key={idx} className="mb-4">
                    <div className="flex justify-between items-center cursor-pointer hover:text-green-600 transition-colors py-4 px-4 hover:bg-gray-50 rounded-lg">
                      <span className="text-gray-800 font-medium text-base">{item}</span>
                      <IoIosArrowDown className="text-gray-400 text-lg" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom actions */}
              <div className="p-6 border-t space-y-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <button
                    onClick={toggleLanguage}
                    className="border px-5 py-3 rounded-lg flex items-center gap-3 text-sm hover:bg-white transition-colors border-gray-300 bg-white">
                    <MdLanguage className="text-lg" />
                    <span className="font-medium">
                      {currentLang.toUpperCase() === "EN" ? "বাংলা" : "English"}
                    </span>
                  </button>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <FaPhoneAlt size={16} />
                    <span className="text-base">16910</span>
                  </div>
                </div>

                <button className="bg-green-600 hover:bg-green-700 text-white w-full py-4 rounded-lg text-base font-medium transition-colors">
                  লগ-ইন
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
