import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F5EFF',
        secondary: '#5ACAF1',
        tertiary: '#002357',
        dark: '#111521',
        light: '#F7FEFF',
      },
    },
  },
  plugins: [],
};
export default config;
