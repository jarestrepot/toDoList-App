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
        '50': '#f0fdfb',
        '100': '#cbfcf4',
        '200': '#97f8e9',
        '300': '#5beddd',
        '400': '#2ad7ca',
        '500': '#0fa99f',
        '600': '#0a9790',
        '700': '#0d7875',
        '800': '#0f605e',
        '900': '#124f4e',
        '950': '#032f30',
      },
      'chateau-green': {
        '50': '#effef6',
        '100': '#dafeeb',
        '200': '#b8fad6',
        '300': '#81f4b8',
        '400': '#43e590',
        '500': '#1acd70',
        '600': '#0fa959',
        '700': '#108549',
        '800': '#12693d',
        '900': '#115634',
        '950': '#03301b',
      },
      
    }
  },
};
export const plugins = [
  require('flowbite/plugin')
];

