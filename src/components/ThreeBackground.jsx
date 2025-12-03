import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
    const mountRef = useRef(null);
    
    useEffect(() => {
        if (!mountRef.current) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);
        camera.position.z = 5;

        const starGeometry = new THREE.BufferGeometry();
        const starCount = 1500;
        const StarPosition = new Float32Array(starCount * 3);
        for(let i = 0; i < starCount * 3; i++){
            StarPosition[i] = (Math.random() - 0.5) * 100;
        }
        starGeometry.setAttribute('position', new THREE.BufferAttribute(StarPosition, 3));
        const starMaterial = new THREE.PointsMaterial({color: 0xffffff, size: 0.1});
        const starField = new THREE.Points(starGeometry, starMaterial);
        scene.add(starField);
        
        // Initialize cursor elements
        const cursorFollower = document.createElement('div');
        const cursorDot = document.createElement('div');
        
        // Determine if we're on mobile
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Adjust cursor size based on device
        const dotSize = isMobile ? 16 : 8;
        const followerSize = isMobile ? 40 : 20;
        
        // Style the outer follower (trail)
        cursorFollower.style.position = 'fixed';
        cursorFollower.style.width = `${followerSize}px`;
        cursorFollower.style.height = `${followerSize}px`;
        cursorFollower.style.borderRadius = '50%';
        cursorFollower.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
        cursorFollower.style.boxShadow = '0 0 10px 2px rgba(0, 255, 255, 0.7)';
        cursorFollower.style.pointerEvents = 'none';
        cursorFollower.style.zIndex = '9999';
        cursorFollower.style.transition = 'transform 0.15s ease-out, opacity 0.15s ease';
        cursorFollower.style.opacity = '0';
        
        // Style the inner dot
        cursorDot.style.position = 'fixed';
        cursorDot.style.width = `${dotSize}px`;
        cursorDot.style.height = `${dotSize}px`;
        cursorDot.style.borderRadius = '50%';
        cursorDot.style.backgroundColor = 'rgba(0, 255, 255, 1)';
        cursorDot.style.boxShadow = '0 0 5px 2px rgba(0, 255, 255, 0.7)';
        cursorDot.style.pointerEvents = 'none';
        cursorDot.style.zIndex = '10000';
        cursorDot.style.transition = 'opacity 0.15s ease';
        cursorDot.style.opacity = '0';
        
        document.body.appendChild(cursorFollower);
        document.body.appendChild(cursorDot);
        
        // Mouse handler for star parallax
        const handleStarParallax = (x, y) => {
            const normalizedX = (x / window.innerWidth) * 2 - 1;
            const normalizedY = (y / window.innerHeight) * 2 + 1;
            starField.rotation.x += normalizedY * 0.01; // Original speed
            starField.rotation.y += normalizedX * 0.01; // Original speed
        };
        
        // Update cursor position
        const updateCursorPosition = (x, y) => {
            const halfDotSize = dotSize / 2;
            const halfFollowerSize = followerSize / 2;
            
            // Position the dot directly at cursor/touch point
            cursorDot.style.transform = `translate(${x - halfDotSize}px, ${y - halfDotSize}px)`;
            cursorDot.style.opacity = '1';
            
            // Position the follower with slight delay for trail effect
            setTimeout(() => {
                cursorFollower.style.transform = `translate(${x - halfFollowerSize}px, ${y - halfFollowerSize}px)`;
                cursorFollower.style.opacity = '1';
            }, 80);
        };
        
        // Mouse event handlers
        const handleMouseMove = (event) => {
            handleStarParallax(event.clientX, event.clientY);
            updateCursorPosition(event.clientX, event.clientY);
        };
        
        const handleMouseLeave = () => {
            cursorDot.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        };
        
        const handleMouseEnter = () => {
            cursorDot.style.opacity = '1';
            cursorFollower.style.opacity = '1';
        };
        
        // Touch event handlers
        const handleTouchMove = (event) => {
            // Prevent default to avoid scrolling while interacting with canvas
            // but only if we're directly on the canvas
            if (event.target === renderer.domElement) {
                event.preventDefault();
            }
            
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                handleStarParallax(touch.clientX, touch.clientY);
                updateCursorPosition(touch.clientX, touch.clientY);
            }
        };
        
        const handleTouchStart = (event) => {
            if (event.touches.length > 0) {
                const touch = event.touches[0];
                updateCursorPosition(touch.clientX, touch.clientY);
            }
        };
        
        const handleTouchEnd = () => {
            cursorDot.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        };
        
        // Window resize handler
        const handleResize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        
        // Add event listeners
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseenter', handleMouseEnter);
        window.addEventListener('touchmove', handleTouchMove, { passive: false });
        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchend', handleTouchEnd);
        window.addEventListener('resize', handleResize);
        
        // Animation function - keeping original star rotation
        const animate = () => {
            requestAnimationFrame(animate);
            
            // Original star field rotation speed
            starField.rotation.x += 0.01;
            starField.rotation.y += 0.01;
            
            renderer.render(scene, camera);
        };
        
        animate();
        
        // Cleanup function
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseenter', handleMouseEnter);
            window.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchend', handleTouchEnd);
            window.removeEventListener('resize', handleResize);
            
            if (document.body.contains(cursorFollower)) {
                document.body.removeChild(cursorFollower);
            }
            
            if (document.body.contains(cursorDot)) {
                document.body.removeChild(cursorDot);
            }
            
            if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
                mountRef.current.removeChild(renderer.domElement);
            }
            
            // Dispose resources
            renderer.dispose();
            starGeometry.dispose();
            starMaterial.dispose();
        };
    }, []);
    
    return (
        <div
            ref={mountRef}
            className="fixed inset-0 -z-10 w-full h-full"
            style={{ cursor: 'none' }} // Hide the default cursor
        />
    );
};

export default ThreeBackground;