"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaCommentDots,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mb-[110px] lg:mb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and App Download Section */}
          <div className="lg:col-span-1 col-span-2 flex justify-center lg:block">
            <div className="mb-4 flex flex-col items-center lg:block">
              <Image
                src="/10mslogo-svg.svg"
                alt="10 Minute School"
                width={160}
                height={48}
                className="mb-4"
              />
              <p className="text-gray-700 font-medium mb-4">Download Our Mobile App</p>
              <div className="flex flex-row gap-3">
                <Link href="#" className="inline-block">
                  <Image
                    src="https://cdn.10minuteschool.com/images/google-play-icon_1695731678094.png"
                    alt="Get it on Google Play"
                    width={140}
                    height={42}
                    className="rounded-md"
                  />
                </Link>
                <Link href="#" className="inline-block">
                  <Image
                    src="https://cdn.10minuteschool.com/images/ios-store-icon_1695731704002.png"
                    alt="Download on the App Store"
                    width={140}
                    height={42}
                    className="rounded-md"
                  />
                </Link>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-1 font-semibold">
            <h3 className="text-gray-900 font-semibold text-base mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Career / Recruitment
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Join as a Teacher
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Join as an Affiliate
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Refund policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Others Links */}
          <div className=" lg:col-span-1 font-semibold">
            <h3 className="text-gray-900 font-semibold text-base mb-4">Others</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Book Store
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Free Notes & Guides
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Job Preparation Courses
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Verify Certificate
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                  Free Download
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="col-span-2 lg:col-span-1 font-semibold">
            <h3 className="text-gray-900 font-semibold text-base mb-4 hidden lg:block">Keep up with us at</h3>
            <div className="space-y-3">
              <div className="text-sm hidden lg:block ">
                <span className="text-gray-600">Call Us: </span>
                <span className="text-green-600 font-semibold">16910</span>
                <span className="text-gray-500"> (24×7)</span>
              </div>

              <div className="text-sm hidden lg:block ">
                <span className="text-gray-600">whatsapp: </span>
                <span className="text-green-600">+8801896016252</span>
                <span className="text-gray-500">(24×7)</span>
              </div>

              <div className="text-sm hidden lg:block ">
                <span className="text-gray-600">Outside Bangladesh: </span>
                <span className="text-green-600">+880 9610916910</span>
              </div>

              <div className="text-sm hidden lg:block">
                <span className="text-gray-600">Email Us: </span>
                <Link href="mailto:support@10minuteschool.com" className="text-green-600">
                  support@10minuteschool.com
                </Link>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-3 pt-2 justify-between border-t border-gray-200 lg:border-t-0">
                <Link
                  href="#"
                  className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FaFacebookF size={14} />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FaInstagram size={14} />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FaLinkedinIn size={14} />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FaYoutube size={14} />
                </Link>
                <Link
                  href="#"
                  className="w-8 h-8 bg-gray-800 text-white rounded flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <FaTiktok size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6">
          <p className="text-gray-500 text-sm text-center">
            2015 - 2025 Copyright © 10 Minute School. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-[160px] right-8 lg:bottom-4 lg:right-4 flex flex-col gap-3 z-40">
        <Link
          href="#"
          className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-700 transition-colors">
          <FaCommentDots size={20} />
        </Link>
        <Link
          href="#"
          className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition-colors">
          <FaWhatsapp size={20} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
