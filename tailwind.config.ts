import forms from "@tailwindcss/forms";
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2rem",
        "2xl": "2rem"
      },
      screens: {
        "2xl": "1180px"
      }
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        graphite: {
          50: "#f6f7f8",
          100: "#e7e9ec",
          200: "#cbd0d6",
          300: "#a5adb7",
          400: "#7a8491",
          500: "#5f6874",
          600: "#4b535d",
          700: "#3f454d",
          800: "#343940",
          900: "#171a1f",
          950: "#0b0d10"
        },
        signal: {
          50: "#fff7e8",
          100: "#ffebc2",
          200: "#ffd483",
          300: "#ffb93f",
          400: "#f59e0b",
          500: "#df7f05",
          600: "#ba5f07",
          700: "#96480c",
          800: "#7b3d11",
          900: "#693414"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        soft: "0 18px 50px -30px rgb(15 23 42 / 0.35)",
        line: "0 1px 0 rgb(15 23 42 / 0.08)"
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: [forms]
};

export default config;
