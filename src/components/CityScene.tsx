import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Building({ position, width, height, depth, color }: {
  position: [number, number, number];
  width: number;
  height: number;
  depth: number;
  color: string;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const windowRows = Math.floor(height * 2);
  const windowCols = Math.floor(width * 3);

  const windowTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 256;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 128, 256);

    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        const lit = Math.random() > 0.4;
        ctx.fillStyle = lit
          ? `hsl(${40 + Math.random() * 20}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 30}%)`
          : "#0a0a12";
        const wx = (col / windowCols) * 128 + 4;
        const wy = (row / windowRows) * 256 + 4;
        const ww = 128 / windowCols - 6;
        const wh = 256 / windowRows - 6;
        ctx.fillRect(wx, wy, ww, wh);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    return texture;
  }, [color, windowRows, windowCols]);

  return (
    <mesh ref={meshRef} position={[position[0], position[1] + height / 2, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[width, height, depth]} />
      <meshStandardMaterial map={windowTexture} roughness={0.7} metalness={0.3} />
    </mesh>
  );
}

function WebStrands() {
  const webRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (webRef.current) {
      webRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  const strands = useMemo(() => {
    const s = [];
    for (let i = 0; i < 8; i++) {
      const startX = -15 + Math.random() * 30;
      const startY = 5 + Math.random() * 15;
      const startZ = -10 + Math.random() * 5;
      const endX = startX + (Math.random() - 0.5) * 20;
      const endY = startY + (Math.random() - 0.5) * 10;
      const endZ = startZ + (Math.random() - 0.5) * 10;

      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, startY, startZ),
        new THREE.Vector3((startX + endX) / 2 + (Math.random() - 0.5) * 5, (startY + endY) / 2 + 3, (startZ + endZ) / 2),
        new THREE.Vector3(endX, endY, endZ),
      ]);
      s.push(curve);
    }
    return s;
  }, []);

  return (
    <group ref={webRef}>
      {strands.map((curve, i) => (
        <mesh key={i}>
          <tubeGeometry args={[curve, 20, 0.015, 4, false]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.15} emissive="#88ccff" emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
}

function Stars() {
  const starsRef = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = 15 + Math.random() * 40;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.elapsedTime * 0.005;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={500} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#aaddff" size={0.08} transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function FloatingParticles({ count = 100 }) {
  const points = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = Math.random() * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05;
      points.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#ffffff"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

export default function CityScene() {
  const buildings = useMemo(() => {
    const b = [];
    for (let i = 0; i < 40; i++) {
      const x = -30 + Math.random() * 60;
      const z = -25 - Math.random() * 20;
      const w = 1.5 + Math.random() * 3;
      const h = 3 + Math.random() * 18;
      const d = 1.5 + Math.random() * 3;
      const shade = 10 + Math.random() * 15;
      b.push({ position: [x, 0, z] as [number, number, number], width: w, height: h, depth: d, color: `hsl(220, 20%, ${shade}%)` });
    }
    return b;
  }, []);

  return (
    <group>
      {buildings.map((b, i) => (
        <Building key={i} {...b} />
      ))}
      <Stars />
      <FloatingParticles count={150} />
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#080b14" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}
