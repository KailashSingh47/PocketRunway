"use client";

import { motion } from "framer-motion";
import { ShuffleText } from "./ShuffleText";
import { useState, useEffect } from "react";

const SAVING_QUOTES = [
  "A penny saved is a penny earned.",
  "Don't save what is left after spending; spend what is left after saving.",
  "The art is not in making money, but in keeping it.",
  "Beware of little expenses; a small leak will sink a great ship.",
  "He who buys what he does not need, steals from himself.",
  "Aesthetic wealth starts with digital discipline.",
  "Your future self will thank you for the neon you didn't buy today.",
];

export const LoadingScreen = ({ message = "INITIALIZING_SYSTEM" }: { message?: string }) => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(SAVING_QUOTES[Math.floor(Math.random() * SAVING_QUOTES.length)]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-vapor-dark flex flex-col items-center justify-center"
    >
      <div className="relative">
        {/* Retro Loading Spinner */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-4 border-t-vapor-pink border-r-vapor-blue border-b-vapor-green border-l-vapor-purple rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-vapor-dark rounded-full border-2 border-vapor-dark shadow-[inset_0_0_10px_rgba(255,113,206,0.5)]" />
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-md px-6">
        <p className="text-vapor-pink font-mono text-xl tracking-[0.2em] uppercase mb-2">
          <ShuffleText text={message} />
        </p>
        <p className="text-vapor-blue font-mono text-[10px] italic uppercase tracking-widest opacity-80 animate-pulse">
          "{quote}"
        </p>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "200px" }}
          transition={{ duration: 2, repeat: Infinity }}
          className="h-1 bg-gradient-to-r from-vapor-pink via-vapor-blue to-vapor-green mt-4 mx-auto"
        />
      </div>

      {/* Background Glitch Elements */}
      <div className="absolute top-10 left-10 text-vapor-blue/20 font-mono text-xs">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>0x000{i}F_SYSTEM_READY</div>
        ))}
      </div>
    </motion.div>
  );
};
