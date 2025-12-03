import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { variants } from './data/config.js';
import InteractiveButton from './InteractiveButton.jsx';
import SocialButtons from './SocialButtons.jsx';

const roles = ['Designer', 'Data Analyst', 'Developer', 'Researcher'];
const period = 2000;

const HeroSection = () => {
  const resumeUrl = '/resume.pdf'; // update or replace with your actual resume path
  const handleHireClick = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    window.location.hash = 'contact';
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  // States for typewriter effect
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // Typewriter effect logic
  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % roles.length;
      const fullText = roles[i];
      
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );
      
      setTypingSpeed(isDeleting ? 80 : 150);
      
      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), period);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };
    
    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section className='relative w-full pointer-events-auto'>
      {/* Gradient headers with pointer-events-none to allow cursor to pass through */}
      <header className='absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
        via-[#785ae4] to-primary opacity-20 blur-[100px] left-10 top-0 hidden md:block pointer-events-none'></header>
      
      <header className='absolute w-1/2 aspect-[16/5] -skew-x-12 rounded-full bg-gradient-to-r from-[#007cda]
        via-[#785ae4] to-primary opacity-20 blur-[100px] right-10 bottom-0 hidden md:block pointer-events-none'></header>
      
      <section className='w-full px-5 sm:px-8 md:px-12 lg:px-0 max-w-screen-lg lg:max-w-screen-xl mx-auto relative'>
        <article className='grid lg:grid-cols-2 gap-10 xl:gap-6 relative pt-24 lg:max-w-none max-w-2xl md:max-w-3xl mx-auto'>
          <section className='lg:py-6'>
            {/* Social Buttons Mobile Display */}
            <div className='w-full mb-6 flex justify-center md:hidden'>
              <SocialButtons />
            </div>
            
            {/* Desktop Layout */}
            <div className='hidden md:flex justify-between'>
              <div className='md:block'>
                <SocialButtons />
              </div>
              
              <section className='ml-0 md:ml-12'>
                <header className='text-center lg:text-left'>
                  <h1 className='pt-4 text-white font-bold text-4xl md:text-5xl lg:text-6xl'>
                    Hi, I'm
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#dff9fb] to-[#00f7ff] animate-flicker outline-text">
                      {" Fatema"}
                    </span>
                  </h1>
                </header>
                
                <p className="text-gray-200 pt-10 text-center lg:text-left mx-auto max-w-[370px] md:max-w-xl text-lg md:text-xl leading-relaxed tracking-wide">
                  {"Aspiring data science professional seeking to gain in-depth knowledge and hands-on experience in the field by working with innovative companies. Highly motivated to apply analytical and problem solving skills to real world challenges."
                    .split(" ")
                    .map((word, index) => (
                      <span
                        key={index}
                        className="inline-block opacity-0 animate-fade-in-up"
                        style={{
                          animationDelay: `${index * 0.08}s`,
                          animationFillMode: "forwards",
                        }}
                      >
                        {word}&nbsp;
                      </span>
                    ))}
                </p>
                
                <section className='flex items-center gap-3 pt-9 flex-col sm:flex-row sm:w-max sm:mx-auto lg:mx-0'>
                  <figure className='w-56'>
                    <InteractiveButton text='Hire Me' onClick={handleHireClick} />
                  </figure>
                  
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-cyan-300 border border-cyan-300 rounded-3xl shadow-md hover:shadow-cyan-400/30 transition-all duration-300"
                    >
                      <svg viewBox="0 0 24 24" width={24} height={24}>
                        <motion.path
                          d="M12 15l5-5h-3V3h-4v7H7l5 5zm-7 2h14v2H5v-2z"
                          fill="#a6ffff"
                          stroke="#dff9fb"
                          strokeWidth={0.5}
                          variants={variants}
                          initial="initial"
                          animate="animate"
                        />
                      </svg>
                      <span className="font-semibold tracking-wide text-sm">Download Resume</span>
                    </motion.div>
                  </a>
                </section>
              </section>
            </div>
            
            {/* Mobile Content (without social buttons) */}
            <div className='md:hidden'>
              <header className='text-center'>
                <h1 className='pt-4 text-white font-bold text-4xl'>
                  Hi, I'm
                  <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#dff9fb] to-[#00f7ff] animate-flicker outline-text">
                    {" Fatema"}
                  </span>
                </h1>
              </header>
              
              <p className="text-gray-200 pt-10 text-center mx-auto max-w-[370px] text-lg leading-relaxed tracking-wide">
                {"Passionate data science student focused on turning complex data into meaningful solutions. I am both creative and analytical. I do my best work in team settings, enjoy learning continuously, and strive to make a real difference through my work."
                  .split(" ")
                  .map((word, index) => (
                    <span
                      key={index}
                      className="inline-block opacity-0 animate-fade-in-up"
                      style={{
                        animationDelay: `${index * 0.08}s`,
                        animationFillMode: "forwards",
                      }}
                    >
                      {word}&nbsp;
                    </span>
                  ))}
              </p>
              
              <section className='flex items-center gap-3 pt-9 flex-col sm:flex-row sm:w-max sm:mx-auto'>
                <figure className='w-56'>
                  <InteractiveButton text='Hire Me' onClick={handleHireClick} />
                </figure>
                
                <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="block">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md text-cyan-300 border border-cyan-300 rounded-3xl shadow-md hover:shadow-cyan-400/30 transition-all duration-300"
                  >
                    <svg viewBox="0 0 24 24" width={24} height={24}>
                      <motion.path
                        d="M12 15l5-5h-3V3h-4v7H7l5 5zm-7 2h14v2H5v-2z"
                        fill="#a6ffff"
                        stroke="#dff9fb"
                        strokeWidth={0.5}
                        variants={variants}
                        initial="initial"
                        animate="animate"
                      />
                    </svg>
                    <span className="font-semibold tracking-wide text-sm">Download Resume</span>
                  </motion.div>
                </a>
              </section>
            </div>
          </section>
          
          <figure className="lg:h-full md:flex md:justify-end mt-20 md:mt-0">
            <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] flex justify-center items-center">
              {/* Rest of the figure content remains unchanged */}
              {/* Animated background elements */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-cyan-400"
                    style={{
                      width: Math.random() * 6 + 2 + 'px',
                      height: Math.random() * 6 + 2 + 'px',
                      top: Math.random() * 100 + '%',
                      left: Math.random() * 100 + '%',
                    }}
                    animate={{
                      y: [Math.random() * 50, Math.random() * -50, Math.random() * 50],
                      x: [Math.random() * 50, Math.random() * -50, Math.random() * 50],
                      opacity: [0.4, 0.8, 0.4]
                    }}
                    transition={{
                      duration: Math.random() * 5 + 5,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                  />
                ))}
                
                {/* Decorative circles */}
                <motion.div
                  className="absolute w-16 h-16 rounded-full border-2 border-purple-300/40 top-10 right-20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity
                  }}
                />
                
                <motion.div
                  className="absolute w-20 h-20 rounded-full border-2 border-cyan-300/40 bottom-10 left-20"
                  animate={{
                    scale: [1.2, 1, 1.2],
                    opacity: [0.4, 0.7, 0.4],
                    rotate: [360, 180, 0]
                  }}
                  transition={{
                    duration: 7,
                    repeat: Infinity
                  }}
                />
              </div>
              
              {/* Original circle component */}
              <motion.div
                className="w-[358px] h-[358px] md:w-[408px] md:h-[408px] flex justify-center items-center p-3 rounded-full overflow-hidden relative"
                animate={{
                  backgroundColor: ['rgba(176, 224, 230, 0.8)', 'rgba(204, 204, 255, 0.9)', 'rgba(216, 191, 216, 0.8)'],
                  scale: [1, 1.1, 1],
                  rotate: [1, 5, 5, 1]
                }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType:'reverse'
                }}
              >
                <div className='absolute inset-0 rounded-full bg-gradient-to-r from-cyan-300 to-purple-200 blur-3xl opacity-60 h-full w-full' />
                <img 
                  src="/Fatema.jpg" 
                  alt="Profile Picture" 
                  className='relative z-10 rounded-full max-h-full shadow-2xl transform transition-transform duration-500 ease-out hover:scale-110' 
                />
              </motion.div>
              
              {/* Cloud speech bubble with typewriter effect */}
              <div className="absolute top-6 right-0 md:top-8 md:right-0 z-20">
                <motion.svg 
                  width="180" 
                  height="100" 
                  viewBox="0 0 180 100" 
                  className="drop-shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <path
                    d="M10,50 Q10,10 50,10 L130,10 Q170,10 170,50 Q170,90 130,90 L80,90 L60,110 L60,90 L50,90 Q10,90 10,50 Z"
                    fill="rgba(255, 255, 255, 0.9)"
                    stroke="rgba(176, 224, 230, 0.8)"
                    strokeWidth="2"
                  />
                </motion.svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <div className="font-bold text-lg flex">
                    <span className="text-purple-600">I'm a </span>
                    <span className="ml-2 text-cyan-600 min-w-20 inline-block">{text}</span>
                    <span className="text-cyan-600 animate-pulse">|</span>
                  </div>
                </div>
              </div>
              
              {/* Subtle glow effect around the main circle */}
              <motion.div 
                className="absolute rounded-full w-[370px] h-[370px] md:w-[420px] md:h-[420px] bg-transparent border border-cyan-200/30"
                animate={{
                  boxShadow: ['0 0 10px 5px rgba(176, 224, 230, 0.3)', '0 0 20px 10px rgba(204, 204, 255, 0.4)', '0 0 10px 5px rgba(176, 224, 230, 0.3)'],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 4,
                  ease: "easeInOut",
                  repeat: Infinity
                }}
              />
            </div>
          </figure>
        </article>
      </section>
    </section>
  );
};

export default HeroSection;