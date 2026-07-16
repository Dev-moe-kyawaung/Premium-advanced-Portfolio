// src/utils/caching.js
// Advanced caching utilities
class CacheManager {
  constructor(cacheName = 'mka-portfolio-cache', maxAge = 3600000) {
    this.cacheName = cacheName
    this.maxAge = maxAge
    this.memoryCache = new Map()
  }

  // Get from cache
  async get(key) {
    // Try memory cache first
    if (this.memoryCache.has(key)) {
      const cached = this.memoryCache.get(key)
      if (Date.now() - cached.timestamp < this.maxAge) {
        return cached.data
      }
      this.memoryCache.delete(key)
    }

    // Try IndexedDB cache
    try {
      const db = await this.openDB()
      const transaction = db.transaction(['cache'], 'readonly')
      const store = transaction.objectStore('cache')
      const request = store.get(key)

      return new Promise((resolve) => {
        request.onsuccess = () => {
          const result = request.result
          if (result && Date.now() - result.timestamp < this.maxAge) {
            this.memoryCache.set(key, result)
            resolve(result.data)
          } else {
            resolve(null)
          }
        }
        request.onerror = () => resolve(null)
      })
    } catch (error) {
      console.error('Cache get error:', error)
      return null
    }
  }

  // Set cache
  async set(key, data) {
    const cacheData = {
      key,
      data,
      timestamp: Date.now()
    }

    // Set in memory cache
    this.memoryCache.set(key, cacheData)

    // Set in IndexedDB
    try {
      const db = await this.openDB()
      const transaction = db.transaction(['cache'], 'readwrite')
      const store = transaction.objectStore('cache')
      store.put(cacheData)
    } catch (error) {
      console.error('Cache set error:', error)
    }
  }

  // Clear cache
  async clear() {
    this.memoryCache.clear()
    
    try {
      const db = await this.openDB()
      const transaction = db.transaction(['cache'], 'readwrite')
      const store = transaction.objectStore('cache')
      store.clear()
    } catch (error) {
      console.error('Cache clear error:', error)
    }
  }

  // Open IndexedDB
  openDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.cacheName, 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        const db = event.target.result
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' })
        }
      }
    })
  }
}

export const cacheManager = new CacheManager()

// API call with caching
export const cachedFetch = async (url, options = {}, cacheTime = 3600000) => {
  const cacheKey = `fetch_${url}_${JSON.stringify(options)}`
  
  // Try cache first
  const cached = await cacheManager.get(cacheKey)
  if (cached) {
    return cached
  }

  // Fetch and cache
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    await cacheManager.set(cacheKey, data)
    return data
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}

