import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    strictPort: true,
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',  
        changeOrigin: true,
        secure: false,

      },
    },
  },
});
