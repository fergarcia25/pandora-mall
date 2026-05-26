import { useNavigate } from 'react-router-dom';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { useState, useMemo } from 'react';

function TechWorldInterior() {
  return (
    <group position={[-1.2, 0.6, 0]}>
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.35, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.25, -0.03]}>
        <boxGeometry args={[0.45, 0.28, 0.02]} />
        <meshStandardMaterial color="#4fc3f7" emissive="#4fc3f7" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.05, 0.15]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0.7, 0.25, 0]}>
        <boxGeometry args={[0.5, 0.35, 0.05]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[0.7, 0.25, -0.03]}>
        <boxGeometry args={[0.45, 0.28, 0.02]} />
        <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.7, -0.1, 0]}>
        <boxGeometry args={[0.04, 0.2, 0.04]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.7, -0.3, 0]}>
        <boxGeometry args={[0.2, 0.05, 0.15]} />
        <meshStandardMaterial color="#555" />
      </mesh>
    </group>
  );
}

function FashionInterior() {
  return (
    <group position={[-1.2, 0.8, 0]}>
      <mesh position={[0, 0.7, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#f5cba7" />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.15, 0.5, 8]} />
        <meshStandardMaterial color="#f5cba7" />
      </mesh>
      <mesh position={[0, 0.15, 0]}>
        <capsuleGeometry args={[0.06, 0.2, 6, 8]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[0.08, 0.3, 0.1]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.5, 0.3, 0]}>
        <boxGeometry args={[0.08, 0.5, 0.04]} />
        <meshStandardMaterial color="#fd79a8" emissive="#fd79a8" emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[0.5, 0.05, 0]}>
        <boxGeometry args={[0.08, 0.1, 0.15]} />
        <meshStandardMaterial color="#333" />
      </mesh>
    </group>
  );
}

function GameZoneInterior() {
  return (
    <group position={[-1.2, 0.6, 0]}>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[0.35, 0.7, 0.2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.5} roughness={0.3} />
      </mesh>
      <mesh position={[-0.05, 0.55, 0.11]}>
        <boxGeometry args={[0.25, 0.3, 0.02]} />
        <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.08, 0.3, 0.11]}>
        <boxGeometry args={[0.06, 0.04, 0.02]} />
        <meshStandardMaterial color="#fd79a8" emissive="#fd79a8" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.08, 0.3, 0.11]}>
        <boxGeometry args={[0.06, 0.04, 0.02]} />
        <meshStandardMaterial color="#6c5ce7" emissive="#6c5ce7" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[0.3, 0.05, 0.2]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.5, 0.3, 0]}>
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.8} />
      </mesh>
      <mesh position={[0.5, 0.3, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshStandardMaterial color="#fd79a8" emissive="#fd79a8" emissiveIntensity={0.4} />
      </mesh>
    </group>
  );
}

function BookNookInterior() {
  return (
    <group position={[-1.2, 0.5, 0]}>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.4, 0.7, 0.08]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>
      <mesh position={[0.07, 0.35, 0.05]}>
        <boxGeometry args={[0.08, 0.2, 0.05]} />
        <meshStandardMaterial color="#e74c3c" roughness={0.8} />
      </mesh>
      <mesh position={[-0.02, 0.4, 0.05]}>
        <boxGeometry args={[0.06, 0.25, 0.05]} />
        <meshStandardMaterial color="#2980b9" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, 0.55, 0.05]}>
        <boxGeometry args={[0.07, 0.15, 0.05]} />
        <meshStandardMaterial color="#27ae60" roughness={0.8} />
      </mesh>
      <mesh position={[-0.06, 0.25, 0.05]}>
        <boxGeometry args={[0.07, 0.12, 0.05]} />
        <meshStandardMaterial color="#f39c12" roughness={0.8} />
      </mesh>
      <mesh position={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.06, 0.6, 0.06]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.5, 0.1]}>
        <boxGeometry args={[0.06, 0.6, 0.06]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.48, 0.08]}>
        <boxGeometry args={[0.1, 0.04, 0.08]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>
      <mesh position={[0.5, 0.58, 0.08]}>
        <boxGeometry args={[0.1, 0.04, 0.08]} />
        <meshStandardMaterial color="#5d4037" roughness={0.9} />
      </mesh>
    </group>
  );
}

function CyberTowerInterior({ H }) {
  return (
    <group>
      <mesh position={[-1.2, H * 0.65, 0]}>
        <boxGeometry args={[0.5, H * 0.25, 0.2]} />
        <meshStandardMaterial color="#1a1a2e" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.2, H * 0.65, 0.11]}>
        <boxGeometry args={[0.4, H * 0.18, 0.02]} />
        <meshStandardMaterial color="#e17055" emissive="#e17055" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[-0.15, H * 0.2, 0]}>
        <boxGeometry args={[0.08, H * 0.15, 0.2]} />
        <meshStandardMaterial color="#fdcb6e" emissive="#fdcb6e" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.15, H * 0.2, 0]}>
        <boxGeometry args={[0.08, H * 0.15, 0.2]} />
        <meshStandardMaterial color="#fdcb6e" emissive="#fdcb6e" emissiveIntensity={0.3} />
      </mesh>
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[-1.2, H * 0.3 + i * H * 0.12, 0]}>
          <torusGeometry args={[0.12, 0.02, 8, 16]} />
          <meshStandardMaterial color="#e17055" emissive="#e17055" emissiveIntensity={0.4} />
        </mesh>
      ))}
      <mesh position={[-0.5, H * 0.48, 0]}>
        <boxGeometry args={[0.25, 0.04, 0.25]} />
        <meshStandardMaterial color="#00cec9" emissive="#00cec9" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

