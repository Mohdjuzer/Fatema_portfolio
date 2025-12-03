import React from 'react';
import { motion } from 'framer-motion';

const timelineData = [
  { id: 1, title: 'S.S.C', description: 'Taiyabya High School, Mumbai', date: '2021-01-01' },
  { id: 2, title: 'H.S.C', description: 'K.C College, Mumbai', date: '2023-06-15' },
  { id: 3, title: 'B.S.C (N.E.P)', description: 'HSNC University, Mumbai', date: '2026-03-10' },
  { id: 4, title: 'Honours', description: 'HSNC University, Mumbai', date: '2028-01-20' },
];

function Timeline() {
  return (
    <section
      id="experience"
      style={{
        padding: '80px 20px',
        maxWidth: '1000px',
        margin: '0 auto',
        background: 'transparent',
        minHeight: '100vh',
        position: 'relative',
      }}
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          fontSize: '4rem',
          fontFamily: "'Orbitron', sans-serif",
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '3px',
          background: 'linear-gradient(90deg, #00d4ff, #ff00cc, #00d4ff)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          textShadow: '0 0 15px rgba(0, 212, 255, 0.8), 0 0 25px rgba(255, 0, 204, 0.6)',
          marginBottom: '80px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        Eductaion Timeline
      </motion.h1>
      <div
        style={{
          position: 'relative',
          padding: '0 50px',
        }}
        className="timeline"
      >
        <style>
          {`
            .timeline::before {
              content: '';
              position: absolute;
              left: 50%;
              top: 0;
              bottom: 0;
              width: 4px;
              background: linear-gradient(to bottom, #00d4ff, #ff00cc);
              transform: translateX(-50%);
              border-radius: 2px;
              box-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
            }
            .timeline-item {
              position: relative;
              width: 45%;
              margin: 40px 0;
            }
            .timeline-item::before {
              content: '';
              position: absolute;
              top: 20px;
              width: 16px;
              height: 16px;
              background: radial-gradient(circle, #fff, #00d4ff);
              border: 3px solid #ff00cc;
              border-radius: 50%;
              z-index: 1;
              box-shadow: 0 0 8px rgba(255, 0, 204, 0.7);
            }
            .timeline-item.left {
              margin-right: 55%;
            }
            .timeline-item.right {
              margin-left: 55%;
            }
            .timeline-item.left::before {
              right: -58px;
            }
            .timeline-item.right::before {
              left: -58px;
            }

            /* Mobile Responsive Styles */
            @media (max-width: 768px) {
              .timeline {
                padding: 0 20px;
              }
              .timeline::before {
                left: 20px; /* Move line to left on mobile */
                transform: none;
              }
              .timeline-item {
                width: 100%; /* Full width on mobile */
                margin: 30px 0; /* Reduced margin */
                margin-left: 40px; /* Align with line */
                margin-right: 0;
              }
              .timeline-item.left, .timeline-item.right {
                margin-right: 0;
                margin-left: 40px; /* Consistent alignment */
              }
              .timeline-item::before {
                left: -36px; /* Dot aligns with line */
                right: auto;
                top: 15px; /* Adjust for smaller padding */
              }
            }

            @media (max-width: 480px) {
              .timeline {
                padding: 0 10px;
              }
              .timeline-item {
                margin-left: 30px;
                padding: 15px; /* Smaller padding */
              }
              .timeline::before {
                left: 15px;
              }
              .timeline-item::before {
                left: -26px;
                width: 12px;
                height: 12px; /* Smaller dot */
              }
            }
          `}
        </style>

        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          return (
            <motion.div
              key={item.id}
              className={`timeline-item ${isLeft ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: isLeft ? -150 : 150 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: 'easeOut',
                  delay: index * 0.2,
                },
              }}
              animate={{
                opacity: 0,
                x: isLeft ? -150 : 150,
                transition: {
                  duration: 0.8,
                  ease: 'easeIn',
                  delay: (timelineData.length - index - 1) * 0.2,
                },
              }}
              viewport={{ once: false, amount: 0.3 }}
              style={{
                padding: '20px',
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.2), rgba(255, 0, 204, 0.2))',
                borderRadius: '12px',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3), inset 0 0 10px rgba(0, 212, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <h2
                style={{
                  fontSize: '1.5rem',
                  color: '#00d4ff',
                  margin: '0 0 10px',
                  fontFamily: "'Orbitron', sans-serif",
                  textShadow: '0 0 5px rgba(0, 212, 255, 0.7)',
                }}
              >
                {item.title}
              </h2>
              <p
                style={{
                  fontSize: '1rem',
                  color: '#e6e6e6',
                  margin: '0 0 10px',
                  lineHeight: '1.5',
                  fontFamily: "'Roboto', sans-serif",
                }}
              >
                {item.description}
              </p>
              <span
                style={{
                  fontSize: '0.9rem',
                  color: '#ff00cc',
                  fontStyle: 'italic',
                  textShadow: '0 0 3px rgba(255, 0, 204, 0.5)',
                }}
              >
                {item.date}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Timeline;