/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        sjcs: {
          red: "#D32F2F",
          blue: "#1976D2",
          gray: "#F8F9FA",
          white: "#FFFFFF",
          success: "#2E7D32",
          warning: "#FBC02D",
          danger: "#C62828",
          textPrimary: "#212121",
          textSecondary: "#757575"
        }
      },
      backgroundImage: {
        "sjcs-gradient": "linear-gradient(to right, #D32F2F, #1976D2)"
      },
      borderRadius: {
        "sjcs-card": "12px"
      },
      boxShadow: {
        "sjcs-soft":
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      },
      fontFamily: {
        display: ["Lexend", "sans-serif"]
      }
    }
  },
  plugins: [],
};
