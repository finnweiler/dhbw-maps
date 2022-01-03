module.exports = {
  cacheId: "WebbasedService",
  globDirectory: 'www/',
  globPatterns: ['**/*.{woff,woff2,js,css,png,jpg,svg,html}'],
  /* pass array of globs to exclude from caching */
  globIgnores: [],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: 'www/service-worker.js',
  sourcemap: false,
  runtimeCaching: [
    {
      urlPattern: /\.(?:html|css|js)$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "PreCache",
        expiration: {
          maxAgeSeconds: 2592000 // 30 days
        },
      },
    },
    {
      urlPattern: /\.(?:png|jpg|svg|woff|woff2)$/, // Images and Fonts
      handler: "CacheFirst",
      options: {
        cacheName: "Assets",
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 31557600 // 1 Year
        },
      },
    },
  ]
}