function PottedPlant() {
  const leafData = useMemo(() => {
    const n = 12;
    return Array.from({ length: n }, (_, i) => ({
      angle: (i / n) * Math.PI * 2 + Math.random() * 0.3,
      tilt: 0.3 + Math.random() * 0.5,
      height: 0.4 + Math.random() * 0.25,
    }));
  }, []);

  return (
    <group scale={2}>
      <mesh position={[0, 0.12, 0]}>
        <cylinderGeometry args={[0.06, 0.1, 0.24, 10]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.055, 0.065, 0.02, 10]} />
        <meshStandardMaterial color="#A0522D" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.008, 0.012, 0.32, 6]} />
        <meshStandardMaterial color="#2d5a1e" />
      </mesh>
      {leafData.map((leaf, i) => (
        <mesh key={i} position={[0, leaf.height, 0]} rotation={[0, leaf.angle, leaf.tilt]}>
          <planeGeometry args={[0.1, 0.18]} />
          <meshStandardMaterial color="#27ae60" side={2} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}

function StoreBox({ position, storeId, storeName, color = '#6c5ce7', height: H = 3.0, depth: D = 6.4 }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    navigate(`/catalog?store=${storeId}`);
  };

  const isLeftSide = position[0] < 0;
  const glassX = isLeftSide ? 1.66 : -1.66;
  const W = 3.4;

  const interior = {
    'store-1': <TechWorldInterior />,
    'store-2': <FashionInterior />,
    'store-3': <GameZoneInterior />,
    'store-4': <BookNookInterior />,
    'store-5': <CyberTowerInterior H={H} />,
    'store-6': <CyberTowerInterior H={H} />,
  }[storeId];

  const halfH = H / 2;
  const glassDepth = D - 0.2;
  const roofOverhang = 0.4;

  return (
    <RigidBody type="fixed" colliders={false} position={position}>
      <CuboidCollider args={[W / 2, halfH, D / 2]} position={[0, halfH, 0]} />
      <group>
        <mesh position={[0, halfH, 0]} castShadow receiveShadow>
          <boxGeometry args={[W, H, D]} />
          <meshStandardMaterial color={color} roughness={0.8} metalness={0.1} />
        </mesh>

        <mesh position={[0, H + 0.2, 0]}>
          <boxGeometry args={[W + roofOverhang, 0.1, D + roofOverhang]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} />
        </mesh>

        <mesh position={[glassX, H * 0.25, 0]}>
          <boxGeometry args={[0.06, H * 0.5, glassDepth]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
        <mesh position={[glassX, H * 0.85, 0]}>
          <boxGeometry args={[0.06, H * 0.3, glassDepth]} />
          <meshPhysicalMaterial color="#ffffff" transparent opacity={0.15} metalness={0} roughness={0} side={2} />
        </mesh>

        <mesh position={[glassX, H * 0.283, 0]}>
          <boxGeometry args={[0.08, H * 0.6, 1.6]} />
          <meshStandardMaterial color="#222222" />
        </mesh>

        <mesh position={[glassX, H * 0.283, 0.7]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[glassX, H * 0.283, -0.7]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>

        <mesh position={[0, halfH, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, H * 0.93, glassDepth]} />
          <meshStandardMaterial color={color} roughness={0.7} metalness={0.2} />
        </mesh>

        <group rotation={[0, isLeftSide ? -Math.PI / 2 : Math.PI / 2, 0]}>
          {interior}
        </group>

        <group scale={[1, 1, isLeftSide ? 1 : -1]}>
          <mesh position={[0.6, H * 0.533, glassDepth / 2 + 0.07]}>
            <boxGeometry args={[0.3, 0.25, 0.02]} />
            <meshStandardMaterial color="#ffffff" />
          </mesh>
          <Text
            position={[0.6, H * 0.533, glassDepth / 2 + 0.11]}
            fontSize={0.1}
            color={color}
            anchorX="center"
            anchorY="middle"
            fontWeight={700}
          >
            {storeName}
          </Text>
        </group>

        <Text
          position={[glassX, H + 0.6, 0]}
          fontSize={0.25}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
          outlineColor="#222"
          outlineWidth={0.02}
        >
          {storeName}
        </Text>

        <mesh
          position={[glassX, halfH, 0]}
          onClick={handleClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <planeGeometry args={[3, H * 2]} />
          <meshStandardMaterial transparent opacity={0} />
        </mesh>

        <mesh position={[glassX + (isLeftSide ? 0.5 : -0.5), 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.8, glassDepth]} />
          <meshStandardMaterial color="#2d2d44" />
        </mesh>

        <group position={[glassX + (isLeftSide ? 0.45 : -0.45), 0, D / 2 - 0.4]}>
          <PottedPlant />
        </group>
      </group>
    </RigidBody>
  );
}

export { PottedPlant };
export default StoreBox;
