// components/HeroCanvas.tsx
'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const modelPositionRef = { x: 0, y: -2.6 };

// Model ko preload karo - page load hote hi
useGLTF.preload('/models/me.glb');

interface ModelProps {
  onLoaded: () => void;
}

function Model({ onLoaded }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/models/me.glb');
  const { actions } = useAnimations(animations, groupRef);
  const [animationStarted, setAnimationStarted] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [hasNotifiedLoad, setHasNotifiedLoad] = useState(false);

  // Model load hone par parent ko bata do
  useEffect(() => {
    if (scene && !hasNotifiedLoad) {
      setHasNotifiedLoad(true);
      onLoaded();
    }
  }, [scene, onLoaded, hasNotifiedLoad]);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.scale.set(2, 2, 2);
      groupRef.current.rotation.y = Math.PI / 2;
      groupRef.current.position.y = -2;
      groupRef.current.position.z = 0;

      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, []);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const walkAction = actions[Object.keys(actions)[0]];
      if (walkAction) {
        walkAction.reset();
        walkAction.loop = THREE.LoopOnce;
        walkAction.clampWhenFinished = true;
        walkAction.timeScale = 0.8;
        walkAction.play();
      }
    }
  }, [actions]);

  useEffect(() => {
    if (!animationStarted) {
      setAnimationStarted(true);
      setStartTime(Date.now());
    }
  }, []);

  useEffect(() => {
    if (!animationStarted || startTime === null) return;

    let animationFrameId: number;

    const animate = () => {
      if (groupRef.current) {
        const elapsed = (Date.now() - startTime) / 1000;
        const duration = 12;

        if (elapsed < duration) {
          const progress = elapsed / duration;
          const xPos = -14 + progress * 20;
          groupRef.current.position.x = xPos;
          modelPositionRef.x = xPos;
          animationFrameId = requestAnimationFrame(animate);
        } else {
          groupRef.current.position.x = 10;
          modelPositionRef.x = 10;
        }
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [animationStarted, startTime]);

  return <primitive ref={groupRef} object={scene} />;
}

function CameraFollower() {
  const { camera } = useThree();
  const targetPos = useRef({ x: 0, y: 0.5, z: 5 });
  const startTime = useRef(Date.now());
  const lastPhase1Pos = useRef({ x: 0, y: 0.5, z: 5 });
  const lastPhase1LookAt = useRef({ x: 0, y: 0, z: 0 });
  let phase1Complete = false;
  
  useFrame(() => {
    const elapsed = (Date.now() - startTime.current) / 1000;
    const totalDuration = 5 + 2;
    
    if (elapsed >= totalDuration) {
      const canvasContainer = document.querySelector('[data-canvas]') as HTMLElement | null;
      if (canvasContainer) {
        Object.assign(canvasContainer.style, {
          opacity: '0',
          pointerEvents: 'none'
        });
        setTimeout(() => {
          canvasContainer.style.display = 'none';
        }, 300);
      }
      return;
    }

    if (elapsed < 5) {
      const zoomInDuration = 2;
      const zoomProgress = Math.min(elapsed / zoomInDuration, 1);
      
      targetPos.current.x = modelPositionRef.x;
      
      const speed = 0.01;
      camera.position.x += (targetPos.current.x - camera.position.x) * speed;
      camera.position.y = 0.5;
      
      const startZ = 15;
      const endZ = 5;
      camera.position.z = startZ + (endZ - startZ) * zoomProgress;
      
      const lookAtX = modelPositionRef.x + 5;
      const lookAtY = 0;
      
      camera.lookAt(lookAtX, lookAtY, 0);
      
      lastPhase1Pos.current = {
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z
      };
      lastPhase1LookAt.current = {
        x: lookAtX,
        y: lookAtY,
        z: 0
      };
      phase1Complete = false;
    } else {
      if (!phase1Complete) {
        phase1Complete = true;
      }
      
      const phaseProgress = Math.min((elapsed - 5) / 2, 1);
      const ease = Math.pow(phaseProgress, 1.5);
      
      const startX = lastPhase1Pos.current.x;
      const startY = lastPhase1Pos.current.y;
      const startZ = lastPhase1Pos.current.z;
      
      const endX = startX - 5;
      const endY = startY + 3;
      const endZ = startZ + 2;
      
      camera.position.x = startX + (endX - startX) * ease;
      camera.position.y = startY + (endY - startY) * ease;
      camera.position.z = startZ + (endZ - startZ) * ease;
      
      const startLookAtX = lastPhase1LookAt.current.x;
      const startLookAtY = lastPhase1LookAt.current.y;
      
      const endLookAtX = camera.position.x - 3;
      const endLookAtY = camera.position.y + 2;
      
      const lookAtX = startLookAtX + (endLookAtX - startLookAtX) * ease;
      const lookAtY = startLookAtY + (endLookAtY - startLookAtY) * ease;
      
      camera.lookAt(lookAtX, lookAtY, 0);
    }
  });

  return null;
}

function SpotlightFollower() {
  const spotlightRef = useRef<THREE.SpotLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);

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
        castShadow={true}
        shadow-mapSize={[4096, 4096]}
      />
      <primitive ref={targetRef} object={new THREE.Object3D()} />
    </>
  );
}

interface HeroCanvasProps {
  onModelLoaded: () => void;
}

export function HeroCanvas({ onModelLoaded }: HeroCanvasProps) {
  return (
    <Canvas 
      camera={{ position: [0, 1, 10], fov: 50 }}
      shadows
    >
      <color attach="background" args={['#ffffff']} />
      <ambientLight intensity={0.2} />

      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      <CameraFollower />
      <SpotlightFollower />
      
      <Suspense fallback={null}>
        <Model onLoaded={onModelLoaded} />
      </Suspense>
    </Canvas>
  );
}
