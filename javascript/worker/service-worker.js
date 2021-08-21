// askjdhkasj kjasdhkj sadj kjhsad

import 'regenerator-runtime'
import { clientsClaim, setCacheNameDetails } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { NetworkFirst } from 'workbox-strategies'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import apiBaseUrl from '../constant/api-base-url'
import { randomStringAlphaNumber } from '../utils/string-util'

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
  { url: '/', revision: randomStringAlphaNumber(20) }
])

registerRoute(
  ({ url }) => url.href.includes(apiBaseUrl),
  new NetworkFirst({
    cacheName: 'api-response',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200]
      })
    ]
  })
)
