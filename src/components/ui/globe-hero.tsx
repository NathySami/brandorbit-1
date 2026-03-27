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

const createTubeLine = (
  curve: THREE.Vector3[],
  tubeRadius: number,
  material: THREE.Material
) => {
  const path = new THREE.CatmullRomCurve3(curve, false);
  const geometry = new THREE.TubeGeometry(path, 64, tubeRadius, 6, false);
  return new THREE.Mesh(geometry, material);
};

const OrbitRing: React.FC<{ radius: number }> = ({ radius }) => {
  const ringRef = useRef<THREE.Group>(null!);

  const ring = useMemo(() => {
    const orbitRadius = radius * 1.5;
    const points: THREE.Vector3[] = [];
    for (let i = 0; i <= 128; i++) {
      const theta = (2 * Math.PI * i) / 128;
      points.push(
        new THREE.Vector3(
          orbitRadius * Math.cos(theta),
          0,
          orbitRadius * Math.sin(theta)
        )
      );
    }
    const material = new THREE.MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.5,
    });
    return createTubeLine(points, 0.012, material);
  }, [radius]);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={ringRef} rotation={[Math.PI * 0.35, 0.3, 0.15]}>
      <primitive object={ring} />
    </group>
  );
};

const Globe: React.FC<{
  rotationSpeed: number;
  radius: number;
}> = ({ rotationSpeed, radius }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const meshes = useMemo(() => {
    const material = new THREE.MeshBasicMaterial({
      color: "#ffffff",
      transparent: true,
      opacity: 0.6,
    });
    const tubeRadius = 0.008;
    const result: THREE.Mesh[] = [];

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
      result.push(createTubeLine(points, tubeRadius, material));
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
      result.push(createTubeLine(points, tubeRadius, material));
    }

    return result;
  }, [radius]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed;
      groupRef.current.rotation.x += rotationSpeed * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {meshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
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
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} />
            <Globe rotationSpeed={rotationSpeed} radius={globeRadius} />
            <OrbitRing radius={globeRadius} />
          </Canvas>
        </div>
      </div>
    );
  }
);

DotGlobeHero.displayName = "DotGlobeHero";

export { DotGlobeHero, type DotGlobeHeroProps };
