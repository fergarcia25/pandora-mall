import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { Grid } from '@react-three/drei';

function Ground() {
  return (
    <>
      <RigidBody type="fixed">
        <CuboidCollider args={[25, 0.1, 25]} position={[0, -0.1, 0]} />
      </RigidBody>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#f1f1f1" />
      </mesh>
      <Grid
        position={[0, 0, 0]}
        args={[50, 50]}
        cellSize={1}
        cellThickness={0.6}
        cellColor="#e8e8e8"
        sectionSize={5}
        sectionThickness={1}
        sectionColor="#d0d0d0"
        fadeDistance={40}
        infiniteGrid
      />
    </>
  );
}

export default Ground;
