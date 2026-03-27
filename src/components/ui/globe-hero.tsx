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

/** Floating stars scattered across the scene */
const Stars: React.FC<{ count?: number }> = ({ count = 200 }) => {
  const groupRef = useRef<THREE.Group>(null!);

  const starData = useMemo(() => {
    const positions: number[] = [];
    const speeds: number[] = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      speeds.push(0.2 + Math.random() * 0.8);
    }
    return { positions: new Float32Array(positions), speeds };
  }, [count]);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    const posAttr = groupRef.current.children[0] as THREE.Points;
    const positions = (posAttr.geometry as THREE.BufferGeometry).attributes.position;
    for (let i = 0; i < count; i++) {
      const baseY = starData.positions[i * 3 + 1];
      (positions as THREE.BufferAttribute).setY(
        i,
        baseY + Math.sin(time * starData.speeds[i] + i) * 0.15
      );
    }
    positions.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={new Float32Array(starData.positions)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.025}
          color="#ffffff"
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>
    </group>
  );
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
      color: "#aaccff",
      transparent: true,
      opacity: 0.6,
    });
    return createTubeLine(points, 0.022, material);
  }, [radius]);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={ringRef} rotation={[Math.PI * 0.48, 0.05, 0.1]}>
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
    // Emissive material so Bloom picks it up
    const material = new THREE.MeshStandardMaterial({
      color: "#ffffff",
      emissive: "#ffffff",
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.75,
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
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <pointLight position={[-10, -10, -10]} intensity={0.4} />
            <Globe rotationSpeed={rotationSpeed} radius={globeRadius} />
            <OrbitRing radius={globeRadius} />
            <Stars count={250} />
          </Canvas>
        </div>
      </div>
    );
  }
);

DotGlobeHero.displayName = "DotGlobeHero";

export { DotGlobeHero, type DotGlobeHeroProps };
