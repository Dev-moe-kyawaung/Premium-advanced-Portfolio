// src/utils/lazyLoad.js
import { lazy } from 'react'

// Lazy load with retry logic
export const lazyLoadWithRetry = (componentImport) => {
  return lazy(() => {
    return new Promise((resolve, reject) => {
      const hasRefreshed = JSON.parse(
        window.sessionStorage.getItem('retry-lazy-refreshed') || 'false'
      )

      componentImport()
        .then((component) => {
          window.sessionStorage.setItem('retry-lazy-refreshed', 'false')
          resolve(component)
        })
        .catch((error) => {
          if (!hasRefreshed) {
            window.sessionStorage.setItem('retry-lazy-refreshed', 'true')
            return window.location.reload()
          }
          reject(error)
        })
    })
  })
}

// Preload component
export const preloadComponent = (componentImport) => {
  componentImport()
}

