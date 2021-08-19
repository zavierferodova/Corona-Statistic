/* eslint-disable node/handle-callback-err */
const CACHE_NAME = 'corona_statistic_v1.3'
const urlToCache = [
  '/',
  '/manifest.json',
  '/javascript/component/LocationTable.js',
  '/javascript/data/CoronaData.js',
  '/javascript/main.js',
  '/css/style.css',
  'home.html'
]
const librariesCache = [
  '/libraries/bootstrap/css/bootstrap.min.css',
  '/libraries/jquery/jquery.min.js',
  '/libraries/chart.js/Chart.min.css',
  '/libraries/chart.js/Chart.min.js',
  '/libraries/lottie-web/lottie.min.js',
  '/lottie/18469-stay-safe.json',
  '/lottie/18795-coronavirus.json',
  '/libraries/font-awesome/css/font-awesome.min.css',
  '/libraries/font-awesome/fonts/fontawesome-webfont.eot',
  '/libraries/font-awesome/fonts/fontawesome-webfont.svg',
  '/libraries/font-awesome/fonts/fontawesome-webfont.ttf',
  '/libraries/font-awesome/fonts/fontawesome-webfont.woff',
  '/libraries/font-awesome/fonts/fontawesome-webfont.woff2'
]
const imagesCache = [
  '/images/icons/virus-256.png',
  '/images/icons/virus-128.png',
  '/images/icons/virus-64.png',
  '/images/icons/virus-32.png',
  '/images/hand-wash.png',
  '/images/keep-distance.png',
  '/images/medical-mask.png',
  '/images/stayhome.png'
]
const fontsCache = [
  '/fonts/BAUHS93.ttf'
]

urlToCache.push(...imagesCache)
urlToCache.push(...fontsCache)
urlToCache.push(...librariesCache)

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(() => (cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus')
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) {
        return cache.addAll(urlToCache)
      })
      .catch(error => {
        console.log('Install Error')
      })
  )
})

self.addEventListener('fetch', function (event) {
  const base_url = 'https://api.kawalcorona.com/'

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone())
          return response
        })
      })
        .catch(error => {
          console.log(event.request.url)
          console.log('Fetch Error')
        })
    )
  } else {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then(function (response) {
        return response || fetch(event.request)
      })
    )
  }
})
