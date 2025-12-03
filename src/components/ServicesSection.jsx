
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CustomTitle from './CustomTitle';
import { services } from './data/config.js';
import RotatingIcons from './RotatingIcons'; // Import the globe

export default function ServicesSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section className="relative mt-35" id="services">
      <CustomTitle title="What I Offer ?" />

      <div ref={containerRef} className="relative h-[400vh] mt-32">
        {/* Gradients */}
        <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
            via-[#785ae4] to-primary opacity-20 blur-[100px] left-10 top-0 hidden md:block pointer-events-none"></header>
        <header className="absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
            via-[#785ae4] to-primary opacity-20 blur-[100px] right-10 bottom-0 hidden md:block pointer-events-none"></header>

        {/* Layout container */}
        <div className="flex flex-col md:flex-row w-full h-full gap-10 px-6 md:px-16">
          {/* Globe on left (or top on mobile) */}
          <div className="w-full md:w-1/2 h-[400px] md:h-screen md:sticky top-0 flex items-center justify-center z-0">
            <div className="w-full h-full flex items-center justify-center">
              <RotatingIcons />
            </div>
          </div>

          {/* Cards on right (or below on mobile) */}
          <div className="w-full md:w-1/2 sticky top-1/2 -translate-y-1/2 max-w-[500px] h-[400px] md:pl-16 mx-auto">
            {services.map((item, index) => {
              const start = index / services.length;
              const end = (index + 1.5) / services.length;

              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.3, end - 0.4, end],
                [0, 1, 1, 0],
                { clamp: false }
              );

              const scale = useTransform(
                scrollYProgress,
                [start, start + 0.3, end - 0.3, end],
                [0.95, 1, 1, 0.95]
              );

              return (
                <motion.article
                  key={item.id}
                  style={{
                    opacity,
                    scale,
                    zIndex: services.length - index,
                  }}
                  className="absolute top-0 left-0 w-full h-[350px] p-5 grid place-items-center overflow-hidden rounded-[20px] shadow-lg"
                >
                  <section className="absolute w-[95%] h-[95%] bg-black rounded-[20px] z-10 text-center text-white">
                    <header className="border border-white bg-[#ffffff29] rounded-xl p-3 mb-6 min-h-full min-w-full flex items-center">
                      <section className="mt-4 space-y-4 px-2">
                        <h2 className="uppercase text-lg md:text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-cyan-200 to-secondary">
                          {item.title}
                        </h2>
                        <p className="md:text:lg text-white opacity-80">{item.description}</p>
                      </section>
                    </header>
                  </section>
                  <section className="absolute w-full h-[105%] bg-gradient-to-br from-white to-cyan-600 animate-spin-slow opacity-60" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 