import { RigidBody } from '@react-three/rapier';

const wallHeight = 5;
const wallThickness = 0.5;
const mallSize = 24;

function Wall({ position, size }) {
  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={position} receiveShadow>
        <boxGeometry args={size} />
        <meshStandardMaterial color="#e2e2e2" />
      </mesh>
    </RigidBody>
  );
}

function MallStructure() {
  const half = mallSize / 2;

  return (
    <group>
      <Wall
        position={[0, wallHeight / 2, -half]}
        size={[mallSize, wallHeight, wallThickness]}
      />
      <Wall
        position={[0, wallHeight / 2, half]}
        size={[mallSize, wallHeight, wallThickness]}
      />
      <Wall
        position={[-half, wallHeight / 2, 0]}
        size={[wallThickness, wallHeight, mallSize]}
      />
      <Wall
        position={[half, wallHeight / 2, 0]}
        size={[wallThickness, wallHeight, mallSize]}
      />
    </group>
  );
}

export default MallStructure;
