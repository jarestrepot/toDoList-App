/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
  "./node_modules/flowbite/**/*.js"
];
export const theme = {
  extend: {
    colors:{
      'persian-green': {
        '50': '#f0fdfa',
        '100': '#cbfcf2',
        '200': '#97f8e4',
        '300': '#5bedd5',
        '400': '#2ad7c1',
        '500': '#0fa997',
        '600': '#0a9789',
        '700': '#0d786f',
        '800': '#0f6059',
        '900': '#124f4b',
        '950': '#03302f',
      },
      'fun-blue': {
        '50': '#f1f7fe',
        '100': '#e2edfc',
        '200': '#bfdaf8',
        '300': '#86bcf3',
        '400': '#469bea',
        '500': '#1e7dd9',
        '600': '#0f59a9',
        '700': '#0f4e95',
        '800': '#10437c',
        '900': '#133967',
        '950': '#0d2444',
      },
    },
  },
  darkMode: 'class',  
};

export const plugins = [
  require('flowbite/plugin')
];

