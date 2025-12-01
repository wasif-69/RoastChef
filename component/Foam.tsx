"use client";
import React, { useEffect, useState } from "react";
import cartoon from "@/public/character-removebg-preview.png";
import Image from "next/image";
import Show from "./Show";

// sounds
const playClick = () => new Audio("/click.mp3").play();
const playTalk = () => new Audio("/talk.mp3").play();

export default function Foam() {
  const [value, setValue] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);

  const [cooked, setCooked] = useState("");
  const [food, setFood] = useState({ food: "", reason: "" });

  const [displayText, setDisplayText] = useState("");
  const [fade, setFade] = useState(false);

  const [loading, setLoading] = useState(false);

  const Question = [
    "Do you love burgers?",
    "Do you love chef-ing?",
    "Was math your last class?",
    "Do you feel lucky?",
    "Is Pakistan a dumb country?",
  ];

  /* ---------------------------------------------------------
      FIXED TYPING ANIMATION — no missing letters, no undefined
  -----------------------------------------------------------*/
  // useEffect(() => {
  //   if (value < Question.length) {
  //     const text = Question[value];
  //     setDisplayText("");
  //     let index = 0;

  //     playTalk();

  //     const interval = setInterval(() => {
  //       setDisplayText((prev) => prev + text.charAt(index));
  //       index++;

  //       if (index >= text.length) clearInterval(interval);
  //     }, 50);

  //     return () => clearInterval(interval);
  //   }
  // }, [value]);

  /* ---------------------------------------------------------
      API SUBMIT + Loading Screen
  -----------------------------------------------------------*/
  const handleSubmit = async () => {
    setLoading(true);

    const cookedRes = await fetch("/api/cooked", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Question, Answer: answers }),
    });

    const cookedData = await cookedRes.json();
    setCooked(cookedData.Cooked || "No roast generated!");

    const foodRes = await fetch("/api/food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ Question, Answer: answers }),
    });

    const foodData = await foodRes.json();
    setFood(foodData.food || { food: "", reason: "" });

    setTimeout(() => setLoading(false), 1200); // cute delay
  };

  useEffect(() => {
    if (value === Question.length) {
      handleSubmit();
    }
  }, [answers]);

  /* ---------------------------------------------------------
      BUTTON CLICK
  -----------------------------------------------------------*/
  const addValue = (val: string) => {
    playClick();
    setFade(true);

    setTimeout(() => {
      setFade(false);
      setAnswers((prev) => [...prev, val]);
      setValue((prev) => prev + 1);
    }, 200);
  };

  /* ---------------------------------------------------------
      LOADING SCREEN
  -----------------------------------------------------------*/
  const LoadingScreen = () => (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 to-pink-100">
      <div className="relative w-32 h-32 animate-bounce">
        <Image src={cartoon} alt="loading" fill className="object-contain" />
      </div>
      <p className="text-xl text-pink-700 font-bold animate-pulse mt-4">
        Cooking your roast...
      </p>
    </div>
  );

  /* ---------------------------------------------------------
      MAIN RETURN
  -----------------------------------------------------------*/
  if (loading) return <LoadingScreen />;

  if (cooked !== "")
    return <Show cooked_ste={cooked} food={food} />;

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 to-pink-100 p-4 overflow-hidden">

      <div className="relative flex flex-col items-center max-w-xl w-full">

        {/* PROGRESS BAR */}
        <div className="w-full mb-6">
          <div className="h-2 w-full bg-pink-300 rounded-full">
            <div
              className="h-full bg-pink-600 rounded-full transition-all duration-500"
              style={{ width: `${(value / Question.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-center text-pink-700 mt-1 text-sm">
            Question {value + 1} / {Question.length}
          </p>
        </div>

        {/* CARTOON */}
        <div className="relative w-40 h-40 sm:w-52 sm:h-52 mb-6 animate-bounce">
          <Image src={cartoon} alt="cartoon" fill className="object-contain" />
        </div>

        {/* SPEECH BUBBLE */}
        <div
          className={`relative bg-white shadow-xl rounded-3xl p-6 border border-pink-300 w-full transition-opacity duration-300 ${
            fade ? "opacity-0" : "opacity-100"
          }`}
        >
          {/* Bubble pointer */}
          <div
            className="absolute -top-5 left-1/2 -translate-x-1/2 w-0 h-0 
        border-l-[20px] border-r-[20px] border-b-[25px] 
        border-l-transparent border-r-transparent border-b-white"
          ></div>

          {/* question typing */}
          <p className="text-lg sm:text-xl font-bold text-pink-700 min-h-[3rem]">
            {/* {displayText} */}
            {Question[value]}
          </p>

          {/* ANSWER BUTTONS */}
          <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            {["Yes", "No", "Don't Know"].map((text) => (
              <button
                key={text}
                onClick={() => addValue(text)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full w-full sm:w-auto active:scale-95 transition"
              >
                {text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
