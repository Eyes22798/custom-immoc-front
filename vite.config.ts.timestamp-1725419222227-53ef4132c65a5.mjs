// vite.config.ts
import { defineConfig } from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/vite@5.3.4_@types+node@20.14.12_less@4.2.0_sass@1.77.8_terser@5.31.6/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.4_vue@3.4.33/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import IconsResolver from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/unplugin-icons@0.19.2/node_modules/unplugin-icons/dist/resolver.js";
import { createSvgIconsPlugin } from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.3.4/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import autoImport from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/unplugin-auto-import@0.18.2_@vueuse+core@10.11.0/node_modules/unplugin-auto-import/dist/vite.js";
import viteRestart from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/vite-plugin-restart@0.4.1_vite@5.3.4/node_modules/vite-plugin-restart/dist/index.js";
import browserslist from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/browserslist@4.23.3/node_modules/browserslist/index.js";
import legacy from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/@vitejs+plugin-legacy@5.4.2_terser@5.31.6_vite@5.3.4/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import topLevelAwait from "file:///Users/eyes/Helox/imooc-front/node_modules/.pnpm/vite-plugin-top-level-await@1.4.4_vite@5.3.4/node_modules/vite-plugin-top-level-await/exports/import.mjs";
import path from "path";
var __vite_injected_original_dirname = "/Users/eyes/Helox/imooc-front";
var browserslistConfig = browserslist.loadConfig({ path: "." });
var vite_config_default = defineConfig({
  plugins: [
    // 插件
    vue(),
    createSvgIconsPlugin({ iconDirs: [path.resolve(process.cwd(), "src/assets/icons")] }),
    autoImport({
      include: [
        /\.[tj]s?$/,
        // .ts, .tsx, .js, .jsx
        /\.[tj]sx?$/,
        // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/,
        // .vue
        /\.md$/
        // .md
      ],
      imports: [
        "vue",
        "vue-router",
        "pinia",
        {
          "@/helper/pinia-auto-refs": ["useStore"]
        },
        "@vueuse/head",
        "@vueuse/core",
        "vue-i18n"
      ],
      dirs: ["./hooks", "./hooks/**", "./components", "./components/**"],
      dts: true,
      eslintrc: {
        enabled: true
      },
      resolvers: [IconsResolver()]
    }),
    // 热重载，包含配置文件的修改
    viteRestart({
      restart: ["vite.config.[jt]s"]
    }),
    // 浏览器上兼容
    legacy({
      renderLegacyChunks: false,
      modernPolyfills: ["es.global-this"],
      targets: browserslistConfig
    }),
    topLevelAwait({
      // The export name of top-level await promise for each chunk module
      promiseExportName: "__tla",
      // The function to generate import names of top-level await promise in each chunk module
      promiseImportName: (i) => `__tla_${i}`
    })
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://api.imooc-front.lgdsunday.club/",
        changeOrigin: true
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "src"),
      "#": path.resolve(__vite_injected_original_dirname, "types")
      // #代替types
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
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvZXllcy9IZWxveC9pbW9vYy1mcm9udFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2V5ZXMvSGVsb3gvaW1vb2MtZnJvbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2V5ZXMvSGVsb3gvaW1vb2MtZnJvbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xuaW1wb3J0IGF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCB2aXRlUmVzdGFydCBmcm9tICd2aXRlLXBsdWdpbi1yZXN0YXJ0J1xuLy8gXHU1NDExXHU0RTBBXHU1MTdDXHU1QkI5XHU2RDRGXHU4OUM4XHU1NjY4XG5pbXBvcnQgYnJvd3NlcnNsaXN0IGZyb20gJ2Jyb3dzZXJzbGlzdCdcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5J1xuaW1wb3J0IHRvcExldmVsQXdhaXQgZnJvbSAndml0ZS1wbHVnaW4tdG9wLWxldmVsLWF3YWl0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgYnJvd3NlcnNsaXN0Q29uZmlnID0gYnJvd3NlcnNsaXN0LmxvYWRDb25maWcoeyBwYXRoOiAnLicgfSlcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICAvLyBcdTYzRDJcdTRFRjZcbiAgICB2dWUoKSxcbiAgICBjcmVhdGVTdmdJY29uc1BsdWdpbih7IGljb25EaXJzOiBbcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksICdzcmMvYXNzZXRzL2ljb25zJyldIH0pLFxuICAgIGF1dG9JbXBvcnQoe1xuICAgICAgaW5jbHVkZTogW1xuICAgICAgICAvXFwuW3RqXXM/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIC9cXC5bdGpdc3g/JC8sIC8vIC50cywgLnRzeCwgLmpzLCAuanN4XG4gICAgICAgIC9cXC52dWUkLyxcbiAgICAgICAgL1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcbiAgICAgICAgL1xcLm1kJC8gLy8gLm1kXG4gICAgICBdLFxuICAgICAgaW1wb3J0czogW1xuICAgICAgICAndnVlJyxcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxuICAgICAgICAncGluaWEnLFxuICAgICAgICB7XG4gICAgICAgICAgJ0AvaGVscGVyL3BpbmlhLWF1dG8tcmVmcyc6IFsndXNlU3RvcmUnXVxuICAgICAgICB9LFxuICAgICAgICAnQHZ1ZXVzZS9oZWFkJyxcbiAgICAgICAgJ0B2dWV1c2UvY29yZScsXG4gICAgICAgICd2dWUtaTE4bidcbiAgICAgIF0sXG4gICAgICBkaXJzOiBbJy4vaG9va3MnLCAnLi9ob29rcy8qKicsICcuL2NvbXBvbmVudHMnLCAnLi9jb21wb25lbnRzLyoqJ10sXG4gICAgICBkdHM6IHRydWUsXG4gICAgICBlc2xpbnRyYzoge1xuICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICB9LFxuICAgICAgcmVzb2x2ZXJzOiBbSWNvbnNSZXNvbHZlcigpXVxuICAgIH0pLFxuICAgIC8vIFx1NzBFRFx1OTFDRFx1OEY3RFx1RkYwQ1x1NTMwNVx1NTQyQlx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NzY4NFx1NEZFRVx1NjUzOVxuICAgIHZpdGVSZXN0YXJ0KHtcbiAgICAgIHJlc3RhcnQ6IFsndml0ZS5jb25maWcuW2p0XXMnXVxuICAgIH0pLFxuICAgIC8vIFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NEUwQVx1NTE3Q1x1NUJCOVxuICAgIGxlZ2FjeSh7XG4gICAgICByZW5kZXJMZWdhY3lDaHVua3M6IGZhbHNlLFxuICAgICAgbW9kZXJuUG9seWZpbGxzOiBbJ2VzLmdsb2JhbC10aGlzJ10sXG4gICAgICB0YXJnZXRzOiBicm93c2Vyc2xpc3RDb25maWdcbiAgICB9KSxcbiAgICB0b3BMZXZlbEF3YWl0KHtcbiAgICAgIC8vIFRoZSBleHBvcnQgbmFtZSBvZiB0b3AtbGV2ZWwgYXdhaXQgcHJvbWlzZSBmb3IgZWFjaCBjaHVuayBtb2R1bGVcbiAgICAgIHByb21pc2VFeHBvcnROYW1lOiAnX190bGEnLFxuICAgICAgLy8gVGhlIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIGltcG9ydCBuYW1lcyBvZiB0b3AtbGV2ZWwgYXdhaXQgcHJvbWlzZSBpbiBlYWNoIGNodW5rIG1vZHVsZVxuICAgICAgcHJvbWlzZUltcG9ydE5hbWU6IChpKSA9PiBgX190bGFfJHtpfWBcbiAgICB9KVxuICBdLFxuICBzZXJ2ZXI6IHtcbiAgICBwcm94eToge1xuICAgICAgJy9hcGknOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYXBpLmltb29jLWZyb250LmxnZHN1bmRheS5jbHViLycsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSxcbiAgICAgICcjJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJ3R5cGVzJykgLy8gI1x1NEVFM1x1NjZGRnR5cGVzXG4gICAgfVxuICB9LFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBjc3M6IHsgY2hhcnNldDogZmFsc2UgfSxcbiAgICAgIGxlc3M6IHtcbiAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcbiAgICAgICAgLy8gYWRkaXRpb25hbERhdGE6IGAkaW5qZWN0ZWRDb2xvcjogb3JhbmdlYFxuICAgICAgfVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVEsU0FBUyxvQkFBb0I7QUFDdFMsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sbUJBQW1CO0FBQzFCLFNBQVMsNEJBQTRCO0FBQ3JDLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8saUJBQWlCO0FBRXhCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sWUFBWTtBQUNuQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLFVBQVU7QUFWakIsSUFBTSxtQ0FBbUM7QUFZekMsSUFBTSxxQkFBcUIsYUFBYSxXQUFXLEVBQUUsTUFBTSxJQUFJLENBQUM7QUFHaEUsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBO0FBQUEsSUFFUCxJQUFJO0FBQUEsSUFDSixxQkFBcUIsRUFBRSxVQUFVLENBQUMsS0FBSyxRQUFRLFFBQVEsSUFBSSxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQztBQUFBLElBQ3BGLFdBQVc7QUFBQSxNQUNULFNBQVM7QUFBQSxRQUNQO0FBQUE7QUFBQSxRQUNBO0FBQUE7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBO0FBQUEsUUFDQTtBQUFBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsU0FBUztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxVQUNFLDRCQUE0QixDQUFDLFVBQVU7QUFBQSxRQUN6QztBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0Y7QUFBQSxNQUNBLE1BQU0sQ0FBQyxXQUFXLGNBQWMsZ0JBQWdCLGlCQUFpQjtBQUFBLE1BQ2pFLEtBQUs7QUFBQSxNQUNMLFVBQVU7QUFBQSxRQUNSLFNBQVM7QUFBQSxNQUNYO0FBQUEsTUFDQSxXQUFXLENBQUMsY0FBYyxDQUFDO0FBQUEsSUFDN0IsQ0FBQztBQUFBO0FBQUEsSUFFRCxZQUFZO0FBQUEsTUFDVixTQUFTLENBQUMsbUJBQW1CO0FBQUEsSUFDL0IsQ0FBQztBQUFBO0FBQUEsSUFFRCxPQUFPO0FBQUEsTUFDTCxvQkFBb0I7QUFBQSxNQUNwQixpQkFBaUIsQ0FBQyxnQkFBZ0I7QUFBQSxNQUNsQyxTQUFTO0FBQUEsSUFDWCxDQUFDO0FBQUEsSUFDRCxjQUFjO0FBQUE7QUFBQSxNQUVaLG1CQUFtQjtBQUFBO0FBQUEsTUFFbkIsbUJBQW1CLENBQUMsTUFBTSxTQUFTLENBQUM7QUFBQSxJQUN0QyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNsQyxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUE7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxFQUNBLEtBQUs7QUFBQSxJQUNILHFCQUFxQjtBQUFBLE1BQ25CLEtBQUssRUFBRSxTQUFTLE1BQU07QUFBQSxNQUN0QixNQUFNO0FBQUEsUUFDSixtQkFBbUI7QUFBQTtBQUFBLE1BRXJCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
