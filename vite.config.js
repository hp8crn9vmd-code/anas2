// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
    base: './',
    server: {
        port: 3000,
        open: true,
        host: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true,
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    let extType = assetInfo.name.split('.').at(1)
                    if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
                        extType = 'images'
                    }
                    return `assets/${extType}/[name]-[hash][extname]`
                },
                chunkFileNames: 'assets/js/[name]-[hash].js',
                entryFileNames: 'assets/js/[name]-[hash].js'
            }
        }
    },
    resolve: {
        alias: {
            '@': '/src',
            '@public': '/public'
        }
    },
    css: {
        devSourcemap: true
    }
})
