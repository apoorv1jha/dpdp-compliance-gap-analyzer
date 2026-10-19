import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213D",
        paper: "#F7F5F0",
        paperdim: "#EFEBE1",
        rule: "#D8D2C4",
        amber: "#C87F0A",
        slate: "#5A6472",
        risk: {
          high: "#B33A3A",
          medium: "#C87F0A",
          low: "#2F6844",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "72ch",
      },
    },
  },
  plugins: [],
};
export default config;
