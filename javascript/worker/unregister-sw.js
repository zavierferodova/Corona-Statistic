/** Unregister all service worker registrations */
async function unregisterServiceWorker () {
  try {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      registration.unregister()
    }
  } catch (error) {
    console.log('Failed to unregister service worker')
  }
}

export default unregisterServiceWorker
