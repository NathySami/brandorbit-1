'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useAspect, useTexture } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import brandOrbitLogo from '@/assets/BrandOrbit_Logo.jpg';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uPointer;
  uniform float uProgress;
  uniform float uTime;
  varying vec2 vUv;

  float cellNoise(vec2 p) {
    return fract(sin(dot(floor(p), vec2(12.9898, 78.233))) * 43758.5453);
  }

  void main() {
    // Derive depth from logo luminance
    vec4 baseColor = texture2D(uTexture, vUv);
    float depth = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
    
    // Parallax offset based on pointer and depth
    float strength = 0.015;
    vec2 offset = depth * uPointer * strength;
    vec4 color = texture2D(uTexture, vUv + offset);
    
    // Halftone dot pattern
    float aspect = 1.0;
    vec2 tUv = vec2(vUv.x * aspect, vUv.y);
    vec2 tiling = vec2(80.0);
    vec2 tiledUv = mod(tUv * tiling, 2.0) - 1.0;
    float brightness = cellNoise(tUv * tiling / 2.0);
    float dist = length(tiledUv);
    float dotVal = smoothstep(0.5, 0.49, dist) * brightness;
    
    // Scan line flow effect  
    float flow = 1.0 - smoothstep(0.0, 0.03, abs(depth - uProgress));
    vec3 mask = vec3(dotVal * flow) * vec3(8.0, 1.5, 0.0);
    
    // Blend screen
    vec3 result = 1.0 - (1.0 - color.rgb) * (1.0 - mask);
    
    // Scan line overlay with glow
    float scanPos = uProgress;
    float scanWidth = 0.06;
    float scanLine = smoothstep(0.0, scanWidth, abs(vUv.y - scanPos));
    vec3 glowOverlay = vec3(1.0, 0.95, 0.9) * (1.0 - scanLine) * 0.2;
    result += glowOverlay;
    
    // Subtle edge glow pulsing
    float pulse = sin(uTime * 2.0) * 0.5 + 0.5;
    float edgeGlow = smoothstep(0.4, 0.0, depth) * pulse * 0.08;
    result += vec3(edgeGlow);
    
    gl_FragColor = vec4(result, 1.0);
  }
`;

const WIDTH = 300;
const HEIGHT = 300;

const Scene = () => {
  const logoMap = useTexture(brandOrbitLogo);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: logoMap },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uProgress: { value: 0 },
      uTime: { value: 0 },
    }),
    [logoMap]
  );

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });
  }, [uniforms]);

  const [w, h] = useAspect(WIDTH, HEIGHT);
  const scaleFactor = 0.55;

  useFrame(({ clock, pointer }) => {
    uniforms.uProgress.value = Math.sin(clock.getElapsedTime() * 0.5) * 0.5 + 0.5;
    uniforms.uPointer.value.set(pointer.x, pointer.y);
    uniforms.uTime.value = clock.getElapsedTime();
  });

  return (
    <mesh scale={[w * scaleFactor, h * scaleFactor, 1]} material={material}>
      <planeGeometry args={[1, 1, 32, 32]} />
    </mesh>
  );
};

export interface HeroFuturisticProps {
  title?: string;
  subtitle?: string;
  showScrollIndicator?: boolean;
  children?: React.ReactNode;
}

export const HeroFuturistic = ({
  title = 'Transform Your Brand\'s Digital Orbit',
  subtitle = 'Pull your brand into its next orbit of success with cutting-edge digital transformation.',
  showScrollIndicator = true,
  children,
}: HeroFuturisticProps) => {
  const titleWords = title.split(' ');
  const [visibleWords, setVisibleWords] = useState(0);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [delays, setDelays] = useState<number[]>([]);
  const [subtitleDelay, setSubtitleDelay] = useState(0);

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
    <div className="relative w-full min-h-screen overflow-hidden bg-background">
      {/* Text Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-4">
        <div className="text-center max-w-4xl">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <img
              src={brandOrbitLogo}
              alt="Brand Orbit"
              className="w-24 h-24 md:w-32 md:h-32 object-contain opacity-90"
            />
          </div>

          {/* Title with word-by-word animation */}
          <div className="overflow-hidden mb-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
              {titleWords.map((word, index) => (
                <span
                  key={index}
                  className="inline-block mr-[0.3em] transition-all duration-700"
                  style={{
                    opacity: index < visibleWords ? 1 : 0,
                    transform: index < visibleWords ? 'translateY(0)' : 'translateY(40px)',
                    transitionDelay: `${(delays[index] || 0)}s`,
                    color: word === "Digital" || word === "Orbit"
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--foreground))',
                    textShadow: index < visibleWords ? '0 0 40px hsl(var(--primary) / 0.3)' : 'none',
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

          {/* Children slot for buttons etc */}
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground text-sm animate-pulse">
          <span>Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      )}

      {/* 3D Canvas */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Scene />
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.5}
            />
          </EffectComposer>
        </Canvas>
      </div>
    </div>
  );
};

export default HeroFuturistic;
