'use client';
import { Poppins } from 'next/font/google';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export default function Header() {
  const [isFloating, setIsFloating] = useState(false);
  const [Mobilenav, setMobileNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFloating(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isFloating ? 'shadow-md p-4' : 'shadow-none p-0'} ${poppins.className}`}>
      <div className={`py-8 px-42 bg-cyan-600 grid-cols-2 justify-between items-center transition-all duration-500 max-md:py-5 max-md:px-8 ${isFloating ? 'text-white rounded-2xl' : 'text-black rounded-b-2xl'}`}>
        <div className="flex w-full justify-between space-x-2">
          <div>
            <Link href="/" className={`text-2xl font-bold items-center transition-all duration-500 ${isFloating ? 'text-white' : 'text-white'}`}>
              Mamcing
            </Link>
          </div>
          <div className="hidden md:flex space-x-12 items-center">
            <Link href="#about" className={`text-lg font-medium transition-all duration-500 ${isFloating ? 'text-white' : 'text-black'}`}>
              Kasih MaM
            </Link>
            <Link href="#contact" className={`text-lg font-medium transition-all duration-500 ${isFloating ? 'text-white' : 'text-black'}`}>
              Setting MaM
            </Link>
            <Link href="#blog" className={`text-lg font-medium transition-all duration-500 ${isFloating ? 'text-white' : 'text-black'}`}>
              Lihat MaM
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button outline-none dark:text-light" onClick={() => setMobileNav(!Mobilenav)} aria-label="Toggle mobile menu">
              <svg className="h-7 w-7 text-gray-100 transition-transform duration-300 ease-in-out" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line className="transition-all duration-300 ease-in-out origin-center" x1="3" y1="6" x2="21" y2="6" style={{ transform: Mobilenav ? 'translateY(4px) rotate(45deg)' : 'none' }} />
                <line className="transition-all duration-300 ease-in-out" x1="3" y1="12" x2="21" y2="12" style={{ opacity: Mobilenav ? 0 : 1 }} />
                <line className="transition-all duration-300 ease-in-out origin-center" x1="3" y1="18" x2="21" y2="18" style={{ transform: Mobilenav ? 'translateY(-4px) rotate(-45deg)' : 'none' }} />
              </svg>
            </button>
          </div>
        </div>
        <div className={`md:hidden bg-cyan-600 px-2 overflow-hidden transition-all duration-500 ease-in-out rounded-b-2xl ${Mobilenav ? 'max-h-60 py-4 opacity-100' : 'max-h-0 py-0 opacity-0'}`}>
          <div className="flex flex-col text-center font-po  space-y-4 transform transition-transform duration-500 ease-in-out" style={{ transform: Mobilenav ? 'translateY(0)' : 'translateY(-20px)' }}>
            <Link href="#about" className="text-lg font-medium text-white">
              Kasih MaM
            </Link>
            <Link href="#contact" className="text-lg font-medium text-white">
              Setting MaM
            </Link>
            <Link href="#blog" className="text-lg font-medium text-white">
              Lihat MaM
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
