"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { AboutContact } from "@/components/about-contact";


export default function Home() {
  const [isTranslateOpen, setIsTranslateOpen] = useState<boolean>(false);

  const handleTranslateToggle = (isOpen: boolean) => {
    setIsTranslateOpen(isOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className={`${isTranslateOpen ? 'pt-[40px]' : ''} transition-all duration-300`}>
        <Navbar />
      </div>
      <main>
        <Hero />
        <Features />
        <About />
        <AboutContact />
      </main>
      <Footer />
    </div>
  );
}
