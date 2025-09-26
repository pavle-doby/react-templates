/// <reference types="./@types/vite-plugin-eslint" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), checker({ typescript: true }), eslint()],
});
