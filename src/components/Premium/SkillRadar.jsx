// src/components/Premium/SkillRadar.jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './SkillRadar.module.css'

const SkillRadar = ({ skills }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const maxRadius = Math.min(centerX, centerY) - 40

    const drawRadar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw background circles
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, (maxRadius / 5) * i, 0, Math.PI * 2)
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.1)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Draw axis lines
      const angleStep = (Math.PI * 2) / skills.length
      skills.forEach((_, index) => {
        const angle = angleStep * index - Math.PI / 2
        const x = centerX + Math.cos(angle) * maxRadius
        const y = centerY + Math.sin(angle) * maxRadius

        ctx.beginPath()
        ctx.moveTo(centerX, centerY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      })

      // Draw skill polygon
      ctx.beginPath()
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const distance = (skill.level / 100) * maxRadius
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      ctx.closePath()
      ctx.fillStyle = 'rgba(0, 240, 255, 0.2)'
      ctx.fill()
      ctx.strokeStyle = '#00f0ff'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw skill points
      skills.forEach((skill, index) => {
        const angle = angleStep * index - Math.PI / 2
        const distance = (skill.level / 100) * maxRadius
        const x = centerX + Math.cos(angle) * distance
        const y = centerY + Math.sin(angle) * distance

        ctx.beginPath()
        ctx.arc(x, y, 5, 0, Math.PI * 2)
        ctx.fillStyle = '#00f0ff'
        ctx.fill()
        ctx.strokeStyle = '#fff'
        ctx.lineWidth = 2
        ctx.stroke()

        // Draw labels
        const labelDistance = maxRadius + 20
        const labelX = centerX + Math.cos(angle) * labelDistance
        const labelY = centerY + Math.sin(angle) * labelDistance

        ctx.fillStyle = '#fff'
        ctx.font = '12px Rajdhani'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(skill.name, labelX, labelY)
      })
    }

    drawRadar()
  }, [skills])

  return (
    <motion.div
      className={styles.radarContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className={styles.canvas}
      />
    </motion.div>
  )
}

export default SkillRadar

