'use client';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // If using lucide icons. Install with `npm i lucide-react`

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-green-600 text-white">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="bg-white text-green-600 px-3 py-1 rounded font-bold text-lg">
              M-PESA
            </div>
            <Image
              src="/safari.png"
              alt="Safaricom Logo"
              width={40}
              height={40}
              className="h-8 w-8 rounded-full"
            />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-green-200 transition-colors">
              APPLY
            </a>
            <a href="#" className="hover:text-green-200 transition-colors">
              RECOMMEND
            </a>
            <a
              href="#"
              className="bg-white text-green-600 px-4 py-2 rounded font-medium hover:bg-green-50 transition-colors"
            >
              LOGIN
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <a href="#" className="block px-4 py-2 hover:bg-green-700 rounded">
              APPLY
            </a>
            <a href="#" className="block px-4 py-2 hover:bg-green-700 rounded">
              RECOMMEND
            </a>
            <a
              href="#"
              className="block px-4 py-2 bg-white text-green-600 rounded font-medium hover:bg-green-50"
            >
              LOGIN
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
