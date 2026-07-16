// src/components/Premium/AdvancedCarousel.jsx
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa'
import styles from './AdvancedCarousel.module.css'

const AdvancedCarousel = ({ items, autoPlay = true, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  useEffect(() => {
    if (!autoPlay) return

    const timer = setInterval(() => {
      handleNext()
    }, interval)

    return () => clearInterval(timer)
  }, [currentIndex, autoPlay, interval])

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }

  const handlePrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction > 0 ? 45 : -45
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      rotateY: direction < 0 ? 45 : -45
    })
  }

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.carousel}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.4 }
            }}
            className={styles.slide}
          >
            <div className={styles.slideContent}>
              {items[currentIndex].image && (
                <div className={styles.slideImage}>
                  <img src={items[currentIndex].image} alt={items[currentIndex].title} />
                  <button className={styles.expandBtn}>
                    <FaExpand />
                  </button>
                </div>
              )}
              <div className={styles.slideInfo}>
                <h3>{items[currentIndex].title}</h3>
                <p>{items[currentIndex].description}</p>
                {items[currentIndex].tags && (
                  <div className={styles.slideTags}>
                    {items[currentIndex].tags.map((tag, i) => (
                      <span key={i} className={styles.tag}>{tag}</span>
                    ))}
                  </div>
                )}
                {items[currentIndex].link && (
                  <a href={items[currentIndex].link} className={styles.slideLink}>
                    View Project →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>
          <FaChevronLeft />
        </button>
        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>
          <FaChevronRight />
        </button>
      </div>

      <div className={styles.dots}>
        {items.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => handleDotClick(index)}
          >
            <span className={styles.dotInner} />
          </button>
        ))}
      </div>

      <div className={styles.counter}>
        {String(currentIndex + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
      </div>
    </div>
  )
}

export default AdvancedCarousel

