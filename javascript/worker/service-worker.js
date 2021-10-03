import 'regenerator-runtime'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import apiBaseUrl from '../constant/api-base-url'

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
  { url: '/', revision: '1' }
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
