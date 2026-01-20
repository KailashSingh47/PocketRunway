"use client";

import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="relative py-16 mt-20 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-vapor-purple to-transparent" />
      
      <div className="container mx-auto px-6 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-block px-6 py-2 border-x-2 border-vapor-pink">
            <p className="text-vapor-pink font-mono text-sm tracking-[0.3em] uppercase">
              System Version 1.0.47
            </p>
          </div>
          
          <div className="relative group">
            <h2 className="text-2xl md:text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-vapor-blue via-vapor-green to-vapor-pink">
              LEAD DEVELOPER — KAILASH SINGH
            </h2>
            <div className="absolute -inset-1 bg-gradient-to-r from-vapor-blue via-vapor-green to-vapor-pink opacity-20 blur group-hover:opacity-40 transition-opacity" />
          </div>

          <p className="text-[10px] text-vapor-purple font-mono uppercase tracking-widest opacity-50">
            © 2024 ALL RIGHTS RESERVED // AESTHETIC_FINANCE_PROTOCOL
          </p>
        </motion.div>
      </div>

      {/* Background text decoration */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[12rem] font-black text-white/[0.02] whitespace-nowrap pointer-events-none select-none italic">
        KAILASH SINGH KAILASH SINGH
      </div>
    </footer>
  );
};
