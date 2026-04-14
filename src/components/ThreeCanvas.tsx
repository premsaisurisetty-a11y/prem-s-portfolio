import { Suspense, lazy } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

const CityScene = lazy(() => import("./CityScene"));

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#4466aa" />
      <directionalLight
        position={[10, 20, 5]}
        intensity={0.8}
        color="#ffaa44"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-5, 10, 5]} intensity={0.5} color="#22bbff" distance={30} />
      <pointLight position={[8, 5, -3]} intensity={0.3} color="#ff4444" distance={20} />
      <spotLight position={[0, 25, 10]} angle={0.3} penumbra={0.8} intensity={0.6} color="#6644cc" castShadow />
      <fog attach="fog" args={["#080b14", 20, 60]} />
    </>
  );
}

function CameraRig() {
  const vec = new THREE.Vector3();
  return useFrame((state) => {
    // Smoothed movement based on mouse
    state.camera.position.lerp(
      vec.set(state.mouse.x * 2.5, 8 + state.mouse.y * 1.5, 20),
      0.05
    );
    state.camera.lookAt(0, 5, 0);
  });
}

export default function ThreeCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas
        shadows
        camera={{ position: [0, 8, 20], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        performance={{ min: 0.5 }}
      >
        <CameraRig />
        <SceneLights />
        <Suspense fallback={null}>
          <CityScene />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
