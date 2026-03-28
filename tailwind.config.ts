import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#171717",
        sand: "#f6f1ea",
        stone: "#e7ded1",
        blush: "#d8b7a4",
        clay: "#8f5f4c",
        forest: "#304437",
      },
      maxWidth: {
        layout: "72rem",
      },
      boxShadow: {
        card: "0 18px 50px -24px rgba(23, 23, 23, 0.2)",
      },
    },
  },
  plugins: [],
};

export default config;
