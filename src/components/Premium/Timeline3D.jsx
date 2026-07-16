// src/components/Premium/Timeline3D.jsx
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import styles from './Timeline3D.module.css'

const Timeline3D = ({ events }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div ref={ref} className={styles.timeline3D}>
      <div className={styles.timelineLine} />
      
      {events.map((event, index) => (
        <motion.div
          key={index}
          className={`${styles.timelineEvent} ${index % 2 === 0 ? styles.left : styles.right}`}
          initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotateY: 45 }}
          animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
          transition={{ duration: 0.8, delay: index * 0.2 }}
        >
          <div className={styles.eventCard}>
            <div className={styles.eventDate}>{event.date}</div>
            <div className={styles.eventContent}>
              <h4>{event.title}</h4>
              <p>{event.description}</p>
              {event.tags && (
                <div className={styles.eventTags}>
                  {event.tags.map((tag, i) => (
                    <span key={i} className={styles.tag}>{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className={styles.eventDot}>
            <div className={styles.dotInner} />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default Timeline3D

