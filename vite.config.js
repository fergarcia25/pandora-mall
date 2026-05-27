import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  return {
    base: isProd ? '/pandora-mall/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'if-function'],
          additionalData: `@import "@/styles/abstracts/variables";\n`,
        },
      },
    },
  };
});
