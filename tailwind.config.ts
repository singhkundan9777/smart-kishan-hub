import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        leaf: { 50: "#eff8ef", 100: "#d9efd9", 500: "#2f8b45", 600: "#247238", 700: "#1b572b", 900: "#10371d" },
        harvest: "#e7b64a"
      },
      boxShadow: { soft: "0 16px 50px rgba(19, 66, 35, 0.10)" }
    },
  },
  plugins: [],
};
export default config;
