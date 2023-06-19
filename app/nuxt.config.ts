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
      description: "Jogo de correspondência", 
      theme_color: "#F99532",
      background_color: "#F99532",
      display: "standalone",
      scope: "/",
      id:'/',
      start_url: "/",

      icons: [
        {
          src: "/icons/icon-72x72.png",
          sizes: "72x72",
          type: "image/png",
           
        },
        {
          src: "/icons/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
           
        },
        {
          src: "/icons/icon-128x128.png",
          sizes: "128x128",
          type: "image/png",
           
        },
        {
          src: "/icons/icon-144x144.png",
          sizes: "144x144",
          type: "image/png",
           
        },
        {
          src: "/icons/icon-152x152.png",
          sizes: "152x152",
          type: "image/png",
           
        },
        {
          src: "/icons/icon-192x192.png",
          sizes: "192x192",
          type: "image/png",
           
        },
        {
          src: "/icons/icon-384x384.png",
          sizes: "284x284",
          type: "image/png",
           
        },
        {
          src: "/icons/icon-512x512.png",
          sizes: "512x512",
          type: "image/png",
           
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
