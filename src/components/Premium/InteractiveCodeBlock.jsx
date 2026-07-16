// src/components/Premium/InteractiveCodeBlock.jsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styles from './InteractiveCodeBlock.module.css'

const InteractiveCodeBlock = ({ code, language, title }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <motion.div
      className={styles.codeBlock}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.codeHeader}>
        <div className={styles.dots}>
          <span className={styles.dot} style={{ background: '#ff5f56' }} />
          <span className={styles.dot} style={{ background: '#ffbd2e' }} />
          <span className={styles.dot} style={{ background: '#27c93f' }} />
        </div>
        <div className={styles.title}>{title}</div>
        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? <FaCheck /> : <FaCopy />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 var(--radius-lg) var(--radius-lg)',
          fontSize: '14px'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </motion.div>
  )
}

export default InteractiveCodeBlock

