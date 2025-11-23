import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        navy: {
          DEFAULT: "hsl(var(--navy-deep))",
          light: "hsl(var(--navy-light))",
          deep: "hsl(var(--navy-deep))",
        },
        bronze: {
          DEFAULT: "hsl(var(--bronze))",
          light: "hsl(var(--bronze-light))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "float": {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9) translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        "glow": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 20px rgba(255, 127, 62, 0.5))",
          },
          "50%": {
            filter: "drop-shadow(0 0 40px rgba(255, 127, 62, 0.8))",
          },
        },
        "pulse-subtle": {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
        "logo-entrance": {
          "0%": {
            opacity: "0",
            transform: "scale(0.8) rotate(-5deg) translateY(30px)",
          },
          "60%": {
            opacity: "0.9",
            transform: "scale(1.05) rotate(2deg) translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotate(0deg) translateY(0)",
          },
        },
        "levitate": {
          "0%, 100%": {
            transform: "translateY(0px) translateX(0px)",
          },
          "25%": {
            transform: "translateY(-15px) translateX(5px)",
          },
          "50%": {
            transform: "translateY(-8px) translateX(-5px)",
          },
          "75%": {
            transform: "translateY(-15px) translateX(3px)",
          },
        },
        "glow-elegant": {
          "0%, 100%": {
            filter: "drop-shadow(0 0 30px rgba(255, 127, 62, 0.4)) drop-shadow(0 0 60px rgba(255, 127, 62, 0.2))",
          },
          "50%": {
            filter: "drop-shadow(0 0 50px rgba(255, 127, 62, 0.6)) drop-shadow(0 0 100px rgba(255, 127, 62, 0.3))",
          },
        },
        "spotlight": {
          "0%, 100%": {
            opacity: "0.6",
            transform: "scale(1)",
          },
          "50%": {
            opacity: "0.8",
            transform: "scale(1.1)",
          },
        },
        "particle-float": {
          "0%": {
            opacity: "0",
            transform: "translateY(0) scale(0)",
          },
          "50%": {
            opacity: "0.6",
            transform: "translateY(-50px) scale(1)",
          },
          "100%": {
            opacity: "0",
            transform: "translateY(-100px) scale(0.5)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "fade-in": "fade-in 0.8s ease-out",
        "glow": "glow 2s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        "logo-entrance": "logo-entrance 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "levitate": "levitate 6s ease-in-out infinite",
        "glow-elegant": "glow-elegant 3s ease-in-out infinite",
        "spotlight": "spotlight 4s ease-in-out infinite",
        "particle-float": "particle-float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
