import { useNavigate } from 'react-router-dom';
import { RigidBody } from '@react-three/rapier';
import { Text } from '@react-three/drei';
import { useState } from 'react';

function StoreBox({ position, storeId, storeName, color = '#6c5ce7' }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    navigate(`/catalog?store=${storeId}`);
  };

  const isLeftSide = position[0] < 0;
  const glassZ = isLeftSide ? 0 : 0;
  const glassX = isLeftSide ? 1.76 : -1.76;

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <group position={position}>
        {/* Main structure */}
        <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.5, 3, 3.5]} />
          <meshStandardMaterial
            color="#e8e8e8"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Roof trim */}
        <mesh position={[0, 3.2, 0]}>
          <boxGeometry args={[3.8, 0.1, 3.8]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.15} />
        </mesh>

        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3.7, 0.15, 3.7]} />
          <meshStandardMaterial color="#d0d0d0" />
        </mesh>

        {/* Glass window wall */}
        <mesh position={[glassX, 1.5, 0]}>
          <planeGeometry args={[2.8, 2.4]} />
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={hovered ? 0.25 : 0.15}
            metalness={0.0}
            roughness={0.0}
            envMapIntensity={0.5}
            side={2}
          />
        </mesh>

        {/* Glass frame - vertical left */}
        <mesh position={[glassX, 1.5, -0.9]}>
          <boxGeometry args={[0.06, 2.4, 0.06]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
        </mesh>

        {/* Glass frame - vertical right */}
        <mesh position={[glassX, 1.5, 0.9]}>
          <boxGeometry args={[0.06, 2.4, 0.06]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
        </mesh>

        {/* Glass frame - horizontal top */}
        <mesh position={[glassX, 2.7, 0]}>
          <boxGeometry args={[0.06, 0.06, 1.86]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
        </mesh>

        {/* Glass frame - horizontal bottom */}
        <mesh position={[glassX, 0.3, 0]}>
          <boxGeometry args={[0.06, 0.06, 1.86]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.1} />
        </mesh>

        {/* Entrance door frame */}
        <mesh position={[glassX, 0.9, 0]}>
          <boxGeometry args={[0.08, 1.8, 0.8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>

        {/* Door handle */}
        <mesh position={[glassX, 0.9, 0.35]}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Store name */}
        <Text
          position={[glassX, 3.6, 0]}
          fontSize={0.25}
          color="#222222"
          anchorX="center"
          anchorY="middle"
          fontWeight={700}
        >
          {storeName}
        </Text>

        {/* Clickable area */}
        <mesh
          position={[glassX, 1.5, 0]}
          onClick={handleClick}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          <planeGeometry args={[2, 3]} />
          <meshStandardMaterial
            transparent
            opacity={0}
          />
        </mesh>
      </group>
    </RigidBody>
  );
}

export default StoreBox;
