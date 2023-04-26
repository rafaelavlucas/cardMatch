// https://nuxt.com/docs/api/configuration/nuxt-config
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
});
