import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        "screen-minus-header": "calc(100dvh - 72px)",
        "screen-minus-header-mobile": "calc(100dvh - 56px)",
      },
      fontFamily: {
        headline: ["var(--font-caprasimo)", "serif"],
        body: ["var(--font-raleway)", "sans-serif"],
      },
      backgroundImage: {
        "custom-bg":
          "url('/single-doodle.png'), url('/3stars-doodle.png'), url('/doodle1.png')",
      },
      backgroundPosition: {
        "custom-bg": "1% 98%, 45% 55%, 100% -5%",
      },
      backgroundSize: {
        "custom-bg": "80px, 100px, 200px",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
