// src/components/Premium/AdvancedLightbox.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaChevronLeft, FaChevronRight, FaDownload, FaExpand, FaCompress } from 'react-icons/fa'
import styles from './AdvancedLightbox.module.css'

const AdvancedLightbox = ({ images, isOpen, onClose, initialIndex = 0 }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          handlePrev()
          break
        case 'ArrowRight':
          handleNext()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, currentIndex])

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
    setIsZoomed(false)
    setZoomLevel(1)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
    setIsZoomed(false)
    setZoomLevel(1)
  }

  const handleZoomToggle = () => {
    setIsZoomed(!isZoomed)
    setZoomLevel(isZoomed ? 1 : 2)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = images[currentIndex].src
    link.download = images[currentIndex].title || 'image'
    link.click()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className={styles.lightbox}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className={styles.lightboxContent}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className={styles.header}>
            <div className={styles.imageInfo}>
              <h3>{images[currentIndex].title}</h3>
              <p>{currentIndex + 1} / {images.length}</p>
            </div>
            <div className={styles.actions}>
              <button onClick={handleZoomToggle} className={styles.actionBtn}>
                {isZoomed ? <FaCompress /> : <FaExpand />}
              </button>
              <button onClick={handleDownload} className={styles.actionBtn}>
                <FaDownload />
              </button>
              <button onClick={onClose} className={styles.closeBtn}>
                <FaTimes />
              </button>
            </div>
          </div>

          <div className={styles.imageContainer}>
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].title}
                className={styles.image}
                style={{ transform: `scale(${zoomLevel})` }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {images.length > 1 && (
              <>
                <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>
                  <FaChevronLeft />
                </button>
                <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>
                  <FaChevronRight />
                </button>
              </>
            )}
          </div>

          {images[currentIndex].description && (
            <div className={styles.description}>
              {images[currentIndex].description}
            </div>
          )}

          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`${styles.thumbnail} ${index === currentIndex ? styles.active : ''}`}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={image.src} alt={image.title} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AdvancedLightbox

