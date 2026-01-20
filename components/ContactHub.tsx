"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from "lucide-react";
import { ShuffleText } from "./ShuffleText";

const SOCIAL_LINKS = [
  {
    name: "GitHub",
    icon: <Github size={24} />,
    url: "https://github.com/KailashSingh47",
    color: "border-vapor-blue",
    hoverBg: "hover:bg-vapor-blue",
    shadow: "shadow-[5px_5px_0px_0px_rgba(1,205,254,0.4)]",
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={24} />,
    url: "https://www.linkedin.com/in/kailash-singh-47sk/",
    color: "border-vapor-pink",
    hoverBg: "hover:bg-vapor-pink",
    shadow: "shadow-[5px_5px_0px_0px_rgba(255,113,206,0.4)]",
  },
  {
    name: "Email",
    icon: <Mail size={24} />,
    url: "mailto:sathikailashninja@gmail.com",
    color: "border-vapor-yellow",
    hoverBg: "hover:bg-vapor-yellow",
    shadow: "shadow-[5px_5px_0px_0px_rgba(255,251,150,0.4)]",
  },
];

export const ContactHub = () => {
  return (
    <section className="relative py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vapor-purple/5 to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-4 mb-12">
          <Sparkles className="text-vapor-green animate-pulse" />
          <h2 className="text-4xl font-black italic text-white tracking-tighter">
            <ShuffleText text="CONTACT_HUB" />
          </h2>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-vapor-green to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SOCIAL_LINKS.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, x: 5, y: -5 }}
              className={`group relative flex flex-col p-8 border-2 ${link.color} bg-vapor-dark/40 backdrop-blur-sm transition-all duration-300 ${link.hoverBg} hover:text-vapor-dark ${link.shadow}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 border border-current rounded-none group-hover:rotate-12 transition-transform">
                  {link.icon}
                </div>
                <ExternalLink size={16} className="opacity-40 group-hover:opacity-100" />
              </div>
              
              <h3 className="text-2xl font-bold italic mb-2 uppercase tracking-widest">
                {link.name}
              </h3>
              <p className="text-xs font-mono opacity-70 group-hover:opacity-100">
                {link.url.replace('mailto:', '').replace('https://', '')}
              </p>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-current opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
