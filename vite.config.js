import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/js/index.jsx'],
            refresh: true,
        }),
        react()
    ],
    server: {
        // hmr: false
        hmr: {
            host: 'localhost',
            port: 5137,
            // protocol: 'wss'
        }
    }
});
