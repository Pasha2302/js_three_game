import { defineConfig } from 'vite';
import path from 'node:path';


export default defineConfig({
    publicDir: false,

    build: {
        outDir: path.resolve(__dirname, '../build'),
        emptyOutDir: true,
        sourcemap: true,

        rollupOptions: {
            input: path.resolve(__dirname, 'main.js'),
            output: {
                entryFileNames: 'main.js',
                chunkFileNames: 'chunks/[name].js',
                assetFileNames: 'assets/[name][extname]',
            },
        },
    },

    server: {
        host: '127.0.0.1',
        port: 5173,
        strictPort: true,
    },
});
