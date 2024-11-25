import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        accent: colors.pink,
        base: colors.neutral
      },
      fontFamily: {
        switzer: ["Switzer"]
      }
    }
  },

  darkMode: 'class',

  plugins: [typography, forms, aspectRatio]
} as Config;
