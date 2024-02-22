/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./sections/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1900px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'background-hero': "url('/images/hero_bg.png')",
        'background-login': "url('/images/ja-login.png')",
        'background-login-linear': "linear-gradient(180deg, rgba(87, 176, 160, 0.00) 0%, rgba(87, 176, 160, 0.80) 100%)"
      },
      fontFamily: {
        Poppins: ["Poppins"],
        Inter: ["Inter"],
        DMSans: ["DMSans"],
        Raleway: ["Raleway"],
        PlayfairDisplay: ["PlayfairDisplay"],
        NunitoSans: ['NunitoSans'],
        Caveat: ['Caveat']
      },
      fontSize: {
        '1.5xl': '22px',
        '5xl': '45px',
      },
      colors: {
        primary: "#27B3A0",
        primaryText: "#505050",
        secondaryText: "#2D3E50",
        lightWhite: "#F0F2F5",
        lightGray: "#D0D5DD",
        gray20: "#333333",
        darkGrey: "#8A8A8A",
        mystic: "#DCE2EB",
        grayChateau: "#9CA3AF",
        borderDarkGrey: '#282626',
        bgPrimary: '#2D4249',
        bgSecondary: '#2B2B2B',
        lightGrey: '#C9C9C9',
        blueText: '#33475B',
        blueLight: 'rgba(87, 176, 160, 0.80);'
      },
      dropShadow: {
        "custom-4-4": "0 4px 4px rgba(0, 0, 0, 0.25)",
        "custom-4-8": "0 4px 8px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
