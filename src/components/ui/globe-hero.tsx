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

  const wireframeGeometries = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];

    // Latitude lines
    const latCount = 12;
    for (let i = 0; i <= latCount; i++) {
      const phi = (Math.PI * i) / latCount;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (2 * Math.PI * j) / 64;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      geometries.push(new THREE.BufferGeometry().setFromPoints(points));
    }

    // Longitude lines
    const lonCount = 18;
    for (let i = 0; i < lonCount; i++) {
      const theta = (2 * Math.PI * i) / lonCount;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (Math.PI * j) / 64;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      geometries.push(new THREE.BufferGeometry().setFromPoints(points));
    }

    return geometries;
  }, [radius]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x += rotationSpeed * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {wireframeGeometries.map((geo, i) => (
        <line key={i} geometry={geo}>
          <lineBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.35}
            linewidth={1}
          />
        </line>
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
          </Canvas>
        </div>
      </div>
    );
  }
);

DotGlobeHero.displayName = "DotGlobeHero";

export { DotGlobeHero, type DotGlobeHeroProps };
