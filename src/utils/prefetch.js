// src/utils/prefetch.js
// Resource prefetching utilities
class PrefetchManager {
  constructor() {
    this.prefetchedUrls = new Set()
    this.observer = null
  }

  // Prefetch on hover
  prefetchOnHover(selector) {
    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest(selector)
      if (link && link.href && !this.prefetchedUrls.has(link.href)) {
        this.prefetch(link.href)
      }
    })
  }

  // Prefetch on viewport
  prefetchOnViewport(selector) {
    if (!('IntersectionObserver' in window)) return

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = entry.target
          if (link.href && !this.prefetchedUrls.has(link.href)) {
            this.prefetch(link.href)
            this.observer.unobserve(link)
          }
        }
      })
    }, {
      rootMargin: '50px'
    })

    document.querySelectorAll(selector).forEach(link => {
      this.observer.observe(link)
    })
  }

  // Prefetch resource
  prefetch(url) {
    if (this.prefetchedUrls.has(url)) return

    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = url
    link.as = 'document'
    document.head.appendChild(link)

    this.prefetchedUrls.add(url)
  }

  // Preload critical resources
  preloadCritical(resources) {
    resources.forEach(({ href, as, type }) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.href = href
      link.as = as
      if (type) link.type = type
      document.head.appendChild(link)
    })
  }

  // Preconnect to domains
  preconnect(domains) {
    domains.forEach(domain => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = domain
      document.head.appendChild(link)
    })
  }
}

export const prefetchManager = new PrefetchManager()

// Initialize prefetching
export const initPrefetch = () => {
  // Prefetch on hover
  prefetchManager.prefetchOnHover('a[href^="/"]')

  // Preconnect to external domains
  prefetchManager.preconnect([
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://res.cloudinary.com'
  ])

  // Preload critical resources
  prefetchManager.preloadCritical([
    { href: '/fonts/orbitron.woff2', as: 'font', type: 'font/woff2' },
    { href: '/fonts/rajdhani.woff2', as: 'font', type: 'font/woff2' }
  ])
}

