import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaAsterisk, FaPython } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiOllama, SiJupyter, SiMysql } from 'react-icons/si';
import { GiSpaceship, GiGalaxy, GiOrbital, GiStaryu, GiCometSpark } from 'react-icons/gi';

const CosmicCarousel = () => {
  const projects = [
    {
      id: 1,
      title: "Echo Virtual Assistant",
      description: "A lightweight, voice-controlled Python virtual assistant that can listen, talk, remember notes, tell jokes, open websites, do basic math, and even respond to random queries using an AI fallback model (Ollama with Mistral)",
      tags: ["Python", "Ollama", "Mistral"],
      image: "https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/become-a-virtual-assistant-featured-image.jpg",
      liveLink: "https://github.com/kanchfatema/Echo-Virtual-Assistant",
      codeLink: "https://github.com/kanchfatema/Echo-Virtual-Assistant",
      techIcons: [<FaPython />, <SiOllama />, <SiTypescript />]
    },
    {
      id: 2,
      title: "Customer Churn Project",
      description: "This project analyzes customer churn using a Decision Tree Classifier. The goal is to help telecom businesses understand why customers leave and what factors influence retention.",
      tags: ["python", "Pandas", "Jupyter Notebook"],
      image: "data:image/png;base64,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",
      liveLink: "https://github.com/kanchfatema/Customer-Churn-Project",
      codeLink: "https://github.com/kanchfatema/Customer-Churn-Project",
      techIcons: [<FaPython />, <SiTailwindcss />, <SiJupyter />]
    },
    {
      id: 3,
      title: "Online-Food-Delivery-Analysis",
      description: "This project presents a detailed analysis of online food delivery trends using Python and SQL. The full study is documented in a structured PDF report",
      tags: ["Python", "Sql", "Jupyter Notebook"],
      image: "https://media.licdn.com/dms/image/v2/D5612AQF8zW_XnNaglg/article-cover_image-shrink_720_1280/B56ZYkyiQxGUAI-/0/1744373951328?e=2147483647&v=beta&t=D5Cg7AZ_NZadwOTMP7hHlwxhpeH5uooygwjK7kzkRQo",
      liveLink: "https://github.com/kanchfatema/Online-Food-Delivery-Analysis",
      codeLink: "https://github.com/kanchfatema/Online-Food-Delivery-Analysis",
      techIcons: [<FaPython />, <SiMysql />, <SiJupyter />]
    },
    // {
    //   id: 4,
    //   title: "Galaxy Classification Tool",
    //   description: "Machine learning interface for classifying galaxy types from images.",
    //   tags: ["Python", "TensorFlow", "Flask"],
    //   image: "https://images.unsplash.com/photo-1464802686167-b939a6910659?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    //   liveLink: "#",
    //   codeLink: "#",
    //   techIcons: [<FaAsterisk />, <GiGalaxy />, <GiOrbital />]
    // }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const constraintsRef = useRef(null);

  useEffect(() => {
    let interval;
    if (!isHovered) {
      interval = setInterval(() => {
        setDirection(1);
        setCurrentIndex(prev => (prev + 1) % projects.length);
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isHovered, projects.length]);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex(prev => (prev + 1) % projects.length);
  };

  const goToProject = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1]
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1]
      }
    })
  };

  const starVariants = {
    initial: {
      opacity: 0,
      y: -20
    },
    animate: (i) => ({
      opacity: [0, 1, 0],
      y: [0, -40, -80],
      transition: {
        duration: 3,
        repeat: Infinity,
        delay: i * 0.2
      }
    })
  };

  const cometVariants = {
    initial: {
      x: -100,
      y: -100,
      opacity: 0
    },
    animate: {
      x: [0, 1200],
      y: [0, 600],
      opacity: [0, 1, 0],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatDelay: 4,
        ease: "linear"
      }
    }
  };

  return (
    <section className="relative py-16 px-4 overflow-hidden" id="work">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={starVariants}
            initial="initial"
            animate="animate"
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Comet animation */}
      <motion.div
        variants={cometVariants}
        initial="initial"
        animate="animate"
        className="absolute top-0 left-0 z-0"
      >
        <GiCometSpark className="text-cyan-300 text-4xl opacity-80" />
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
        >
          Explore Projects
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-300 mb-12 text-center max-w-3xl mx-auto"
        >
          Explore my interstellar projects that push boundaries beyond the stratosphere
        </motion.p>

        {/* Side decorative elements */}
        <div className="hidden lg:flex absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-20 flex-col gap-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="text-purple-400 text-5xl opacity-30"
          >
            <GiStaryu />
          </motion.div>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="text-cyan-400 text-3xl opacity-40 ml-8"
          >
            <GiStaryu />
          </motion.div>
        </div>

        <div className="hidden lg:flex absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-20 flex-col gap-8">
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="text-cyan-400 text-4xl opacity-30"
          >
            <GiStaryu />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="text-purple-400 text-2xl opacity-40 mr-8"
          >
            <GiStaryu />
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative h-[500px] rounded-2xl overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={constraintsRef}
        >
          <AnimatePresence custom={direction} initial={false}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              drag="x"
              dragConstraints={constraintsRef}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.x > 100) {
                  goToPrevious();
                } else if (offset.x < -100) {
                  goToNext();
                }
              }}
              className="absolute inset-0 flex"
            >
              {/* Project Background */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${projects[currentIndex].image})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"></div>
              </div>

              {/* Project Content */}
              <div className="relative z-10 flex flex-col justify-end p-8 h-full">
                <div className="max-w-xl">
                  <div className="flex items-center gap-4 mb-4">
                    {projects[currentIndex].techIcons.map((Icon, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * i }}
                        className="text-2xl text-cyan-400"
                      >
                        {Icon}
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full text-xs font-medium mb-4">
                      Project {currentIndex + 1}/{projects.length}
                    </span>
                  </motion.div>

                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-3xl font-bold mb-3 text-white"
                  >
                    {projects[currentIndex].title}
                  </motion.h3>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg text-gray-300 mb-6"
                  >
                    {projects[currentIndex].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-wrap gap-2 mb-6"
                  >
                    {projects[currentIndex].tags.map(tag => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-white bg-opacity-60 rounded-full text-xs border border-gray-700 hover:border-cyan-400 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex gap-3"
                  >
                    <a 
                      href={projects[currentIndex].liveLink}
                      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg font-medium transition-all text-sm"
                    >
                      <FiExternalLink /> Live Demo
                    </a>
                    <a 
                      href={projects[currentIndex].codeLink}
                      className="flex items-center gap-2 px-5 py-2 bg-cyan-200 hover:bg-gray-700 rounded-lg font-medium border border-gray-700 transition-all text-sm"
                    >
                      <FiGithub /> View Code
                    </a>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button 
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900 bg-opacity-60 hover:bg-opacity-90 border border-gray-700 hover:border-cyan-400 transition-all z-20"
            aria-label="Previous project"
          >
            <FiChevronLeft className="w-5 h-5 text-cyan-400" />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900 bg-opacity-60 hover:bg-opacity-90 border border-gray-700 hover:border-cyan-400 transition-all z-20"
            aria-label="Next project"
          >
            <FiChevronRight className="w-5 h-5 text-cyan-400" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToProject(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-cyan-400 w-6' : 'bg-gray-600 bg-opacity-50 hover:bg-gray-400'}`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CosmicCarousel;