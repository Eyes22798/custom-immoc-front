import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import IconsResolver from 'unplugin-icons/resolver'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import autoImport from 'unplugin-auto-import/vite'
import viteRestart from 'vite-plugin-restart'
// 向上兼容浏览器
import browserslist from 'browserslist'
import legacy from '@vitejs/plugin-legacy'
import topLevelAwait from 'vite-plugin-top-level-await'
import path from 'path'

const browserslistConfig = browserslist.loadConfig({ path: '.' })

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 插件
    vue(),
    createSvgIconsPlugin({ iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')] }),
    autoImport({
      include: [
        /\.[tj]s?$/, // .ts, .tsx, .js, .jsx
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/, // .vue
        /\.md$/ // .md
      ],
      imports: [
        'vue',
        'vue-router',
        'pinia',
        {
          '@/helper/pinia-auto-refs': ['useStore']
        },
        '@vueuse/head',
        '@vueuse/core',
        'vue-i18n'
      ],
      dirs: ['./hooks', './hooks/**', './components', './components/**'],
      dts: true,
      eslintrc: {
        enabled: true
      },
      resolvers: [IconsResolver()]
    }),
    // 热重载，包含配置文件的修改
    viteRestart({
      restart: ['vite.config.[jt]s']
    }),
    // 浏览器上兼容
    legacy({
      renderLegacyChunks: false,
      modernPolyfills: ['es.global-this'],
      targets: browserslistConfig
    }),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: '__tla',
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://api.imooc-front.lgdsunday.club/',
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '#': path.resolve(__dirname, 'types') // #代替types
    }
  },
  css: {
    preprocessorOptions: {
      css: { charset: false },
      less: {
        javascriptEnabled: true
        // additionalData: `$injectedColor: orange`
      }
    }
  }
})
