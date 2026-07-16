// src/components/Premium/AnalyticsDashboard.jsx
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaEye, FaUsers, FaClock, FaChartLine, 
  FaGlobe, FaMobile, FaDesktop 
} from 'react-icons/fa'
import styles from './AnalyticsDashboard.module.css'

const AnalyticsDashboard = () => {
  const [stats, setStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    avgTimeOnSite: 0,
    bounceRate: 0
  })

  const [deviceStats, setDeviceStats] = useState({
    mobile: 45,
    desktop: 40,
    tablet: 15
  })

  const [topPages, setTopPages] = useState([
    { page: '/projects', views: 1250, percentage: 35 },
    { page: '/certificates', views: 980, percentage: 28 },
    { page: '/about', views: 720, percentage: 20 },
    { page: '/contact', views: 600, percentage: 17 }
  ])

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setStats(prev => ({
        totalViews: Math.min(prev.totalViews + Math.floor(Math.random() * 5), 15420),
        uniqueVisitors: Math.min(prev.uniqueVisitors + Math.floor(Math.random() * 2), 8930),
        avgTimeOnSite: Math.min(prev.avgTimeOnSite + Math.random() * 0.1, 4.8),
        bounceRate: Math.max(prev.bounceRate - Math.random() * 0.5, 32.5)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const StatCard = ({ icon: Icon, label, value, change, color }) => (
    <motion.div
      className={styles.statCard}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
    >
      <div className={styles.statIcon} style={{ background: color }}>
        <Icon />
      </div>
      <div className={styles.statInfo}>
        <div className={styles.statLabel}>{label}</div>
        <div className={styles.statValue}>{value}</div>
        {change && (
          <div className={`${styles.statChange} ${change > 0 ? styles.positive : styles.negative}`}>
            {change > 0 ? '↑' : '↓'} {Math.abs(change)}%
          </div>
        )}
      </div>
    </motion.div>
  )

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h2>Analytics Dashboard</h2>
        <div className={styles.liveIndicator}>
          <span className={styles.liveDot} />
          Live
        </div>
      </div>

      <div className={styles.statsGrid}>
        <StatCard
          icon={FaEye}
          label="Total Views"
          value={stats.totalViews.toLocaleString()}
          change={12.5}
          color="linear-gradient(135deg, #00f0ff, #0080ff)"
        />
        <StatCard
          icon={FaUsers}
          label="Unique Visitors"
          value={stats.uniqueVisitors.toLocaleString()}
          change={8.3}
          color="linear-gradient(135deg, #ff006e, #ff4d94)"
        />
        <StatCard
          icon={FaClock}
          label="Avg. Time on Site"
          value={`${stats.avgTimeOnSite.toFixed(1)}m`}
          change={5.2}
          color="linear-gradient(135deg, #8b00ff, #b450ff)"
        />
        <StatCard
          icon={FaChartLine}
          label="Bounce Rate"
          value={`${stats.bounceRate.toFixed(1)}%`}
          change={-3.7}
          color="linear-gradient(135deg, #00ff41, #00cc33)"
        />
      </div>

      <div className={styles.chartsGrid}>
        <motion.div
          className={styles.chartCard}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3>Device Distribution</h3>
          <div className={styles.deviceChart}>
            <div className={styles.deviceItem}>
              <div className={styles.deviceInfo}>
                <FaMobile className={styles.deviceIcon} style={{ color: '#00f0ff' }} />
                <span>Mobile</span>
              </div>
              <div className={styles.deviceBar}>
                <motion.div
                  className={styles.deviceProgress}
                  style={{ background: '#00f0ff' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${deviceStats.mobile}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <span className={styles.devicePercent}>{deviceStats.mobile}%</span>
            </div>

            <div className={styles.deviceItem}>
              <div className={styles.deviceInfo}>
                <FaDesktop className={styles.deviceIcon} style={{ color: '#ff006e' }} />
                <span>Desktop</span>
              </div>
              <div className={styles.deviceBar}>
                <motion.div
                  className={styles.deviceProgress}
                  style={{ background: '#ff006e' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${deviceStats.desktop}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
              <span className={styles.devicePercent}>{deviceStats.desktop}%</span>
            </div>

            <div className={styles.deviceItem}>
              <div className={styles.deviceInfo}>
                <FaGlobe className={styles.deviceIcon} style={{ color: '#8b00ff' }} />
                <span>Tablet</span>
              </div>
              <div className={styles.deviceBar}>
                <motion.div
                  className={styles.deviceProgress}
                  style={{ background: '#8b00ff' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${deviceStats.tablet}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.6 }}
                />
              </div>
              <span className={styles.devicePercent}>{deviceStats.tablet}%</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className={styles.chartCard}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h3>Top Pages</h3>
          <div className={styles.topPages}>
            {topPages.map((page, index) => (
              <motion.div
                key={page.page}
                className={styles.pageItem}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={styles.pageRank}>{index + 1}</div>
                <div className={styles.pageInfo}>
                  <div className={styles.pagePath}>{page.page}</div>
                  <div className={styles.pageViews}>{page.views.toLocaleString()} views</div>
                </div>
                <div className={styles.pagePercent}>{page.percentage}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AnalyticsDashboard

