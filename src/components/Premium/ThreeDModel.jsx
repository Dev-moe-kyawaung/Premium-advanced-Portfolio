// src/components/Premium/ThreeDModel.jsx
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import styles from './ThreeDModel.module.css'

const ThreeDModel = ({ modelType = 'android' }) => {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const rotationRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const width = canvas.width = canvas.offsetWidth * 2
    const height = canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    // 3D Cube vertices
    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]
    ]

    // Cube edges
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0],
      [4, 5], [5, 6], [6, 7], [7, 4],
      [0, 4], [1, 5], [2, 6], [3, 7]
    ]

    // Rotation matrices
    const rotateX = (point, angle) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        point[0],
        point[1] * cos - point[2] * sin,
        point[1] * sin + point[2] * cos
      ]
    }

    const rotateY = (point, angle) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        point[0] * cos + point[2] * sin,
        point[1],
        -point[0] * sin + point[2] * cos
      ]
    }

    const rotateZ = (point, angle) => {
      const cos = Math.cos(angle)
      const sin = Math.sin(angle)
      return [
        point[0] * cos - point[1] * sin,
        point[0] * sin + point[1] * cos,
        point[2]
      ]
    }

    // Project 3D to 2D
    const project = (point) => {
      const scale = 100
      const distance = 4
      const z = 1 / (distance - point[2])
      return [
        point[0] * scale * z + width / 4,
        point[1] * scale * z + height / 4
      ]
    }

    // Handle mouse movement
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width - 0.5,
        y: (e.clientY - rect.top) / rect.height - 0.5
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)'
      ctx.fillRect(0, 0, width / 2, height / 2)

      // Update rotation based on mouse
      rotationRef.current.x += (mouseRef.current.y * 0.02 - rotationRef.current.x) * 0.1
      rotationRef.current.y += (mouseRef.current.x * 0.02 - rotationRef.current.y) * 0.1

      // Add auto-rotation
      rotationRef.current.y += 0.005

      // Transform and project vertices
      const projectedVertices = vertices.map(vertex => {
        let point = [...vertex]
        point = rotateX(point, rotationRef.current.x)
        point = rotateY(point, rotationRef.current.y)
        point = rotateZ(point, Date.now() * 0.0001)
        return project(point)
      })

      // Draw edges with gradient
      edges.forEach(edge => {
        const [start, end] = edge
        const gradient = ctx.createLinearGradient(
          projectedVertices[start][0],
          projectedVertices[start][1],
          projectedVertices[end][0],
          projectedVertices[end][1]
        )
        gradient.addColorStop(0, '#00f0ff')
        gradient.addColorStop(1, '#ff006e')

        ctx.beginPath()
        ctx.moveTo(projectedVertices[start][0], projectedVertices[start][1])
        ctx.lineTo(projectedVertices[end][0], projectedVertices[end][1])
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2
        ctx.shadowBlur = 10
        ctx.shadowColor = '#00f0ff'
        ctx.stroke()
      })

      // Draw vertices
      projectedVertices.forEach(vertex => {
        ctx.beginPath()
        ctx.arc(vertex[0], vertex[1], 4, 0, Math.PI * 2)
        ctx.fillStyle = '#00f0ff'
        ctx.shadowBlur = 15
        ctx.shadowColor = '#00f0ff'
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.div
      className={styles.modelContainer}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.modelLabel}>{modelType}</div>
    </motion.div>
  )
}

export default ThreeDModel

