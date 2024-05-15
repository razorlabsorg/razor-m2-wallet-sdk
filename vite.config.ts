import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig(({ mode }) => ({
  build: {
    target: 'es2020',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'razorM2WalletSdk',
      fileName: 'index',
    },
    sourcemap: false,
    minify: true,
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        '@mysten/sui.js',
        '@mysten/sui.js/client',
        '@mysten/sui.js/bcs',
        '@mysten/sui.js/utils',
        '@mysten/sui.js/verify',
      ],
      output: {
        globals: {
          '@mysten/sui.js': 'Sui',
          '@mysten/sui.js/client': 'Sui',
          '@mysten/sui.js/bcs': 'Sui',
          '@mysten/sui.js/utils': 'Sui',
          '@mysten/sui.js/verify': 'Sui',
        },
      },
    },
  },
  esbuild: {
    target: 'es2020',
    pure: mode === 'production' ? ['console.log', 'debugger'] : [],
  },
  plugins: [dts()],
}));
