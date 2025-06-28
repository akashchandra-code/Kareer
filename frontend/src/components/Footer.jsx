import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className=" text-white py-10 px-6 mt-12 border-t border-zinc-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        
        {/* Brand Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-[gilroy]  mb-3">Kareer</h2>
          <p className="text-sm text-zinc-400 font-[hel]">
            Find your next opportunity with confidence. Simplifying job search for everyone.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className="text-lg font-[gilroy] mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm font-[hel]">
            <li>
              <Link to="/" className="hover:text-[#24cfa5] transition">Home</Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:text-[#24cfa5] transition">Jobs</Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-[#24cfa5] transition">Profile</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Legal */}
        <div className="flex-1">
          <h3 className="text-lg font-[gilroy] mb-4">Support</h3>
          <ul className="space-y-2 text-sm font-[hel]">
  <li>
    <a href="mailto:akashchandra6280@gmail.com" className="hover:text-[#24cfa5] transition">
      Contact Us
    </a>
  </li>
  <li>
    <a href="/policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#24cfa5] transition">
      Privacy Policy
    </a>
  </li>
  <li>
    <a href="/terms.pdf" target="_blank" rel="noopener noreferrer" className="hover:text-[#24cfa5] transition">
      Terms of Service
    </a>
  </li>
</ul>

        </div>
      </div>

      <div className="mt-10 text-center text-sm text-zinc-500 font-[hel]">
        © {new Date().getFullYear()} Kareer. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
