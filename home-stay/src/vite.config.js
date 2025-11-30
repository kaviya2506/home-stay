import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
 
export default defineConfig({
  plugins: [react()],
  base:process.env.VITE_BASE_PATH||"home-stay " ,
  "scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}

  
});
