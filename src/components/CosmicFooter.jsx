import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

const CosmicFooter = () => {
  const currentYear = new Date().getFullYear();
  const shootingStarRef = useRef(null);

  // Shooting star animation
  useEffect(() => {
    const star = shootingStarRef.current;
    if (!star) return;

    let posX = -100;
    let opacity = 0;
    const animate = () => {
      posX += 2;
      opacity = Math.min(1, (posX + 100) / 50);
      star.style.left = `${posX}%`;
      star.style.opacity = opacity;
      if (posX > 200) posX = -100;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <footer className="relative h-30 bg-[#faf9f7] overflow-hidden border-t border-gray-100">
      {/* Subtle static starfield */}
      <div className="absolute inset-0 h-full w-full opacity-20 pointer-events-none">
        <Canvas>
          <Stars
            radius={60}
            depth={40}
            count={300}
            factor={1.5}
            saturation={0}
            fade
            speed={0}
          />
        </Canvas>
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        {/* Name with floating letters */}
        <motion.div 
          className="text-3xl font-light tracking-wider text-gray-800 mb-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {['F','A','T','E','M','A'].map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { type: 'spring', damping: 12 }
                }
              }}
              whileHover={{ y: -5 }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Copyright text */}
        <motion.p
          className="text-sm text-gray-500/90"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          © {currentYear} | CopyRight Resereved
        </motion.p>

        {/* Subtle shooting star */}
        <div
          ref={shootingStarRef}
          className="absolute w-[2px] h-[2px] bg-blue-300/70 rounded-full shadow-sm shadow-blue-200"
          style={{ top: '30%', left: '-100%' }}
        />
      </div>
    </footer>
  );
};

export default CosmicFooter;