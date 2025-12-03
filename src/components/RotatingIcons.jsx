import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

const techIcons = [
  '💻', '🖥️', '🌐', '🔒', '📡', '📱', '📈', '📊', '🔍', '⚙️', '🔧',
  '📂', '📋', '📄', '💾', '🖨️', '🔌', '📲', '📶', '🛒', '💳', '💰',
  '🏢', '🏦', '📦', '🔗', '📝', '📊', '📈', '📉', '🔐', '🔑', '📤',
  '📥', '📧', '📨', '📩', '⚡', '📟', '🔋'
];

const Background = () => (
  <div className="absolute inset-0 z-0 ">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,255,255,0.05),_transparent)] blur-3xl opacity-70" />
    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
  </div>
);

const Icon = ({ position, iconIndex, label }) => {
  const icon = techIcons[iconIndex % techIcons.length];
  const ref = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ref.current) {
      const pulse = 1 + 0.15 * Math.sin(t * 3 + iconIndex);
      ref.current.style.transform = `scale(${pulse})`;
    }
  });

  return (
    <mesh position={new THREE.Vector3(...position)}>
      <Html center>
        <div className="flex flex-col items-center group">
          <div
            ref={ref}
            title={icon}
            className="text-xl select-none rounded-full w-10 h-10 flex items-center justify-center bg-cyan-500/10 backdrop-blur-md text-white transition-all duration-300 group-hover:scale-125 group-hover:shadow-cyan-400/50"
          >
            {icon}
          </div>
          <span className="mt-1 text-xs text-cyan-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {label || icon}
          </span>
        </div>
      </Html>
    </mesh>
  );
};

const Connections = ({ points }) => {
  const [blinkingLines, setBlinkingLines] = useState(new Set());
  const connectionsPerIcon = 9; // Increased from 6 to 10

  const lines = [];
  for (let i = 0; i < points.length; i++) {
    const distances = points.map((p, j) => ({
      index: j,
      distance: new THREE.Vector3(...points[i]).distanceTo(new THREE.Vector3(...p)),
    }));

    const nearest = distances
      .filter(d => d.index !== i)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, connectionsPerIcon);

    for (let { index: j } of nearest) {
      const id = `${i}-${j}`;
      lines.push({ start: points[i], end: points[j], id });
    }
  }

  // Random blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      const newSet = new Set();
      for (let i = 0; i < 20; i++) {
        const randomIdx = Math.floor(Math.random() * lines.length);
        newSet.add(lines[randomIdx].id);
      }
      setBlinkingLines(newSet);
    }, 500);

    return () => clearInterval(interval);
  }, [lines]);

  return (
    <group>
      {lines.map(({ start, end, id }) => {
        const geometry = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(...start),
          new THREE.Vector3(...end)
        ]);

        const isGlowing = blinkingLines.has(id);

        return (
          <line key={id} geometry={geometry}>
            <lineBasicMaterial
              attach="material"
              color={isGlowing ? '#00ffff' : '#00ced1'}
              linewidth={2}
              transparent
              opacity={isGlowing ? 0.9 : 0.3}
            />
          </line>
        );
      })}
    </group>
  );
};

const Sphere = () => {
  const groupRef = useRef();

  const iconData = Array.from({ length: techIcons.length }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / techIcons.length);
    const theta = 2 * Math.PI * i / ((1 + Math.sqrt(5)) / 2);

    return {
      position: [
        5 * Math.cos(theta) * Math.sin(phi),
        5 * Math.sin(theta) * Math.sin(phi),
        5 * Math.cos(phi),
      ],
      id: i,
      label: `Tech ${i + 1}`,
    };
  });

  const positions = iconData.map(d => d.position);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.rotation.x += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {iconData.map((data, i) => (
        <Icon key={data.id} position={data.position} iconIndex={i} label={data.label} />
      ))}
      <Connections points={positions} />
    </group>
  );
};

export default function RotatingIcons() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Background />
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color={'#00ffff'} />
        <Sphere />
      </Canvas>
    </div>
  );
}
