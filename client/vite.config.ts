import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ip from 'ip'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  define: {
    __API_URL__: JSON.stringify(`http://${ip.address()}:3000`)
  }
});
