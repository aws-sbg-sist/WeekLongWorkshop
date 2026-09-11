import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        aws: {
          dark: "#090D16",
          squid: "#0F172A",
          card: "#141D30",
          cardHover: "#1A253C",
          border: "#23334D",
          borderSubtle: "#1C2A3F",
          orange: "#FF9900",
          orangeHover: "#EC7211",
          orangeLight: "rgba(255, 153, 0, 0.12)",
          blue: "#0073BB",
          blueHover: "#005C96",
          cyan: "#00A4E4",
          text: "#F1F5F9",
          muted: "#94A3B8",
          subtle: "#64748B",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      animation: {
        "pulse-fast": "pulse 1.2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
