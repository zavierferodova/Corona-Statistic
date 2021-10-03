import 'regenerator-runtime'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { NetworkFirst, StaleWhileRevalidate, CacheFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { ExpirationPlugin } from 'workbox-expiration'
import apiBaseUrl from '@src/constant/api-base-url'

clientsClaim()
cleanupOutdatedCaches()
setCacheNameDetails({
  prefix: 'corona-statistic',
  precache: 'precache',
  runtime: 'runtime'
})

self.addEventListener('install', event => {
  self.skipWaiting()
})

precacheAndRoute(self.__WB_MANIFEST || [])
precacheAndRoute([
  { url: '/', revision: '1.1' }
], { ignoreURLParametersMatching: [/.*/] })

registerRoute(
  ({ url }) => url.href.includes(apiBaseUrl.origin),
  new NetworkFirst({
    cacheName: 'api-response',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  })
)

// Cache the Google Fonts stylesheets with a stale-while-revalidate strategy.
registerRoute(
  ({ url }) => url.origin === 'https://fonts.googleapis.com',
  new StaleWhileRevalidate({
    cacheName: 'google-fonts-stylesheets'
  }),
  'GET'
)

// Cache the underlying font files with a cache-first strategy for 30 days.
registerRoute(
  ({ url }) => url.origin === 'https://fonts.gstatic.com',
  new CacheFirst({
    cacheName: 'google-fonts-webfonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 30 * (60 * 60 * 24), // 30 Days
        maxEntries: 30,
        purgeOnQuotaError: true
      })
    ]
  }),
  'GET'
)

// Cache fonts
registerRoute(
  /\.(?:eot|otf|ttc|ttf|woff|woff2)$/i,
  new CacheFirst({
    cacheName: 'static-font-assets',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 7 * (60 * 60 * 24),
        purgeOnQuotaError: true
      })
    ]
  }),
  'GET'
)
