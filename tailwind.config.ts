import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import forms from '@tailwindcss/forms';

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

  plugins: [typography, forms]
} as Config;
