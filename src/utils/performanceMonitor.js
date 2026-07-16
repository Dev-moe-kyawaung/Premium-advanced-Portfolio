// src/utils/performanceMonitor.js
// Performance monitoring utilities
export class PerformanceMonitor {
  constructor() {
    this.metrics = {}
  }

  // Measure component render time
  measureRender(componentName, callback) {
    const startTime = performance.now()
    callback()
    const endTime = performance.now()
    const renderTime = endTime - startTime

    this.metrics[componentName] = {
      renderTime,
      timestamp: new Date().toISOString()
    }

    if (renderTime > 16) { // More than one frame (60fps)
      console.warn(`⚠️ Slow render detected in ${componentName}: ${renderTime.toFixed(2)}ms`)
    }

    return renderTime
  }

  // Measure API call performance
  async measureApiCall(endpoint, fetchFn) {
    const startTime = performance.now()
    try {
      const result = await fetchFn()
      const endTime = performance.now()
      const callTime = endTime - startTime

      console.log(`📊 API Call ${endpoint}: ${callTime.toFixed(2)}ms`)
      return result
    } catch (error) {
      console.error(`❌ API Call failed ${endpoint}:`, error)
      throw error
    }
  }

  // Get Web Vitals
  getWebVitals() {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const navigation = performance.getEntriesByType('navigation')[0]
      const paint = performance.getEntriesByType('paint')

      return {
        FCP: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
        LCP: navigation?.largestContentfulPaint,
        FID: navigation?.firstInputDelay,
        CLS: navigation?.cumulativeLayoutShift,
        TTFB: navigation?.responseStart - navigation?.requestStart
      }
    }
    return {}
  }

  // Memory usage
  getMemoryUsage() {
    if (performance.memory) {
      return {
        usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
        totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB',
        jsHeapSizeLimit: (performance.memory.jsHeapSizeLimit / 1048576).toFixed(2) + ' MB'
      }
    }
    return null
  }

  // Report all metrics
  report() {
    console.group('📊 Performance Report')
    console.table(this.metrics)
    console.log('Web Vitals:', this.getWebVitals())
    console.log('Memory Usage:', this.getMemoryUsage())
    console.groupEnd()
  }
}

export const performanceMonitor = new PerformanceMonitor()

