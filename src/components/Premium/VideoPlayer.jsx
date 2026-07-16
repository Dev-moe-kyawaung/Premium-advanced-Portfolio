// src/components/Premium/VideoPlayer.jsx
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FaPlay, FaPause, FaVolumeUp, FaVolumeMute, 
  FaExpand, FaCompress, FaCog 
} from 'react-icons/fa'
import styles from './VideoPlayer.module.css'

const VideoPlayer = ({ src, poster, title }) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => setCurrentTime(video.currentTime)
    const handleLoadedMetadata = () => setDuration(video.duration)
    const handleEnded = () => setIsPlaying(false)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    const percent = e.nativeEvent.offsetX / e.target.offsetWidth
    video.currentTime = percent * duration
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    videoRef.current.volume = newVolume
    setVolume(newVolume)
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    const video = videoRef.current
    video.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const toggleFullscreen = () => {
    const container = videoRef.current.parentElement
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
    setIsFullscreen(!isFullscreen)
  }

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate
    setPlaybackRate(rate)
    setShowSettings(false)
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div
      className={styles.playerContainer}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(isPlaying ? false : true)}
    >
      <video
        ref={videoRef}
        className={styles.video}
        poster={poster}
        onClick={togglePlay}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <motion.div
        className={styles.controls}
        initial={{ opacity: 1 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.progressBar} onClick={handleSeek}>
          <div
            className={styles.progress}
            style={{ width: `${(currentTime / duration) * 100}%` }}
          />
          <div
            className={styles.progressHandle}
            style={{ left: `${(currentTime / duration) * 100}%` }}
          />
        </div>

        <div className={styles.controlsBar}>
          <div className={styles.leftControls}>
            <button className={styles.controlBtn} onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <div className={styles.volumeControl}>
              <button className={styles.controlBtn} onClick={toggleMute}>
                {isMuted || volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className={styles.volumeSlider}
              />
            </div>

            <div className={styles.time}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>

          <div className={styles.rightControls}>
            <div className={styles.settingsContainer}>
              <button
                className={styles.controlBtn}
                onClick={() => setShowSettings(!showSettings)}
              >
                <FaCog />
              </button>

              {showSettings && (
                <motion.div
                  className={styles.settingsMenu}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className={styles.settingsTitle}>Playback Speed</div>
                  {[0.25, 0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                    <button
                      key={rate}
                      className={`${styles.settingsOption} ${playbackRate === rate ? styles.active : ''}`}
                      onClick={() => changePlaybackRate(rate)}
                    >
                      {rate}x {playbackRate === rate && '✓'}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            <button className={styles.controlBtn} onClick={toggleFullscreen}>
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </button>
          </div>
        </div>
      </motion.div>

      {!isPlaying && currentTime === 0 && (
        <motion.button
          className={styles.bigPlayBtn}
          onClick={togglePlay}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlay />
        </motion.button>
      )}

      {title && (
        <div className={styles.videoTitle}>
          {title}
        </div>
      )}
    </motion.div>
  )
}

export default VideoPlayer

