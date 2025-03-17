import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        roboto: ['var(--font-roboto)', 'sans-serif'],
      },
      keyframes: {
        show: {
          "0%": { bottom: "10px" },
          "25%": { bottom: "25px" },
          "50%": { bottom: "50px" },
          "75%": { bottom: "75px" },
          "100%": { bottom: "100px" },
        },
        hide: {
          "0%": { opacity: "0" },
          "5%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      animation: {
        "show-hide": "show 0.2s ease-in, hide 2s ease-in",
      },
    },
  },
  plugins: [],
} satisfies Config;
