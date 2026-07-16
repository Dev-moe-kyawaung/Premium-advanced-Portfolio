// src/components/Premium/LazyImage.jsx
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './LazyImage.module.css'

const LazyImage = ({ 
  src, 
  alt, 
  placeholder, 
  className,
  onLoad 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder || '')
  const [imageLoaded, setImageLoaded] = useState(false)
  const imageRef = useRef(null)

  useEffect(() => {
    let observer
    let didCancel = false

    if (imageRef.current && IntersectionObserver) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (!didCancel && (entry.intersectionRatio > 0 || entry.isIntersecting)) {
              setImageSrc(src)
              observer.unobserve(imageRef.current)
            }
          })
        },
        {
          threshold: 0.01,
          rootMargin: '75%'
        }
      )
      observer.observe(imageRef.current)
    } else {
      setImageSrc(src)
    }

    return () => {
      didCancel = true
      if (observer && imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [src])

  const handleImageLoad = () => {
    setImageLoaded(true)
    if (onLoad) onLoad()
  }

  return (
    <div ref={imageRef} className={`${styles.imageWrapper} ${className || ''}`}>
      <motion.img
        src={imageSrc}
        alt={alt}
        className={`${styles.image} ${imageLoaded ? styles.loaded : ''}`}
        onLoad={handleImageLoad}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ 
          opacity: imageLoaded ? 1 : 0,
          scale: imageLoaded ? 1 : 1.1
        }}
        transition={{ duration: 0.6 }}
      />
      {!imageLoaded && (
        <div className={styles.placeholder}>
          <div className={styles.spinner} />
        </div>
      )}
    </div>
  )
}

export default LazyImage


