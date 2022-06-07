import { defineConfig } from "vite"
import zip from 'vite-plugin-zip';
import path from "path";

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'scroller.js'),
      fileName: _ => 'scroller.js',
      formats: ['es']
    },
    emptyOutDir: true,
  },
  plugins: [
    zip({
      dir: path.resolve(__dirname, 'dist'),
      outputName: `gather-scroller_v${process.env.npm_package_version}`
    })
  ]
});

export default config;