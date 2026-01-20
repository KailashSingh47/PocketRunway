import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        vapor: {
          pink: "#ff71ce",
          blue: "#01cdfe",
          green: "#05ffa1",
          purple: "#b967ff",
          yellow: "#fffb96",
          dark: "#241734",
        },
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "grid-scroll": "grid-scroll 20s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "grid-scroll": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(50px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
