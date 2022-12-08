import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const { APP_ENV } = loadEnv(mode, process.cwd(), '');
    const config = {
        build: {
            manifest: true,
            rollupOptions: {
                input: {
                    front: 'assets/front/front.js',
                }
            }
        },
        mode: APP_ENV,
    };

    if ('dev' === APP_ENV) {
        config.build.rollupOptions.output = {
            entryFileNames: `assets/[name].js`,
            chunkFileNames: `assets/[name].js`,
            assetFileNames: `assets/[name].[ext]`,
        };
    }

    return config;
});
