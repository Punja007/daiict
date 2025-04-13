"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import About from "@/components/About";
import Footer from "@/components/Footer";
import { AboutContact } from "@/components/about-contact";
import GoogleTranslate from "@/components/GoogleTranslate";
import GoogleTranslateButton from "@/components/GoogleTranslateButton";
// import { useEffect, useState } from "react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
      <GoogleTranslate />
        <Hero />
        <Features />
        <About />
        <AboutContact />
      </main>
      <Footer />
    </div>
  );
}
