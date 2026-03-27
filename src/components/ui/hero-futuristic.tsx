'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import brandOrbitLogo from '@/assets/BrandOrbit_Logo.jpg';

const MODEL_PATH = '/models/brand_orbit_3d.gltf';

// Preload the model
useGLTF.preload(MODEL_PATH);

const BrandModel = ({ scrollProgress }: { scrollProgress: number }) => {
  const { scene } = useGLTF(MODEL_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone();
          mat.metalness = 0.6;
          mat.roughness = 0.25;
          mat.envMapIntensity = 1.5;
          mesh.material = mat;
        }
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    // Auto-fit model to viewport
    if (groupRef.current) {
      const box = new THREE.Box3().setFromObject(clonedScene);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = (viewport.width * 0.35) / maxDim;
      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
    }
  }, [clonedScene, viewport.width]);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Idle float rotation
    const idleRotY = Math.sin(t * 0.3) * 0.15;
    const idleRotX = Math.sin(t * 0.2) * 0.05;

    // Scroll-driven rotation (full 360° Y spin over scroll)
    const scrollRotY = scrollProgress * Math.PI * 2;
    // Scroll-driven vertical lift
    const scrollLiftY = scrollProgress * 1.5;
    // Scroll-driven zoom push
    const scrollZ = scrollProgress * -2;

    groupRef.current.rotation.y = idleRotY + scrollRotY;
    groupRef.current.rotation.x = idleRotX + scrollProgress * 0.3;
    groupRef.current.position.y += (scrollLiftY - groupRef.current.position.y) * 0.05;
    groupRef.current.position.z += (scrollZ - groupRef.current.position.z) * 0.05;

    // Mouse parallax
    groupRef.current.rotation.y += pointer.x * 0.15;
    groupRef.current.rotation.x += pointer.y * -0.08;
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} />
    </group>
  );
};

const SceneLights = () => (
  <>
    <ambientLight intensity={0.4} />
    <directionalLight position={[5, 8, 5]} intensity={1.2} color="#ffffff" castShadow />
    <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#aaaaaa" />
    <pointLight position={[0, 5, 0]} intensity={0.6} color="#ffffff" distance={20} />
    <spotLight position={[0, 10, 8]} angle={0.4} penumbra={0.8} intensity={0.8} color="#ffffff" />
  </>
);

export interface HeroFuturisticProps {
  title?: string;
  subtitle?: string;
  showScrollIndicator?: boolean;
  children?: React.ReactNode;
}

export const HeroFuturistic = ({
  title = "Transform Your Brand's Digital Orbit",
  subtitle = 'Pull your brand into its next orbit of success with cutting-edge digital transformation.',
  showScrollIndicator = true,
  children,
}: HeroFuturisticProps) => {
  const titleWords = title.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / rect.height));
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setDelays(titleWords.map(() => Math.random() * 0.07));
    setSubtitleDelay(Math.random() * 0.1);
  }, [titleWords.length]);

  useEffect(() => {
    if (visibleWords < titleWords.length) {
      const timeout = setTimeout(() => setVisibleWords(visibleWords + 1), 400);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => setSubtitleVisible(true), 600);
      return () => clearTimeout(timeout);
    }
  }, [visibleWords, titleWords.length]);

  return (
    <div ref={heroRef} className="relative w-full min-h-[150vh] overflow-hidden bg-background">
      {/* Sticky content wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Text Overlay */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
          <div
            className="text-center max-w-4xl transition-all duration-300"
            style={{
              opacity: 1 - scrollProgress * 2.5,
              transform: `translateY(${scrollProgress * -80}px) scale(${1 - scrollProgress * 0.15})`,
            }}
          >
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <img
                src={brandOrbitLogo}
                alt="Brand Orbit"
                className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-90"
              />
            </div>

            {/* Title */}
            <div className="overflow-hidden mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
                {titleWords.map((word, index) => (
                  <span
                    key={index}
                    className="inline-block mr-[0.3em] transition-all duration-700"
                    style={{
                      opacity: index < visibleWords ? 1 : 0,
                      transform: index < visibleWords ? 'translateY(0)' : 'translateY(40px)',
                      transitionDelay: `${delays[index] || 0}s`,
                      color:
                        word === 'Digital' || word === 'Orbit'
                          ? 'hsl(var(--primary))'
                          : 'hsl(var(--foreground))',
                      textShadow:
                        index < visibleWords ? '0 0 40px hsl(var(--primary) / 0.3)' : 'none',
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h1>
            </div>

            {/* Subtitle */}
            <div className="overflow-hidden">
              <p
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto transition-all duration-1000"
                style={{
                  opacity: subtitleVisible ? 1 : 0,
                  transform: subtitleVisible ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: `${subtitleDelay}s`,
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* CTA buttons */}
            {children && (
              <div
                className="mt-8 pointer-events-auto transition-all duration-1000"
                style={{
                  opacity: subtitleVisible ? 1 : 0,
                  transform: subtitleVisible ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {children}
              </div>
            )}
          </div>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground text-sm animate-pulse transition-opacity duration-500"
            style={{ opacity: 1 - scrollProgress * 5 }}
          >
            <span>Scroll to explore</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        )}

        {/* 3D Canvas */}
        <div
          className="absolute inset-0 z-0"
          style={{
            opacity: 0.3 + scrollProgress * 0.7,
            transform: `scale(${1 + scrollProgress * 0.2})`,
            transition: 'opacity 0.1s ease-out',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
            style={{ background: 'transparent' }}
            dpr={[1, 1.5]}
          >
            <Suspense fallback={null}>
              <SceneLights />
              <BrandModel scrollProgress={scrollProgress} />
              <Environment preset="city" />
              <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.4}
                scale={12}
                blur={2.5}
                far={4}
              />
            </Suspense>
            <EffectComposer>
              <Bloom intensity={0.5} luminanceThreshold={0.85} luminanceSmoothing={0.4} />
            </EffectComposer>
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default HeroFuturistic;
