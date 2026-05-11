import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'firebase',
              test: /node_modules[\\/]@?firebase/,
              priority: 4,
            },
            {
              name: 'mui',
              test: /node_modules[\\/]@mui/,
              priority: 3,
            },
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|react-router-dom)/,
              priority: 2,
            },
            {
              name: 'vendor',
              test: /node_modules/,
              priority: 1,
              maxSize: 350 * 1024,
            },
          ],
        },
      },
    },
  },
})
