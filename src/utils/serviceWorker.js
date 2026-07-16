// src/utils/serviceWorker.js
// Service Worker registration and management
export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('✅ SW registered:', registration)

          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New update available
                if (confirm('New version available! Reload to update?')) {
                  window.location.reload()
                }
              }
            })
          })
        })
        .catch(error => {
          console.error('❌ SW registration failed:', error)
        })
    })
  }
}

// Unregister service worker
export const unregisterServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    const registrations = await navigator.serviceWorker.getRegistrations()
    for (const registration of registrations) {
      await registration.unregister()
    }
  }
}

