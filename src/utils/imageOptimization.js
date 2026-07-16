// src/utils/imageOptimization.js
// Progressive image loading
export const progressiveImageLoader = (lowQualitySrc, highQualitySrc, onLoad) => {
  const img = new Image()
  img.src = lowQualitySrc

  img.onload = () => {
    onLoad(lowQualitySrc)

    const highQualityImg = new Image()
    highQualityImg.src = highQualitySrc
    highQualityImg.onload = () => {
      onLoad(highQualitySrc)
    }
  }
}

// Lazy load images with Intersection Observer
export const lazyLoadImages = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.classList.add('loaded')
        observer.unobserve(img)
      }
    })
  })

  const images = document.querySelectorAll('img[data-src]')
  images.forEach(img => imageObserver.observe(img))
}

// Generate srcset for responsive images
export const generateSrcSet = (baseUrl, sizes = [400, 800, 1200, 1600]) => {
  return sizes.map(size => `${baseUrl}?w=${size} ${size}w`).join(', ')
}

