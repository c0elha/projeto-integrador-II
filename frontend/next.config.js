/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  optimizeFonts: false,
  i18n: {
    locales: ["en", "pt-BR"],
    defaultLocale: "pt-BR",
  }
}

module.exports = nextConfig
