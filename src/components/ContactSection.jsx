import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import emailjs from '@emailjs/browser';

// Animated stars background component
function AnimatedStars() {
  return (
    <Stars 
      radius={100} 
      depth={50} 
      count={5000} 
      factor={4} 
      saturation={0} 
      fade 
      speed={1} 
    />
  );
}

// Contact form validation
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

const ContactSection = () => {
  // Initialize EmailJS in the component with useEffect
  useEffect(() => {
    // Initialize EmailJS with your public key
    emailjs.init("Mosb1ECduHChKoWIH");
  }, []);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required";
    if (!formData.email) {
      tempErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.message) tempErrors.message = "Message is required";
    return tempErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Prepare template parameters - make sure these match your EmailJS template variables
      const templateParams = {
        from_name: formData.name,
        reply_to: formData.email,
        phone_number: formData.phone || 'Not provided',
        message: formData.message,
        time: new Date().toLocaleString() // Adding current date/time for the time variable
      };
      
      // Send email using EmailJS
      const response = await emailjs.send(
        'service_s5djoha',      // Your service ID
        'template_88pc771',     // Your template ID (fixed the typo)
        templateParams,
        'Mosb1ECduHChKoWIH'     // Your public key
      );
      
      console.log('SUCCESS!', response.status, response.text);
      
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitError("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen overflow-hidden">
      {/* Three.js Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ambientLight intensity={0.3} />
          <AnimatedStars />
        </Canvas>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-start gap-12">
        {/* Left Column - Contact Details */}
        <motion.div 
          className="w-full lg:w-2/5 bg-black bg-opacity-40 p-8 rounded-lg backdrop-filter backdrop-blur-md border border-purple-900"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-8 after:content-[''] after:block after:w-24 after:h-1 after:bg-purple-500 after:mt-2"
            variants={itemVariants}
          >
            Contact Information
          </motion.h2>

          <motion.div className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-purple-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
               <a 
    href="https://www.google.com/maps?q=Bhuleshwar+Mumbai+Maharashtra+India" 
    target="_blank" 
    rel="noopener noreferrer"
    className="cursor-pointer"
  >
                
                <h3 className="text-xl font-semibold text-white">Address</h3>
                <p className="text-gray-300 mt-1">Bhuleshwar, Mumbai</p>
                <p className="text-gray-300">Maharasthra , India</p>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-purple-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
               <a 
    href="mailto:Fatemakanchwala00@gmail.com"
    className="cursor-pointer"
  >
                <h3 className="text-xl font-semibold text-white">Email</h3>
                <p className="text-gray-300 mt-1">Fatemakanchwala00@gmail.com</p>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-start space-x-4">
              <div className="bg-purple-600 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
               <a 
    href="tel:+917977552274"
    className="cursor-pointer"
  >
                <h3 className="text-xl font-semibold text-white">Phone</h3>
                <p className="text-gray-300 mt-1">+91 7977552274</p>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-12">
              <h3 className="text-xl font-semibold text-white mb-4">Connect With Me</h3>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/fr.faatema?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                  </svg>
                </a>
                <a href="https://www.instagram.com/fr.faatema?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/fatema-k-397565273?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BfxEBRvh6SyeSqkP%2FMFQ6Vw%3D%3D" className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 16h-2v-6h2v6zm-1-6.891c-.607 0-1.1-.496-1.1-1.109 0-.612.492-1.109 1.1-1.109s1.1.497 1.1 1.109c0 .613-.493 1.109-1.1 1.109zm8 6.891h-1.998v-2.861c0-1.881-2.002-1.722-2.002 0v2.861h-2v-6h2v1.093c.872-1.616 4-1.736 4 1.548v3.359z"></path>
                  </svg>
                </a>
                <a href="https://github.com/kanchfatema" className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition-colors">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right Column - Contact Form */}
        <motion.div 
          className="w-full lg:w-3/5 bg-black bg-opacity-40 p-8 rounded-lg backdrop-filter backdrop-blur-md border border-purple-900"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-8 after:content-[''] after:block after:w-24 after:h-1 after:bg-purple-500 after:mt-2"
            variants={itemVariants}
          >
            Send a Message
          </motion.h2>

          {submitSuccess ? (
            <motion.div 
              className="bg-green-500 bg-opacity-20 border border-green-500 text-green-300 p-4 rounded-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Your message has been sent successfully! I'll get back to you soon.
            </motion.div>
          ) : null}

          {submitError ? (
            <motion.div 
              className="bg-red-500 bg-opacity-20 border border-red-500 text-red-300 p-4 rounded-lg mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {submitError}
            </motion.div>
          ) : null}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-gray-300 mb-2">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-900 bg-opacity-50 border ${errors.name ? 'border-red-500' : 'border-purple-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-gray-300 mb-2">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-900 bg-opacity-50 border ${errors.email ? 'border-red-500' : 'border-purple-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </motion.div>
            </div>

            <motion.div className="mb-6" variants={itemVariants}>
              <label htmlFor="phone" className="block text-gray-300 mb-2">Phone (optional)</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-900 bg-opacity-50 border border-purple-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </motion.div>

            <motion.div className="mb-6" variants={itemVariants}>
              <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
              <textarea 
                id="message" 
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5" 
                className={`w-full bg-gray-900 bg-opacity-50 border ${errors.message ? 'border-red-500' : 'border-purple-700'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </motion.div>

            <motion.button 
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute w-8 h-8 bg-purple-500 rounded-full opacity-20"
          animate={{ 
            x: [0, 100, 50, 200, 0], 
            y: [0, 200, 100, 50, 0],
            scale: [1, 1.5, 0.5, 1.2, 1],
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{ top: '10%', left: '20%' }}
        />
        <motion.div 
          className="absolute w-6 h-6 bg-blue-500 rounded-full opacity-20"
          animate={{ 
            x: [0, -150, -50, -200, 0], 
            y: [0, 100, 200, 50, 0],
            scale: [1, 0.5, 1.5, 0.8, 1],
          }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{ top: '30%', right: '20%' }}
        />
        <motion.div 
          className="absolute w-10 h-10 bg-indigo-500 rounded-full opacity-20"
          animate={{ 
            x: [0, 200, 50, 100, 0], 
            y: [0, -100, -200, -50, 0],
            scale: [1, 1.2, 0.7, 1.5, 1],
          }}
          transition={{ 
            duration: 30, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          style={{ bottom: '20%', left: '30%' }}
        />
      </div>
    </section>
  );
};

export default ContactSection;