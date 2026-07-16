// src/pages/CaseStudyTemplate.jsx
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  FaCalendar, FaUser, FaClock, FaTag, 
  FaGithub, FaExternalLinkAlt, FaCode 
} from 'react-icons/fa'
import LazyImage from '../components/Premium/LazyImage'
import InteractiveCodeBlock from '../components/Premium/InteractiveCodeBlock'
import styles from './CaseStudy.module.css'

const CaseStudyTemplate = ({ project }) => {
  const {
    title,
    subtitle,
    client,
    date,
    duration,
    category,
    tags,
    coverImage,
    overview,
    challenge,
    solution,
    technologies,
    features,
    results,
    codeSnippets,
    screenshots,
    testimonial,
    githubUrl,
    liveUrl
  } = project

  return (
    <>
      <Helmet>
        <title>{title} - Case Study | Moe Kyaw Aung</title>
        <meta name="description" content={subtitle} />
      </Helmet>

      <motion.article
        className={styles.caseStudy}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroOverlay} />
          <LazyImage
            src={coverImage}
            alt={title}
            className={styles.heroBg}
          />
          <div className={`container ${styles.heroContent}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.breadcrumb}>
                <a href="/projects">Projects</a> / <span>{category}</span>
              </div>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.subtitle}>{subtitle}</p>

              <div className={styles.meta}>
                <div className={styles.metaItem}>
                  <FaUser /> {client}
                </div>
                <div className={styles.metaItem}>
                  <FaCalendar /> {date}
                </div>
                <div className={styles.metaItem}>
                  <FaClock /> {duration}
                </div>
                <div className={styles.metaItem}>
                  <FaTag /> {category}
                </div>
              </div>

              <div className={styles.actions}>
                {githubUrl && (
                  <a href={githubUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    <FaGithub /> View Code
                  </a>
                )}
                {liveUrl && (
                  <a href={liveUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <div className="container">
          {/* Overview */}
          <section className={styles.section}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Project Overview</h2>
              <div className={styles.content}>
                <p>{overview}</p>
              </div>

              <div className={styles.tags}>
                {tags.map((tag, index) => (
                  <span key={index} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Challenge */}
          <section className={styles.section}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>The Challenge</h2>
              <div className={styles.content}>
                <p>{challenge}</p>
              </div>
            </motion.div>
          </section>

          {/* Solution */}
          <section className={styles.section}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>The Solution</h2>
              <div className={styles.content}>
                <p>{solution}</p>
              </div>
            </motion.div>
          </section>

          {/* Technologies */}
          <section className={styles.section}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Technologies Used</h2>
              <div className={styles.techGrid}>
                {technologies.map((tech, index) => (
                  <div key={index} className={styles.techCard}>
                    <div className={styles.techIcon}>
                      <FaCode />
                    </div>
                    <div className={styles.techName}>{tech}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Features */}
          <section className={styles.section}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Key Features</h2>
              <div className={styles.featuresList}>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className={styles.featureItem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={styles.featureNumber}>{index + 1}</div>
                    <div className={styles.featureContent}>
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Code Snippets */}
          {codeSnippets && codeSnippets.length > 0 && (
            <section className={styles.section}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2>Code Highlights</h2>
                {codeSnippets.map((snippet, index) => (
                  <InteractiveCodeBlock
                    key={index}
                    code={snippet.code}
                    language={snippet.language}
                    title={snippet.title}
                  />
                ))}
              </motion.div>
            </section>
          )}

          {/* Screenshots */}
          {screenshots && screenshots.length > 0 && (
            <section className={styles.section}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2>Screenshots</h2>
                <div className={styles.screenshotsGrid}>
                  {screenshots.map((screenshot, index) => (
                    <motion.div
                      key={index}
                      className={styles.screenshot}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <LazyImage
                        src={screenshot.src}
                        alt={screenshot.caption}
                      />
                      <p className={styles.caption}>{screenshot.caption}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {/* Results */}
          <section className={styles.section}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Results & Impact</h2>
              <div className={styles.resultsGrid}>
                {results.map((result, index) => (
                  <motion.div
                    key={index}
                    className={styles.resultCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={styles.resultValue}>{result.value}</div>
                    <div className={styles.resultLabel}>{result.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Testimonial */}
          {testimonial && (
            <section className={styles.section}>
              <motion.div
                className={styles.testimonialCard}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className={styles.quoteIcon}>"</div>
                <p className={styles.testimonialText}>{testimonial.text}</p>
                <div className={styles.testimonialAuthor}>
                  <img src={testimonial.avatar} alt={testimonial.name} />
                  <div>
                    <div className={styles.authorName}>{testimonial.name}</div>
                    <div className={styles.authorRole}>{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </section>
          )}

          {/* Call to Action */}
          <section className={styles.cta}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Interested in Working Together?</h2>
              <p>Let's discuss how I can help bring your project to life.</p>
              <a href="/contact" className="btn btn-primary">
                Get In Touch
              </a>
            </motion.div>
          </section>
        </div>
      </motion.article>
    </>
  )
}

export default CaseStudyTemplate

