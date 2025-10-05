import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",                // ✅ include the main HTML
    "./src/**/*.{js,jsx,ts,tsx}",  // ✅ include all React files
  ],
  theme: {
    extend: {
    
    //end daisy ui themes
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["forest","coffee"],
  }
}
