"use client";

import { VaporwaveBackground } from "@/components/VaporwaveBackground";
import { ShuffleText } from "@/components/ShuffleText";
import { RotatingText } from "@/components/RotatingText";
import { ContactHub } from "@/components/ContactHub";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen text-white relative overflow-hidden">
      <VaporwaveBackground />
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 relative z-10">
        {/* Hero Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black italic mb-4 text-transparent bg-clip-text bg-gradient-to-r from-vapor-pink via-vapor-blue to-vapor-green drop-shadow-[0_5px_5px_rgba(255,113,206,0.5)] leading-tight">
              <ShuffleText text="PocketRunway" />
            </h1>
            <p className="text-vapor-blue text-lg md:text-2xl font-mono tracking-widest uppercase px-4">
              Aesthetic Expense Tracking
            </p>
          </motion.div>

          <div className="mt-8 md:mt-12 scale-75 md:scale-100">
            <RotatingText text="Scroll Down • Scroll Down • " />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10"
          >
            <Link 
              href="/auth" 
              className="px-10 py-4 bg-vapor-pink text-vapor-dark font-black text-xl uppercase tracking-widest hover:bg-vapor-green transition-all shadow-[8px_8px_0px_0px_rgba(5,255,161,0.5)] inline-block"
            >
              Enter Dashboard
            </Link>
          </motion.div>
        </div>

        {/* Contact Hub Section */}
        <ContactHub />

        {/* Footer Attribution */}
        <Footer />
      </div>
    </main>
  );
}
