// components/HeroCanvas.tsx
'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Suspense, useEffect, useRef, memo } from 'react';
import * as THREE from 'three';

const modelPositionRef = { x: 0, y: -2.6 };

// Model ko preload karo - page load hote hi
useGLTF.preload('/models/me.glb');

// Added startAnimation prop here
interface HeroCanvasProps {
  onModelLoaded: () => void;
  startAnimation: boolean; 
}

interface ModelProps {
  onLoaded: () => void;
  startAnimation: boolean;
}

// Memoized Model Component
const Model = memo(({ onLoaded, startAnimation }: ModelProps) => {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/me.glb');
  const { actions } = useAnimations(animations, groupRef);
  const hasNotifiedLoadRef = useRef(false);
  
  // NEW: Ref to track when animation ACTUALLY starts
  const startTimeRef = useRef<number | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Optimized load notification - only once
  useEffect(() => {
    if (scene && !hasNotifiedLoadRef.current) {
      hasNotifiedLoadRef.current = true;
      onLoaded();
    }
  }, [scene, onLoaded]);

  // Initial setup - scale, rotation, shadows (NO CHANGES TO STYLES)
  useEffect(() => {
    if (!groupRef.current) return;
    const group = groupRef.current;
    group.scale.set(2, 2, 2);
    group.rotation.y = Math.PI / 2;
    group.position.set(0, -2, 0);

    // Batch shadow setup
    group.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, []);

  // Setup animation - only once but waits for startAnimation
  useEffect(() => {
    if (!actions || Object.keys(actions).length === 0) return;
    const walkAction = actions[Object.keys(actions)[0]];
    
    if (walkAction) {
      if (startAnimation) {
        // Start walking only when video ends
        walkAction.reset();
        walkAction.loop = THREE.LoopOnce;
        walkAction.clampWhenFinished = true;
        walkAction.timeScale = 0.8;
        walkAction.play();
      } else {
        walkAction.stop(); // Pause if video is playing
      }
    }
  }, [actions, startAnimation]);

  // Optimized position animation using requestAnimationFrame
  useEffect(() => {
    // If video is still playing, do not start moving
    if (!startAnimation) return;

    // Set start time only when this runs
    startTimeRef.current = Date.now();
    const duration = 12;

    const animate = () => {
      if (!groupRef.current || !startTimeRef.current) return;

      const elapsed = (Date.now() - startTimeRef.current) / 1000;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const xPos = -14 + progress * 20;
        groupRef.current.position.x = xPos;
        modelPositionRef.x = xPos;
        animationFrameIdRef.current = requestAnimationFrame(animate);
      } else {
        groupRef.current.position.x = 10;
        modelPositionRef.x = 10;
      }
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [startAnimation]); // Re-run when startAnimation becomes true

  return <primitive ref={groupRef} object={scene} />;
});

Model.displayName = 'Model';


// Optimized CameraFollower with ref-based state
const CameraFollower = memo(({ startAnimation }: { startAnimation: boolean }) => {
  const { camera } = useThree();
  
  // Track start time separately
  const startTimeRef = useRef<number | null>(null);
  
  const lastPhase1PosRef = useRef(new THREE.Vector3(0, 0.5, 5));
  const lastPhase1LookAtRef = useRef(new THREE.Vector3(0, 0, 0));
  const phase1CompleteRef = useRef(false);
  const canvasHiddenRef = useRef(false);

  // Set start time when video ends
  useEffect(() => {
    if (startAnimation) {
      startTimeRef.current = Date.now();
    }
  }, [startAnimation]);

  useFrame(() => {
    // Wait until startAnimation is true
    if (!startAnimation || !startTimeRef.current || canvasHiddenRef.current) return;

    const elapsed = (Date.now() - startTimeRef.current) / 1000;
    const totalDuration = 7; // 5 + 2

    // Hide canvas after animation
    if (elapsed >= totalDuration) {
      if (!canvasHiddenRef.current) {
        canvasHiddenRef.current = true;
        const canvasContainer = document.querySelector('[data-canvas]') as HTMLElement | null;
        if (canvasContainer) {
          canvasContainer.style.opacity = '0';
          canvasContainer.style.pointerEvents = 'none';
          setTimeout(() => {
            canvasContainer.style.display = 'none';
          }, 300);
        }
      }
      return;
    }

    // Phase 1: Zoom in and follow (0-5s) (NO LOGIC CHANGES)
    if (elapsed < 5) {
      const zoomInDuration = 2;
      const zoomProgress = Math.min(elapsed / zoomInDuration, 1);

      // Smooth camera follow
      const speed = 0.01;
      camera.position.x += (modelPositionRef.x - camera.position.x) * speed;
      camera.position.y = 0.5;

      // Zoom in
      const startZ = 15;
      const endZ = 5;
      camera.position.z = startZ + (endZ - startZ) * zoomProgress;

      // Look at model
      const lookAtX = modelPositionRef.x + 5;
      camera.lookAt(lookAtX, 0, 0);

      // Store last phase 1 position
      lastPhase1PosRef.current.set(camera.position.x, camera.position.y, camera.position.z);
      lastPhase1LookAtRef.current.set(lookAtX, 0, 0);
      phase1CompleteRef.current = false;
    } 
    // Phase 2: Transition to final position (5-7s)
    else {
      if (!phase1CompleteRef.current) {
        phase1CompleteRef.current = true;
      }
      const phaseProgress = Math.min((elapsed - 5) / 2, 1);
      const ease = Math.pow(phaseProgress, 1.5);

      // Interpolate camera position
      const startPos = lastPhase1PosRef.current;
      const endX = startPos.x - 5;
      const endY = startPos.y + 3;
      const endZ = startPos.z + 2;

      camera.position.x = startPos.x + (endX - startPos.x) * ease;
      camera.position.y = startPos.y + (endY - startPos.y) * ease;
      camera.position.z = startPos.z + (endZ - startPos.z) * ease;

      // Interpolate look-at
      const startLookAt = lastPhase1LookAtRef.current;
      const endLookAtX = camera.position.x - 3;
      const endLookAtY = camera.position.y + 2;

      const lookAtX = startLookAt.x + (endLookAtX - startLookAt.x) * ease;
      const lookAtY = startLookAt.y + (endLookAtY - startLookAt.y) * ease;

      camera.lookAt(lookAtX, lookAtY, 0);
    }
  });

  return null;
});

CameraFollower.displayName = 'CameraFollower';


// Optimized SpotlightFollower (EXACTLY SAME AS ORIGINAL)
const SpotlightFollower = memo(() => {
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());

  useEffect(() => {
    if (targetRef.current) {
      targetRef.current.position.set(0, -1.8, 0);
    }
  }, []);

  useFrame(() => {
    if (spotlightRef.current && targetRef.current) {
      targetRef.current.position.x = modelPositionRef.x;
      targetRef.current.position.y = -1.8;
      spotlightRef.current.target.updateMatrixWorld();
    }
  });

  return (
    <>
      <spotLight
        ref={spotlightRef}
        position={[20, 25, 15]}
        intensity={100}
        angle={Math.PI / 1.5}
        penumbra={0.8}
        decay={0.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <primitive ref={targetRef} object={targetRef.current} />
    </>
  );
});

SpotlightFollower.displayName = 'SpotlightFollower';


// Memoized Ground Plane (EXACTLY SAME AS ORIGINAL)
const GroundPlane = memo(() => (
  <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
    <planeGeometry args={[30, 30]} />
    <meshStandardMaterial color="#ffffff" />
  </mesh>
));

GroundPlane.displayName = 'GroundPlane';


// Main Export - Updated to accept startAnimation
export const HeroCanvas = memo(({ onModelLoaded, startAnimation }: HeroCanvasProps) => {
  return (
    <Canvas 
      camera={{ position: [0, 1, 10], fov: 50 }}
      shadows
      dpr={[1, 2]} // Limit pixel ratio for performance
      performance={{ min: 0.5 }} // Enable adaptive performance
      gl={{ 
        powerPreference: 'high-performance',
        antialias: true,
        alpha: false,
      }}
    >
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.2} />

      <GroundPlane />
      <CameraFollower startAnimation={startAnimation} />
      <SpotlightFollower />
      
      <Suspense fallback={null}>
        <Model onLoaded={onModelLoaded} startAnimation={startAnimation} />
      </Suspense>
    </Canvas>
  );
});

HeroCanvas.displayName = 'HeroCanvas';
