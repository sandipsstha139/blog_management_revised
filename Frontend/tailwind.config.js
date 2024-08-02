/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
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
      borderRadius: {
        "custom-1": "30% 70% 47% 53%",
        "custom-2": "30% 28% 72% 70%",
      },
      fontSize: {
        "5xl": "3.25rem",
        "4xl": "3rem",
        "2xl": "2rem",
        xl: "1.5rem",
        lg: "1.25rem",
        1.125: "1.125rem",
        base: "1rem",
        sm: "0.875rem",
        xs: "0.75rem",
        xsx: "0.625rem",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      textColor: {
        reading: "rgba(37, 38, 94, 0.7)",
        primary: "#25265E",
        "on-dark": "#FFFFFF",
      },
      colors: {
        ctaMain: "#0556F3",
        ctaSecondary: "#22408B",
        tertiary: "#00A3FF",
        highlight: "#1F28FF",
        bgColorWhite: "#F8FAFF",
        bgColorDark: "#2C334E",
        bgOverlap: "#F3F4F6",
        bgCard: "#E7E3FF",
      },
      width: {
        70: "70%",
        80: "80%",
        "19/20": "90%",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
