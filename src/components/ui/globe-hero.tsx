"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

interface DotGlobeHeroProps {
  rotationSpeed?: number;
  globeRadius?: number;
  className?: string;
  children?: React.ReactNode;
}

const Globe: React.FC<{
  rotationSpeed: number;
  radius: number;
}> = ({ rotationSpeed, radius }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const points = useMemo(() => {
    const positions: number[] = [];
    const count = 3000;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      positions.push(x, y, z);
    }
    return new Float32Array(positions);
  }, [radius]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x += rotationSpeed * 0.3;
      groupRef.current.rotation.z += rotationSpeed * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length / 3}
            array={points}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.015}
          color="#ffffff"
          sizeAttenuation
          transparent
          opacity={0.8}
        />
      </points>
    </group>
  );
};

const STAR_COUNT = 8;

const ShootingStars: React.FC = () => {
  const starsRef = useRef<THREE.Group>(null!);

  const starData = useMemo(() => {
    return Array.from({ length: STAR_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 1.8 + Math.random() * 1.2;
      return {
        startX: Math.cos(angle) * dist,
        startY: (Math.random() - 0.5) * 3,
        startZ: Math.sin(angle) * dist,
        dirX: -Math.cos(angle) * 0.6 + (Math.random() - 0.5) * 0.3,
        dirY: (Math.random() - 0.5) * 0.4,
        dirZ: -Math.sin(angle) * 0.6 + (Math.random() - 0.5) * 0.3,
        speed: 0.008 + Math.random() * 0.015,
        progress: Math.random(),
        tailLength: 6 + Math.floor(Math.random() * 6),
      };
    });
  }, []);

  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const trailRefs = useRef<(THREE.Points | null)[]>([]);

  useFrame(() => {
    starData.forEach((star, i) => {
      star.progress += star.speed;
      if (star.progress > 1) {
        star.progress = 0;
        const angle = Math.random() * Math.PI * 2;
        const dist = 1.8 + Math.random() * 1.2;
        star.startX = Math.cos(angle) * dist;
        star.startY = (Math.random() - 0.5) * 3;
        star.startZ = Math.sin(angle) * dist;
        star.dirX = -Math.cos(angle) * 0.6 + (Math.random() - 0.5) * 0.3;
        star.dirY = (Math.random() - 0.5) * 0.4;
        star.dirZ = -Math.sin(angle) * 0.6 + (Math.random() - 0.5) * 0.3;
        star.speed = 0.008 + Math.random() * 0.015;
      }

      const t = star.progress;
      const x = star.startX + star.dirX * t * 4;
      const y = star.startY + star.dirY * t * 4;
      const z = star.startZ + star.dirZ * t * 4;

      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.set(x, y, z);
        const fade = t < 0.1 ? t / 0.1 : t > 0.7 ? (1 - t) / 0.3 : 1;
        (mesh.material as THREE.MeshBasicMaterial).opacity = fade * 0.95;
      }

      const trail = trailRefs.current[i];
      if (trail) {
        const geo = trail.geometry;
        const pos = geo.attributes.position as THREE.BufferAttribute;
        for (let j = 0; j < star.tailLength; j++) {
          const tt = t - j * 0.012;
          if (tt < 0) {
            pos.setXYZ(j, 999, 999, 999);
          } else {
            pos.setXYZ(
              j,
              star.startX + star.dirX * tt * 4,
              star.startY + star.dirY * tt * 4,
              star.startZ + star.dirZ * tt * 4
            );
          }
        }
        pos.needsUpdate = true;
        const fade = t < 0.1 ? t / 0.1 : t > 0.7 ? (1 - t) / 0.3 : 1;
        (trail.material as THREE.PointsMaterial).opacity = fade * 0.6;
      }
    });
  });

  return (
    <group ref={starsRef}>
      {starData.map((star, i) => (
        <React.Fragment key={i}>
          {/* Head glow */}
          <mesh ref={(el) => { meshRefs.current[i] = el; }}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#f0f5f4" transparent opacity={0.9} toneMapped={false} />
          </mesh>
          {/* Trail */}
          <points ref={(el) => { trailRefs.current[i] = el; }}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={star.tailLength}
                array={new Float32Array(star.tailLength * 3)}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.018}
              color="#60dfff"
              transparent
              opacity={0.5}
              sizeAttenuation
              toneMapped={false}
            />
          </points>
        </React.Fragment>
      ))}
    </group>
  );
};

const DotGlobeHero = React.forwardRef<HTMLDivElement, DotGlobeHeroProps>(
  ({ rotationSpeed = 0.005, globeRadius = 1, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("relative w-full min-h-screen overflow-hidden bg-background", className)}
        {...props}
      >
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          {children}
        </div>

        <div className="absolute inset-0 z-0">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 3]} />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.5} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <Globe rotationSpeed={rotationSpeed} radius={globeRadius} />
            <ShootingStars />
          </Canvas>
        </div>
      </div>
    );
  }
);

DotGlobeHero.displayName = "DotGlobeHero";

export { DotGlobeHero, type DotGlobeHeroProps };
