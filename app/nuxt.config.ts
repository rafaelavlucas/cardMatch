// https://nuxt.com/docs/api/configuration/nuxt-config
// @ts-nocheck

export default defineNuxtConfig({
  app: {
    head: {
      title: "Card Match",
      htmlAttrs: {
        lang: "pt",
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;600&display=swap",
        },
      ],
    },
  },
  css: [
    "~/assets/style/reset.scss",
    "~/assets/style/foundations/colors.scss",
    "~/assets/style/helpers.scss",
  ],
  modules: [
    '@vite-pwa/nuxt'
  ],
  pwa: {
    /* PWA options */
    manifest: {
      name: "Matchimatch",
      short_name: "Matchimatch",
      description: "App didática para crianças, com diferentes tipos de jogos de correspondência. Inspirada na pedagogia Montessori.", 
      theme_color: "#F99532",
      background_color: "#F99532",
      display: "standalone",
      scope: "/",
      id:'/',
      start_url: "/",

      icons: [
        {
          src: "/icons/icon-48.svg",
          sizes: "48x48",
          type: "image/svg+xml",
           
        },
        {
          src: "/icons/icon-72.svg",
          sizes: "72x72",
          type: "image/svg+xml",
           
        },
        {
          src: "/icons/icon-96.svg",
          sizes: "96x96",
          type: "image/svg+xml",
           
        },
        {
          src: "/icons/icon-128.svg",
          sizes: "128x128",
          type: "image/svg+xml",
           
        },
        {
          src: "/icons/icon-144.svg",
          sizes: "144x144",
          type: "image/svg+xml",  
           
        },
        {
          src: "/icons/icon-152.svg",
          sizes: "152x152",
          type: "image/svg+xml",
           
        },
        {
          src: "/icons/icon-192.svg",
          sizes: "192x192",
          type: "image/svg+xml",
           
        },
        {
          src: "/icons/icon-284.svg",
          sizes: "284x284", 
          type: "image/svg+xml",
           
        },
        {
          src: "/icons/icon-512.svg",
          sizes: "512x512",
          type: "image/svg+xml",
           
        }
      ] 
    },
    workbox: {
      navigateFallback: "/"
    },
    devOptions: {
      enabled: true,
      type: "module"
    }

  }
});
