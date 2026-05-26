import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, CuboidCollider } from '@react-three/rapier';

const W = 3.4;
const D = 3.2;
const H = 0.45;
const THICK = 0.08;

function NPCAgent({ startX, startZ, color }) {
  const ref = useRef(null);
  const targetX = useRef(startX);
  const targetZ = useRef(startZ);
  const waitTime = useRef(1 + Math.random() * 2);
  const facing = useRef(1);

  useFrame((_, delta) => {
    if (!ref.current) return;

    waitTime.current -= delta;
    if (waitTime.current <= 0) {
      const margin = 0.4;
      const halfW = W / 2 - margin;
      const halfD = D / 2 - margin;
      targetX.current = (Math.random() - 0.5) * halfW * 2;
      targetZ.current = (Math.random() - 0.5) * halfD * 2;
      waitTime.current = 1.5 + Math.random() * 3;
      const dx = targetX.current - ref.current.position.x;
      if (Math.abs(dx) > 0.1) facing.current = dx > 0 ? 1 : -1;
    }

    const pos = ref.current.position;
    const dx = targetX.current - pos.x;
    const dz = targetZ.current - pos.z;
    const dist = Math.sqrt(dx * dx + dz * dz);

    if (dist > 0.08) {
      const speed = 0.6;
      pos.x += (dx / dist) * delta * speed;
      pos.z += (dz / dist) * delta * speed;
    }

    if (ref.current.children[0]) {
      ref.current.children[0].rotation.y = facing.current > 0 ? 0 : Math.PI;
    }
  });

  return (
    <group ref={ref} position={[startX, 0.06, startZ]}>
      <group>
        <mesh position={[0, 0.31, 0]}>
          <boxGeometry args={[0.2, 0.24, 0.12]} />
          <meshStandardMaterial color={color} roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.53, 0]}>
          <sphereGeometry args={[0.075, 8, 8]} />
          <meshStandardMaterial color="#f5cba7" />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <boxGeometry args={[0.08, 0.15, 0.08]} />
          <meshStandardMaterial color="#2d2d44" />
        </mesh>
        <mesh position={[0, 0.62, 0.01]}>
          <coneGeometry args={[0.07, 0.08, 8]} />
          <meshStandardMaterial color="#27ae60" />
        </mesh>
      </group>
    </group>
  );
}

function ReceptionCounter() {
  return (
    <RigidBody type="fixed" colliders={false} position={[0, 0, -11.7]}>
      <CuboidCollider args={[W / 2 + 0.1, H / 2, D / 2 + 0.1]} position={[0, H / 2, 0]} />
      <group>
        <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[W, D]} />
          <meshStandardMaterial color="#2a2a4e" transparent opacity={0.2} side={2} />
        </mesh>

        <mesh position={[0, H / 2, D / 2]}>
          <boxGeometry args={[W, H, THICK]} />
          <meshStandardMaterial color="#6c5ce7" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[0, H / 2, -D / 2]}>
          <boxGeometry args={[W, H, THICK]} />
          <meshStandardMaterial color="#6c5ce7" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[-W / 2, H / 2, 0]}>
          <boxGeometry args={[THICK, H, D]} />
          <meshStandardMaterial color="#6c5ce7" roughness={0.5} metalness={0.3} />
        </mesh>
        <mesh position={[W / 2, H / 2, 0]}>
          <boxGeometry args={[THICK, H, D]} />
          <meshStandardMaterial color="#6c5ce7" roughness={0.5} metalness={0.3} />
        </mesh>

        <mesh position={[0, H, 0]}>
          <boxGeometry args={[W, 0.04, D]} />
          <meshStandardMaterial color="#e8e8e8" roughness={0.4} metalness={0.1} />
        </mesh>

        <mesh position={[0, H - 0.02, D / 2 + 0.01]}>
          <planeGeometry args={[W * 0.8, 0.15]} />
          <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.4} transparent opacity={0.6} side={2} />
        </mesh>

        <NPCAgent startX={-0.7} startZ={0.5} color="#6c5ce7" />
        <NPCAgent startX={0.7} startZ={-0.5} color="#fd79a8" />
      </group>
    </RigidBody>
  );
}

export default ReceptionCounter;
