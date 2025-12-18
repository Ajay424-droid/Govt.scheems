import React from 'react';
import { motion } from 'framer-motion';
import '../css/MVofUs.css';
import OurMission from '../assets/poster/OurMission.jpg';
import OurVision from '../assets/poster/OurVision.jpeg';

// simple fade & slide up animation variants with delay based on index
const fadeAnim = {
  hidden: { opacity: 0, y: 50 },
  visible: (index = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.3,
      duration: 0.6,
    }
  }),
};

const MVofUs = () => {
  return (
    <>
      {/* Mission Section */}
      <motion.div
        className="row featurette my-5 justify-content-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeAnim}
        custom={1} // delay multiplier for animation
      >
        <div className="col-md-8">
          <h2 className="featurette-heading fw-normal lh-1 text-center custom-heading">
            Our Mission{' '}
            <span className="text-body-secondary">
              Empowering through awareness.
            </span>
          </h2>
          <p className="lead text-center custom-paragraph">
            We want to build a simple, centralized platform that gives clear info on Indian govt schemes — targeting students, farmers, women, seniors — so that no one misses out just because they didn’t know about it.
          </p>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-center">
          <motion.img
            src={OurMission}
            alt="Our Mission"
            className="img-fluid rounded"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
      </motion.div>

      {/* Vision Section */}
      <motion.div
        className="row featurette my-5 justify-content-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeAnim}
        custom={2} // second item delays more
      >
        <div className="col-md-8 order-md-2">
          <h2 className="featurette-heading fw-normal lh-1 text-center custom-heading">
            Our Vision{' '}
            <span className="text-body-secondary">
              Simplifying governance access.
            </span>
          </h2>
          <p className="lead text-center custom-paragraph">
            To be India’s go-to digital guide for government schemes — where user-friendly design meets clear info, and anyone can easily understand and benefit from welfare programs without hassle.
          </p>
        </div>
        <div className="col-md-4 order-md-1 d-flex align-items-center justify-content-center">
          <motion.img
            src={OurVision}
            alt="Our Vision"
            className="img-fluid rounded"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
          />
        </div>
      </motion.div>

      {/* TODO: Add a testimonial or user feedback section here later */}
    </>
  );
};

export default MVofUs;
