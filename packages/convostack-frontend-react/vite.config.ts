import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import libCss from 'vite-plugin-libcss';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@graphql': './graphql/generated/graphql.ts',
    },
  },
  server: {
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist', 
    lib: {
      entry: 'src/index.ts', 
      name: 'convostack',
      formats: ['es', 'umd'], // Output formats (ES module and UMD)
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react(), dts(), libCss()],
})
