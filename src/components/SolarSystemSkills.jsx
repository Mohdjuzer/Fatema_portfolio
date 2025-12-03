import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const SolarSystemSkills = () => {
  const containerRef = useRef(null);

  // Planet data with base sizes and orbits (will be scaled in useEffect)
  const planets = [
    { name: 'EDA', level: '90%', color: '#61DAFB', size: 2.0, orbitRadius: 12, ring: false, type: 'gas', speed: 1.2 },
    { name: 'JavaScript', level: '92%', color: '#F7DF1E', size: 1.8, orbitRadius: 16, ring: false, type: 'rocky', speed: 1.4 },
    { name: 'TypeScript', level: '85%', color: '#3178C6', size: 1.6, orbitRadius: 20, ring: false, type: 'ice', speed: 1.5 },
    { name: 'R', level: '80%', color: '#049EF4', size: 1.4, orbitRadius: 24, ring: true, type: 'ice', speed: 1.25 },
    { name: 'Python', level: '88%', color: '#339933', size: 1.6, orbitRadius: 28, ring: false, type: 'rocky', speed: 1 },
    { name: 'Java', level: '75%', color: '#3776AB', size: 1.2, orbitRadius: 32, ring: false, type: 'rocky', speed: 1.4 },
    { name: 'Tabalue', level: '78%', color: '#E535AB', size: 1.4, orbitRadius: 36, ring: true, type: 'gas', speed: 1.5 },
    { name: 'Microsoft BI', level: '82%', color: '#1DA1F2', size: 1.0, orbitRadius: 40, ring: false, type: 'ice', speed: 1.2 }
  ];

  useEffect(() => {
    // Initialize scene
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const isMobile = width < 768; // Tailwind's md breakpoint

    // Responsive scaling factors
    const scaleFactor = isMobile ? 0.7 : 1;
    const cameraDistance = isMobile ? 40 : 60;
    
    // Scale planets based on device size
    const scaledPlanets = planets.map(planet => ({
      ...planet,
      size: planet.size * scaleFactor,
      orbitRadius: planet.orbitRadius * scaleFactor
    }));

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    // Start camera at 45 degree angle (x and z equal for 45° view)
    const startAngle = Math.PI / 4; // 45 degrees in radians
    camera.position.x = Math.sin(startAngle) * cameraDistance;
    camera.position.y = isMobile ? 15 : 20; // Slightly less elevation on mobile
    camera.position.z = Math.cos(startAngle) * cameraDistance;
    camera.lookAt(0, 0, 0); // Ensure camera looks at center

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Controls - only rotation, no zoom
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI;
    controls.minPolarAngle = 0;

    // Enhanced Sun with glow
    const sunGeometry = new THREE.SphereGeometry(4, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ 
      color: 0xFDB813,
      transparent: true,
      opacity: 0.9
    });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    scene.add(sun);

    // Sun glow effect
    const sunGlowGeometry = new THREE.SphereGeometry(5, 32, 32);
    const sunGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xFDB813,
      transparent: true,
      opacity: 0.3,
      side: THREE.BackSide
    });
    const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
    sun.add(sunGlow);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Stars background
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.8
    });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      starVertices.push(
        (Math.random() - 0.5) * 3000,
        (Math.random() - 0.5) * 3000,
        (Math.random() - 0.5) * 3000
      );
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create orbital paths (white circles)
    const orbitPaths = [];
    scaledPlanets.forEach(planetData => {
      const curve = new THREE.EllipseCurve(
        0, 0,
        planetData.orbitRadius,
        planetData.orbitRadius, // Equal x and y radius for perfect circle
        0, Math.PI * 2,
        false,
        0
      );

      const points = curve.getPoints(100);
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        linewidth: 2
      });
      const orbit = new THREE.Line(geometry, material);
      orbit.rotation.x = Math.PI / 2;
      scene.add(orbit);
      orbitPaths.push(orbit);
    });

    // Create planets
    const planetGroup = new THREE.Group();
    scaledPlanets.forEach((planetData, i) => {
      // Planet
      const geometry = new THREE.SphereGeometry(planetData.size, 32, 32);
      let material;
      
      switch(planetData.type) {
        case 'gas':
          material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(planetData.color),
            specular: 0x111111,
            shininess: 30,
            transparent: true,
            opacity: 0.9
          });
          break;
        case 'ice':
          material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(planetData.color),
            specular: 0xffffff,
            shininess: 100,
            transparent: true,
            opacity: 0.8
          });
          break;
        default: // rocky
          material = new THREE.MeshPhongMaterial({
            color: new THREE.Color(planetData.color),
            specular: 0x111111,
            shininess: 10,
            transparent: true,
            opacity: 0.95
          });
      }

      const planet = new THREE.Mesh(geometry, material);
      
      // Initial position
      const angle = (i / scaledPlanets.length) * Math.PI * 2;
      planet.position.x = Math.cos(angle) * planetData.orbitRadius;
      planet.position.z = Math.sin(angle) * planetData.orbitRadius; // Using Z-axis for flat circular orbit
      
      // Add rings if specified
      if (planetData.ring) {
        const ringGeometry = new THREE.RingGeometry(
          planetData.size * 1.3,
          planetData.size * 1.8,
          32
        );
        const ringMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color(planetData.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.6
        });
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.rotation.x = Math.PI / 2;
        planet.add(ring);
      }

      // Add planet label
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      const context = canvas.getContext('2d');
      context.fillStyle = 'rgba(0, 0, 0, 0.7)';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.font = 'Bold 30px Arial';
      context.textAlign = 'center';
      context.fillStyle = planetData.color;
      context.fillText(planetData.name, canvas.width/2, 30);
      context.font = '16px Arial';
      context.fillText(planetData.level, canvas.width/2, 60);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ 
        map: texture,
        transparent: true
      });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(isMobile ? 6 : 8, isMobile ? 3 : 4, 1);
      sprite.position.set(0, planetData.size * 2.5, 0);
      planet.add(sprite);

      // Store orbit data
      planet.userData = {
        orbitRadius: planetData.orbitRadius,
        speed: planetData.speed,
        angle: angle
      };

      planetGroup.add(planet);
    });

    scene.add(planetGroup);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate stars slightly
      stars.rotation.x += 0.0001;
      stars.rotation.y += 0.0001;
      
      // Rotate sun
      sun.rotation.y += 0.005;
      
      // Animate planets in perfect circles
      planetGroup.children.forEach(planet => {
        const time = Date.now() * 0.0005 * planet.userData.speed;
        
        // Update position in perfect circle (using x and z coordinates)
        planet.position.x = Math.cos(time + planet.userData.angle) * planet.userData.orbitRadius;
        planet.position.z = Math.sin(time + planet.userData.angle) * planet.userData.orbitRadius;
        planet.rotation.y += 0.01;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative h-screen w-full" id='skills'>
      {/* Container for Three.js scene */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Overlay title */}
      <div className="absolute top-10 left-0 right-0 text-center z-10">
        <h2 className="text-5xl font-bold text-white drop-shadow-lg">
          My Tech Universe
        </h2>
        <p className="text-xl text-gray-300 mt-4">
        Each planet represents a technology in my orbit
        </p>
      </div>
    </div>
  );
};

export default SolarSystemSkills;