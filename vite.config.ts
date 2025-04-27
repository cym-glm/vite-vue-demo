import {fileURLToPath, URL} from 'node:url';

import {defineConfig, loadEnv} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import {prefetchLazyPlugin} from './src/plugins/PrefetchLazyPlugin';
import {visualizer} from 'rollup-plugin-visualizer';
// https://vite.dev/config/
export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd());
    // console.log(env);
    return {
        base: env.VITE_PUBLIC_PATH,
        server: {
            port: 9080,
            host: '0.0.0.0',
            // open: true,
            proxy: {
                '/api': {
                    target: 'https://cnodejs.org/api/v1',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, '')
                }
            }
        },
        build: {
            // outDir: 'dist----aaaa'
            // assetsInlineLimit: 4096 * 160,
            // cssCodeSplit: false,
            rollupOptions: {
                output: {
                    chunkFileNames: 'js/[name]-[hash].js',
                    entryFileNames: 'entry/[name]-[hash].js',
                    assetFileNames: '[ext]/[name]-[hash].[ext]',
                    manualChunks: {
                        lodash: ['lodash'],
                        echarts: ['echarts'],
                        dayjs: ['dayjs'],
                        elementPlus: ['element-plus'],
                        vue: ['vue', 'vue-router', 'pinia', 'axios']
                        // 'a-b-c-d': [
                        //     'src/views/AView.vue',
                        //     'src/views/BView.vue',
                        //     'src/views/CView.vue',
                        //     'src/views/DView.vue'
                        // ]
                    }
                }
            }
        },
        plugins: [
            visualizer({open: false, template: 'treemap'}),
            vue(),
            vueJsx(),
            prefetchLazyPlugin(['AView', 'BView', 'CView', 'DView'], env.VITE_PUBLIC_PATH)
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    };
});
