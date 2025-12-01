import React from "react";
import Image from "next/image";
import cartoon from "@/public/character-removebg-preview.png";
import "./show.css"

interface ShowProps {
  cooked_ste: string;
  food: {
    food: string;
    reason: string;
  };
}

export default function Show({ cooked_ste, food }: ShowProps) {
  return (
    <div className="w-screen h-screen bg-gradient-to-br from-pink-200 to-pink-100 flex justify-center items-center p-6">

      <div className="max-w-2xl w-full flex flex-col items-center gap-10 animate-fadeIn">

        {/* Cartoon */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 animate-bounce">
          <Image src={cartoon} alt="Character" fill className="object-contain" />
        </div>

        {/* Cooked Statement */}
        <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-pink-300 w-full text-center transform hover:scale-[1.01] transition">
          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-pink-800 mb-4 flex items-center justify-center gap-2">
            🍳 Cooked For You
          </h2>
          {/* Line */}
          <div className="w-20 h-1 bg-pink-400 mx-auto mb-5 rounded-full"></div>

          {/* Text bubble */}
          <p className="text-lg text-pink-700 leading-relaxed bg-pink-50 p-4 rounded-2xl border border-pink-200 shadow-inner">
            {cooked_ste}
          </p>
        </div>

        {/* Food Suggestion */}
        <div className="relative bg-white p-8 rounded-3xl shadow-xl border border-pink-300 w-full text-center transform hover:scale-[1.01] transition">
          <h2 className="text-3xl font-extrabold text-pink-800 mb-4 flex items-center justify-center gap-2">
            🍔 Your Food Suggestion
          </h2>

          <div className="w-20 h-1 bg-pink-400 mx-auto mb-5 rounded-full"></div>

          <p className="text-xl font-semibold text-pink-700 mb-2">
            {food.food}
          </p>

          <p className="text-lg text-pink-700">{food.reason}</p>
        </div>

        {/* Restart Button */}
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-8 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-lg active:scale-95 transition"
        >
          Restart
        </button>
      </div>
    </div>
  );
}
