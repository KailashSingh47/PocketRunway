"use client";

import { motion } from "framer-motion";

export const RotatingText = ({ text }: { text: string }) => {
  return (
    <div className="relative inline-block">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="w-32 h-32 border-2 border-dashed border-vapor-pink rounded-full flex items-center justify-center"
      >
        <span className="text-vapor-blue font-bold text-xs uppercase tracking-widest">
          {text}
        </span>
      </motion.div>
    </div>
  );
};
