import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Contact", href: "#contact" },
    { label: "AI Assistant", href: "/chat" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Login", href: "/login", isButton: true }, // Added isButton property
  ];

  return (
    <nav className="fixed w-full bg-background/95  z-50 border-b">
      <div className="container mx-auto px-10 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary dark:text-slate-200">
            Prosperify 💰
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          {navItems.map((item) => (
            item.isButton ? (
              <Button
                key={item.href}
                asChild
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ) : item.href.startsWith('#') ? (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground/60 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-b">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              item.isButton ? (
                <Button
                  key={item.href}
                  asChild
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:shadow-blue-500/25 transition-all duration-300 w-full"
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ) : item.href.startsWith('#') ? (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
