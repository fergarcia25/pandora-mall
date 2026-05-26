import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RigidBody, CylinderCollider } from '@react-three/rapier';

function createMarbleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  ctx.fillStyle = '#111';
  ctx.fillRect(0, 0, w, h);

  const imageData = ctx.getImageData(0, 0, w, h);
  const d = imageData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      const nx = x / w;
      const ny = y / h;

      let v = 0;
      v += Math.sin(nx * 12 + ny * 8 + Math.sin(nx * 3 + ny * 5) * 2) * 0.4;
      v += Math.sin(nx * 25 - ny * 15 + 1.3 + Math.sin(nx * 5 - ny * 3) * 1.5) * 0.3;
      v += Math.sin(nx * 7 + ny * 20 + 2.7) * 0.2;
      v += Math.sin(nx * 40 - ny * 30 + 4.1) * 0.1;
      v = (v + 1) / 2;

      const c = Math.round(15 + v * 160);
      d[i] = c;
      d[i + 1] = c;
      d[i + 2] = c;
      d[i + 3] = 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  texture.anisotropy = 4;
  return texture;
}

const PARTICLE_COUNT = 80;

function WaterJet({ position: jetPos, direction = 1 }) {
  const meshRef = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const jetData = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const speed = 1.8 + Math.random() * 0.8;
      pos[i * 3] = (Math.random() - 0.5) * 0.04;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.04;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
      vel[i * 3] = direction * speed * 0.5 + (Math.random() - 0.5) * 0.15;
      vel[i * 3 + 1] = speed * 0.7 + Math.random() * 0.2;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
    }
    return { pos, vel };
  }, [direction]);

  useFrame((_, delta) => {
    const pos = jetData.pos;
    const vel = jetData.vel;
    if (meshRef.current) {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pos[i * 3] += vel[i * 3] * delta;
        pos[i * 3 + 1] += vel[i * 3 + 1] * delta;
        pos[i * 3 + 2] += vel[i * 3 + 2] * delta;
        vel[i * 3 + 1] -= 4.0 * delta;

        if (pos[i * 3 + 1] < -1.4) {
          const speed = 1.8 + Math.random() * 0.8;
          pos[i * 3] = (Math.random() - 0.5) * 0.04;
          pos[i * 3 + 1] = 0;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 0.04;
          vel[i * 3] = direction * speed * 0.5 + (Math.random() - 0.5) * 0.15;
          vel[i * 3 + 1] = speed * 0.7 + Math.random() * 0.2;
          vel[i * 3 + 2] = (Math.random() - 0.5) * 0.3;
        }

        dummy.position.set(pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]);
        dummy.scale.setScalar(1);
        dummy.updateMatrix();
        meshRef.current.setMatrixAt(i, dummy.matrix);
      }
      meshRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group position={jetPos}>
      <mesh position={[0, -0.06, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.08, 12]} />
        <meshStandardMaterial color="#999999" metalness={0.3} roughness={0.5} />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.02, 12]} />
        <meshStandardMaterial color="#aaaaaa" roughness={0.6} />
      </mesh>
      <instancedMesh ref={meshRef} args={[null, null, PARTICLE_COUNT]}>
        <boxGeometry args={[0.05, 0.05, 0.05]} />
        <meshStandardMaterial color="#4fc3f7" transparent opacity={0.85} />
      </instancedMesh>
    </group>
  );
}

function Fountain() {
  const marbleTex = useMemo(() => createMarbleTexture(), []);

  return (
    <RigidBody type="fixed" colliders={false}>
      <CylinderCollider args={[0.25, 2.7]} position={[0, 0.25, 0]} />
      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[2.7, 2.7, 0.5, 48, 1, true]} />
          <meshStandardMaterial color="#999999" side={2} roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.65, 2.75, 48]} />
          <meshStandardMaterial color="#aaaaaa" roughness={0.6} />
        </mesh>

        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.04, 48]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.5} roughness={0.3} metalness={0.2} />
        </mesh>

        <mesh position={[0, 0.06, 0]} receiveShadow>
          <cylinderGeometry args={[2.4, 2.7, 0.12, 48]} />
          <meshStandardMaterial map={marbleTex} roughness={0.6} metalness={0.1} />
        </mesh>

        <mesh position={[0, 0.17, 0]}>
          <cylinderGeometry args={[2.0, 2.2, 0.1, 48]} />
          <meshStandardMaterial map={marbleTex} roughness={0.6} metalness={0.1} />
        </mesh>

        <mesh position={[0, 0.28, 0]}>
          <cylinderGeometry args={[1.6, 1.8, 0.08, 48]} />
          <meshStandardMaterial map={marbleTex} roughness={0.6} metalness={0.1} />
        </mesh>

        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.3, 0.55, 1.4, 24]} />
          <meshStandardMaterial map={marbleTex} roughness={0.5} metalness={0.15} />
        </mesh>

        <mesh position={[0, 0.32, 0]}>
          <cylinderGeometry args={[1.55, 1.55, 0.04, 48]} />
          <meshStandardMaterial color="#87CEEB" transparent opacity={0.5} roughness={0.3} metalness={0.2} />
        </mesh>

        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[1.0, 1.2, 0.3, 32]}>
            <meshStandardMaterial map={marbleTex} roughness={0.6} metalness={0.1} />
          </cylinderGeometry>
        </mesh>

        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.7, 0.35, 0]}>
            <boxGeometry args={[0.15, 0.05, 0.3]} />
            <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.5} />
          </mesh>
        ))}

        <mesh position={[0, 0.48, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.05, 1.15, 48]} />
          <meshStandardMaterial color="#fd79a8" emissive="#fd79a8" emissiveIntensity={0.7} side={2} />
        </mesh>

        <mesh position={[0, 1.72, 0]}>
          <torusGeometry args={[0.38, 0.04, 16, 32]} />
          <meshStandardMaterial color="#999999" roughness={0.6} />
        </mesh>

        <WaterJet position={[-0.38, 1.72, 0]} direction={-1} />
        <WaterJet position={[0.38, 1.72, 0]} direction={1} />
        <group position={[0, 1.72, -0.38]} rotation={[0, Math.PI / 2, 0]}>
          <WaterJet position={[0, 0, 0]} direction={-1} />
        </group>
        <group position={[0, 1.72, 0.38]} rotation={[0, -Math.PI / 2, 0]}>
          <WaterJet position={[0, 0, 0]} direction={-1} />
        </group>
      </group>
    </RigidBody>
  );
}

export default Fountain;
