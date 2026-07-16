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
    let didCancel =

