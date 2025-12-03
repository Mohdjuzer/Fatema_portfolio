import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Create styles
    const cursorStyles = `
      body * {
        cursor: none !important;
      }
      
      #custom-cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background-color: rgba(0, 255, 255, 1);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 5px 2px rgba(0, 255, 255, 0.7);
        z-index: 999999;
        transform: translate(-50%, -50%);
        transition: opacity 0.15s ease;
      }
      
      #custom-cursor-follower {
        position: fixed;
        width: 20px;
        height: 20px;
        background-color: rgba(0, 255, 255, 0.3);
        border-radius: 50%;
        pointer-events: none;
        box-shadow: 0 0 10px 2px rgba(0, 255, 255, 0.7);
        z-index: 999998;
        transform: translate(-50%, -50%);
        transition: transform 0.12s ease-out, opacity 0.15s ease;
      }
      
      @media (max-width: 768px) {
        #custom-cursor-dot {
          width: 16px;
          height: 16px;
        }
        
        #custom-cursor-follower {
          width: 40px;
          height: 40px;
        }
      }
    `;

    // Add styles to document
    const styleElement = document.createElement('style');
    styleElement.innerHTML = cursorStyles;
    document.head.appendChild(styleElement);

    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.id = 'custom-cursor-dot';
    cursorDot.style.opacity = '0';
    
    const cursorFollower = document.createElement('div');
    cursorFollower.id = 'custom-cursor-follower';
    cursorFollower.style.opacity = '0';
    
    // Add cursor elements to body
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorFollower);

    let followerTimeout;

    // Mouse move handler
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Update cursor dot immediately
      cursorDot.style.left = `${clientX}px`;
      cursorDot.style.top = `${clientY}px`;
      cursorDot.style.opacity = '1';
      
      // Clear any existing timeout
      clearTimeout(followerTimeout);
      
      // Update follower with a slight delay
      followerTimeout = setTimeout(() => {
        cursorFollower.style.left = `${clientX}px`;
        cursorFollower.style.top = `${clientY}px`;
        cursorFollower.style.opacity = '1';
      }, 70);
      
      setPosition({ x: clientX, y: clientY });
      setVisible(true);
    };

    // Mouse leave handler
    const onMouseLeave = () => {
      cursorDot.style.opacity = '0';
      cursorFollower.style.opacity = '0';
      setVisible(false);
    };

    // Mouse enter handler
    const onMouseEnter = () => {
      cursorDot.style.opacity = '1';
      cursorFollower.style.opacity = '1';
      setVisible(true);
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      
      if (document.body.contains(cursorDot)) {
        document.body.removeChild(cursorDot);
      }
      
      if (document.body.contains(cursorFollower)) {
        document.body.removeChild(cursorFollower);
      }
      
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
      
      clearTimeout(followerTimeout);
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default CustomCursor;