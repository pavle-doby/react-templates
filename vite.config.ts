/// <reference types="./@types/vite-plugin-eslint" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({ babel: { plugins: ['@emotion'] } }),
    checker({ typescript: true }),
    eslint(),
  ],
});
