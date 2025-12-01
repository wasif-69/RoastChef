"use client";
import React from "react";

export default function Header() {
  return (
    <header className="w-full bg-white/70 backdrop-blur-md border-b border-pink-300 py-4 px-6 fixed top-0 left-0 z-50">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between">

        {/* Logo / Title */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-pink-700 tracking-wide">
          Roast Chef 🔥
        </h1>

        {/* Motive / Tagline */}
        <p className="text-pink-600 text-sm sm:text-base mt-2 sm:mt-0 italic">
          “Where your choices cook your fate.”
        </p>
      </div>
    </header>
  );
}
