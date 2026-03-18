import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 py-6 px-5 md:px-10 flex justify-between items-center pointer-events-none bg-black h-[120px]">
      {/* Logo */}
      <div className="pointer-events-auto">
        <Link href="/" className="block relative w-[125px] h-[44px]">
          <Image
            src="/images/nav-logo.svg"
            alt="Value at Void"
            fill
            className="object-contain"
            priority
          />
        </Link>
      </div>

      {/* Menu Icon */}
      <div className="pointer-events-auto cursor-pointer">
        <button className="relative w-[32px] h-[15px] flex items-center justify-center">
          <Image
            src="/images/menu.svg"
            alt="Menu"
            fill
            className="object-contain"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

