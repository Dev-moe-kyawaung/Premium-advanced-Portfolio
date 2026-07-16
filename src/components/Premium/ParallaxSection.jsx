// src/components/Premium/ParallaxSection.jsx
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import styles from './ParallaxSection.module.css'

const ParallaxSection = ({ children, speed = 0.5, className }) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0])

  return (
    <div ref={ref} className={`${styles.parallaxSection} ${className || ''}`}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  )
}

export default ParallaxSection

