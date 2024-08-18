import type { Config } from "tailwindcss";
const {nextui} = require("@nextui-org/react");


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#FFFFFF',
        accent: '#f59e0b',
        background: '#f3f4f6',
      }
    },
  },
  plugins: [nextui()],
};
export default config;
