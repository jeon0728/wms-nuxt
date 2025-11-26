// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      //npm install --save-dev @types/node
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3000', // FE에서 사용하는 base
    },
    // 서버 전용 시크릿 등은 여기에
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt'
  ],
  imports: {
    autoImport: true,
  },
  typescript: {
    strict: true
  },
})
