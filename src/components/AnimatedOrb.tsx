import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import SplineLoader from '@splinetool/loader';

const AnimatedOrb = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const frameIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // camera
    const camera = new THREE.PerspectiveCamera(60, 1, 0.01, 2000); // aspect ratio will be updated
    camera.position.set(680.54, 496, 1637.05);
    camera.quaternion.setFromEuler(new THREE.Euler(-0.29, 0.4, 0.11));
    cameraRef.current = camera;

    // scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // spline scene
    const loader = new SplineLoader();
    loader.load(
      'https://prod.spline.design/leQrEDkVcqw9VqkC/scene.splinecode',
      (splineScene) => {
        scene.add(splineScene);
      }
    );

    // renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true 
    });
    
    // Set initial size
    const container = canvasRef.current.parentElement;
    if (container) {
      const width = container.clientWidth;
      const height = container.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
    
    rendererRef.current = renderer;

    // scene settings
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    scene.background = new THREE.Color('#000000');
    renderer.setClearAlpha(1);

    // orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;
    controlsRef.current = controls;

    // animation function
    function animate() {
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      frameIdRef.current = requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !canvasRef.current) return;
      
      const container = canvasRef.current.parentElement;
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        // Clean up scene objects
        sceneRef.current.clear();
      }
    };
  }, []);

  return (
    <div className="relative w-96 h-96 mx-auto">
      <canvas 
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default AnimatedOrb;