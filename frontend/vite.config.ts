import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api/v1': {
        // target: 'https://u4e-zjbtlzdxca-uc.a.run.app:8080',
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    }
  },
  plugins: [react()],

})
