            </a>
                  )}
                </div>

                {/* Comments Section */}
                <div className={styles.commentsSection}>
                  <h3>Comments ({post.comments || 0})</h3>
                  
                  <form className={styles.commentForm}>
                    <textarea
                      placeholder="Share your thoughts..."
                      rows="4"
                      className={styles.commentInput}
                    />
                    <button type="submit" className="btn btn-primary">
                      Post Comment
                    </button>
                  </form>

                  <div className={styles.commentsList}>
                    {post.commentsList?.map((comment, index) => (
                      <motion.div
                        key={index}
                        className={styles.comment}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                      >
                        <img src={comment.avatar} alt={comment.author} />
                        <div className={styles.commentContent}>
                          <div className={styles.commentHeader}>
                            <strong>{comment.author}</strong>
                            <span>{comment.date}</span>
                          </div>
                          <p>{comment.text}</p>
                          <button className={styles.replyBtn}>Reply</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className={styles.newsletterCta}>
          <div className="container">
            <motion.div
              className={styles.newsletterCard}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3>Stay Updated</h3>
              <p>Subscribe to get the latest articles and insights delivered to your inbox.</p>
              <form className={styles.newsletterForm}>
                <input type="email" placeholder="Your email address" />
                <button type="submit" className="btn btn-primary">Subscribe</button>
              </form>
            </motion.div>
          </div>
        </section>
      </motion.article>
    </>
  )
}

export default BlogPostTemplate

