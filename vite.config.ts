import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-setup.ts',
    // design-system.test.ts가 index.css 원문(?raw)을 읽을 수 있게 한다 (기본값은 CSS를 빈 문자열로 대체)
    css: { include: [/src[\\/]index\.css/] },
  },
});
