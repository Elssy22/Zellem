"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import SocialIcons from "@/components/ui/SocialIcons";

const navLinks = [
  { href: "/", label: "Ma Galerie" },
  { href: "/about", label: "About Me" },
  { href: "/boutique", label: "Boutique" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "";
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "";
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-gray-100 shadow-sm ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between px-[3vw] py-0">
        {/* Logo - Gauche */}
        <Link href="/" className="relative z-50">
          <Image
            src="/images/LOGO.png"
            alt="Zellem"
            width={128}
            height={128}
            className="h-32 w-auto object-contain"
            priority
          />
        </Link>

        {/* Navigation Desktop - Droite */}
        <div className="hidden md:flex items-center gap-8">
          {/* Nav Links */}
          <nav>
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-sm tracking-wide transition-opacity duration-300 hover:opacity-60 ${
                      pathname === link.href ? "text-black" : "text-black"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Cart & Social Icons */}
          <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
            {/* Cart */}
            <button
              onClick={openCart}
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:text-black hover:border-black transition-all duration-300 relative"
              aria-label="Panier"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <SocialIcons size="sm" />
          </div>
        </div>

        {/* Mobile: Cart + Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Cart Mobile */}
          <button
            onClick={openCart}
            className="relative z-50 p-2"
            aria-label="Panier"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          {/* Menu Button */}
          <button
            onClick={toggleMenu}
            className="relative z-50 p-2 -mr-2"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-black transform transition-all duration-300 origin-center ${
                isMenuOpen ? "rotate-45 translate-y-[9px]" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-black transition-all duration-300 ${
                isMenuOpen ? "opacity-0 scale-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-black transform transition-all duration-300 origin-center ${
                isMenuOpen ? "-rotate-45 -translate-y-[9px]" : ""
              }`}
            />
          </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-all duration-500 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <nav>
            <ul className="flex flex-col items-center gap-6">
              {navLinks.map((link, index) => (
                <li
                  key={link.href}
                  className={`transform transition-all duration-500 ${
                    isMenuOpen
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                  style={{ transitionDelay: isMenuOpen ? `${index * 100}ms` : "0ms" }}
                >
                  <Link
                    href={link.href}
                    className={`text-2xl tracking-wide transition-opacity duration-300 hover:opacity-60 ${
                      pathname === link.href ? "text-black" : "text-gray-600"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social Icons Mobile */}
          <div
            className={`mt-12 transform transition-all duration-500 ${
              isMenuOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
            style={{ transitionDelay: isMenuOpen ? "400ms" : "0ms" }}
          >
            <SocialIcons size="md" className="gap-4" />
          </div>
        </div>
      </div>
    </header>
  );
}
