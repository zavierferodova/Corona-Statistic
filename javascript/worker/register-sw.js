function registerServiceWorker () {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('./service-worker.js')
        .then(function () {
          console.log('Service Worker sucessfuly registered')
        })
        .catch(function () {
          console.log('Failed to register service worker')
        })
    })
  } else {
    console.log("This browser doesn't support service worker")
  }
}

export default registerServiceWorker
