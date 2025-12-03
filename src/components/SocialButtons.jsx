import React from 'react';
import { motion } from 'framer-motion';
import { socialIcons } from './data/config';

export default function SocialButtons() {
  const animationDuration = 4;
  
  const variants = {
    initial: { pathLength: 0, strokeOpacity: 1, fillOpacity: 0 },
    animate: {
      pathLength: 1,
      strokeOpacity: 0,
      fillOpacity: 1,
      transition: {
        duration: animationDuration,
        ease: 'easeInOut',
        strokeOpacity: {
          delay: animationDuration,
        },
        fillOpacity: {
          delay: animationDuration,
        },
      },
    },
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    },
  };
  
  return (
    <div className="flex flex-row md:flex-col items-center justify-center border border-cyan-300 bg-white/10 backdrop-blur-md rounded-3xl p-3 space-x-10 md:space-x-0 md:space-y-11 shadow-lg hover:shadow-cyan-400/30 transition-shadow w-full md:w-auto">
      {socialIcons.map((icon) => (
        <motion.a
          key={icon.id}
          href={icon.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.2 }}
          className="transition-transform duration-300 ease-in-out"
        >
          <svg viewBox={icon.viewBox} width={40} height={40}>
            <motion.path
              d={icon.path}
              fill="#a6ffff"
              stroke="#dff9fb"
              strokeWidth={1}
              variants={variants}
              initial="initial"
              animate="animate"
            />
          </svg>
        </motion.a>
      ))}
    </div>
  );
}