import { resolve } from 'node:path'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { defineConfig, type Plugin } from 'vite'

import {
  APP_CANVAS_COLOR,
  SPLASH_COLOR,
  SPLASH_SEEN_KEY,
} from './src/lib/splash-tokens.ts'

function splashBoot(mode: string): Plugin {
  const replacements: Record<string, string> = {
    '%COLDOP_SPLASH_COLOR%': SPLASH_COLOR,
    '%COLDOP_CANVAS_COLOR%': APP_CANVAS_COLOR,
    '%COLDOP_SPLASH_SEEN_KEY%': SPLASH_SEEN_KEY,
    '%COLDOP_DEV%': mode === 'development' ? 'true' : 'false',
  }

  return {
    name: 'coldop-splash-boot',
    transformIndexHtml(html) {
      return Object.entries(replacements).reduce(
        (result, [token, value]) => result.replaceAll(token, value),
        html,
      )
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    splashBoot(mode),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/*.png'],
      manifest: {
        name: 'Coldop',
        short_name: 'Coldop',
        description: 'Cold storage inventory management',
        theme_color: SPLASH_COLOR,
        background_color: SPLASH_COLOR,
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'icons/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: 'icons/icon-512-maskable.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(import.meta.dirname, './src'),
    },
  },
}))
