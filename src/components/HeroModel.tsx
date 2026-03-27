import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, Float, ContactShadows } from '@react-three/drei';
import { useRef, useEffect, useState, Suspense } from 'react';
import * as THREE from 'three';

const Model = ({ scrollProgress }: { scrollProgress: number }) => {
  const { scene } = useGLTF('/models/brand-orbit.gltf');
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = mesh.material as THREE.MeshStandardMaterial;
          mat.metalness = 0.6;
          mat.roughness = 0.3;
        }
      }
    });
  }, [scene]);

  useFrame(({ pointer, clock }) => {
    if (!groupRef.current) return;

    // Mouse-tracked rotation
    targetRotation.current.x = pointer.y * 0.3;
    targetRotation.current.y = pointer.x * 0.5;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotation.current.x + scrollProgress * Math.PI * 0.5,
      0.05
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y + clock.getElapsedTime() * 0.15,
      0.05
    );

    // Scale pulse
    const pulse = 1 + Math.sin(clock.getElapsedTime() * 0.8) * 0.02;
    groupRef.current.scale.setScalar(pulse * 1.8);

    // Scroll-based vertical offset
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -scrollProgress * 2,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const GlowRing = () => {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.z = clock.getElapsedTime() * 0.3;
    ringRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.2) * 0.3;
    const s = 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.05;
    ringRef.current.scale.set(s, s, 1);
  });

  return (
    <mesh ref={ringRef}>
      <torusGeometry args={[2.2, 0.015, 16, 100]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
    </mesh>
  );
};

const Particles = () => {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  const positions = useRef<{ x: number; y: number; z: number; speed: number }[]>([]);

  useEffect(() => {
    positions.current = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: (Math.random() - 0.5) * 8,
      z: (Math.random() - 0.5) * 8,
      speed: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    positions.current.forEach((p, i) => {
      dummy.position.set(
        p.x + Math.sin(t * p.speed + i) * 0.3,
        p.y + Math.cos(t * p.speed + i * 0.5) * 0.3,
        p.z + Math.sin(t * p.speed * 0.5 + i) * 0.2
      );
      dummy.scale.setScalar(0.01 + Math.sin(t * 2 + i) * 0.005);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
    </instancedMesh>
  );
};

const LoadingFallback = () => (
  <Float speed={2} rotationIntensity={0.5}>
    <mesh>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={0.3} />
    </mesh>
  </Float>
);

const HeroModel = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-full" style={{ minHeight: '400px' }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-3, -2, -3]} intensity={0.3} color="#aaaaaa" />
        <pointLight position={[0, 3, 0]} intensity={0.6} color="#ffffff" />

        <Suspense fallback={<LoadingFallback />}>
          <Model scrollProgress={scrollProgress} />
        </Suspense>

        <GlowRing />
        <Particles />
        <ContactShadows
          position={[0, -2.5, 0]}
          opacity={0.3}
          scale={10}
          blur={2}
          far={4}
        />
      </Canvas>
    </div>
  );
};

useGLTF.preload('/models/brand-orbit.gltf');

export default HeroModel;
